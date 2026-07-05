#!/usr/bin/env python3
"""Generate a verbatim Panjabi read-aloud MP3 for a pa-in blog post.

Engine: Indic Parler-TTS (ai4bharat/indic-parler-tts, Apache-2.0).
Chosen over MMS-TTS (mms-tts-pan), which is CC-BY-NC 4.0 and therefore
NOT usable on this commercial site — see work/decision-log/2026-07-04.md
"Do not retry". Parler was proven end-to-end for Panjabi in SAY-376.

This does NOT run in the Claude remote container (HuggingFace blocked by
network policy, no GPU, no ffmpeg). Run it on a local machine:

    pip install torch transformers soundfile
    pip install git+https://github.com/huggingface/parler-tts.git
    brew install ffmpeg               # (macOS)
    python3 scripts/generate-audio-parler.py --slug whatsapp-family-emergency-scams

Output: public/audio/pa-in/<slug>.mp3 — mono 64 kbps (spoken-word budget
from docs/Panjabi Blog Audio Integration research: transparent for speech,
~0.5 MB/min). The slug-named file is the read_aloud convention already live
for gurdwara-charity-donation-fraud; on a machine that still has the old
MMS-TTS files, this intentionally overwrites them with licensed output.

After generating: listen to the whole file (numerals, ਯੂ.ਕੇ., helpline
numbers are the usual trouble spots), then add to the post frontmatter:

    audio_url: "/audio/pa-in/<slug>.mp3"
    audio_kind: "read_aloud"

and run `npm run lint:content` — R30 verifies the mapping.
"""

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Parler keeps a consistent voice across chunks only when the description
# names a speaker the model was trained on. See the ai4bharat/indic-parler-tts
# model card for the recommended Panjabi speakers.
DEFAULT_SPEAKER = "Divjot"
DEFAULT_DESCRIPTION = (
    "{speaker} delivers a clear, calm Punjabi news reading with very clear "
    "audio, a moderate pace, and a professional, warm tone suitable for a "
    "public service announcement."
)

# Chunk ceiling in characters. Parler degrades on long inputs; sentence-sized
# chunks also localize any mispronunciation so a single chunk can be re-cut.
MAX_CHUNK_CHARS = 500

# Sentence boundaries: danda (।) is the Gurmukhi full stop; keep ?/!/. for
# loan sentences and headings.
SENTENCE_SPLIT_RE = re.compile(r"(?<=[।?!.])\s+")


def extract_spoken_text(md_path: Path) -> str:
    """Reduce post markdown to plain sentences suitable for narration."""
    raw = md_path.read_text(encoding="utf-8")
    # Drop YAML frontmatter.
    raw = re.sub(r"^---\r?\n[\s\S]*?\r?\n---\r?\n", "", raw)
    # Drop HTML comments (rigor-allow markers etc.) and raw HTML tags.
    raw = re.sub(r"<!--[\s\S]*?-->", " ", raw)
    raw = re.sub(r"<[^>]+>", " ", raw)
    # Links: keep the label, drop the URL — reading URLs aloud is noise;
    # the on-page text remains the reference copy (page = transcript).
    raw = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", raw)
    raw = re.sub(r"https?://\S+", " ", raw)
    # Markdown furniture: headings, emphasis, blockquotes, list markers,
    # horizontal rules, code fences.
    raw = re.sub(r"^#{1,6}\s*", "", raw, flags=re.M)
    raw = re.sub(r"^\s*[>*+-]\s+", "", raw, flags=re.M)
    raw = re.sub(r"^(\s*)\d+\.\s+", r"\1", raw, flags=re.M)
    raw = re.sub(r"^-{3,}\s*$", "", raw, flags=re.M)
    raw = re.sub(r"[`*_]{1,3}", "", raw)
    # Tables: turn cell separators into short pauses instead of reading pipes.
    raw = raw.replace("|", "، ")
    raw = re.sub(r"،\s*،(\s*،)*", "،", raw)
    # Collapse whitespace.
    raw = re.sub(r"[ \t]+", " ", raw)
    raw = re.sub(r"\n{2,}", "\n", raw)
    return raw.strip()


def chunk_sentences(text: str) -> list[str]:
    chunks: list[str] = []
    current = ""
    for sentence in SENTENCE_SPLIT_RE.split(text):
        sentence = sentence.strip()
        if not sentence:
            continue
        if current and len(current) + len(sentence) + 1 > MAX_CHUNK_CHARS:
            chunks.append(current)
            current = sentence
        else:
            current = f"{current} {sentence}".strip()
    if current:
        chunks.append(current)
    return chunks


def pick_device():
    import torch

    if torch.cuda.is_available():
        return "cuda:0"
    # Apple Silicon: fine for Parler inference, ~faster-than-realtime.
    if torch.backends.mps.is_available():
        return "mps"
    return "cpu"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--slug", required=True, help="post slug in posts-i18n/<locale>/")
    ap.add_argument("--locale", default="pa-in")
    ap.add_argument("--speaker", default=DEFAULT_SPEAKER,
                    help="named speaker from the model card (voice consistency)")
    ap.add_argument("--description", default=None,
                    help="full voice-description prompt; overrides --speaker template")
    ap.add_argument("--out", default=None, help="output mp3 path")
    ap.add_argument("--keep-wav", action="store_true",
                    help="keep the intermediate wav next to the mp3")
    args = ap.parse_args()

    md_path = ROOT / "posts-i18n" / args.locale / f"{args.slug}.md"
    if not md_path.exists():
        sys.exit(f"post not found: {md_path}")
    out_mp3 = Path(args.out) if args.out else (
        ROOT / "public" / "audio" / args.locale / f"{args.slug}.mp3"
    )
    out_mp3.parent.mkdir(parents=True, exist_ok=True)

    if subprocess.run(["which", "ffmpeg"], capture_output=True).returncode != 0:
        sys.exit("ffmpeg not found — install it first (brew install ffmpeg)")

    text = extract_spoken_text(md_path)
    chunks = chunk_sentences(text)
    print(f"{md_path.name}: {len(text)} chars → {len(chunks)} chunks")

    # Heavy imports after the cheap validations so argument errors fail fast.
    import soundfile as sf
    import torch
    from parler_tts import ParlerTTSForConditionalGeneration
    from transformers import AutoTokenizer

    device = pick_device()
    print(f"device: {device}")
    model = ParlerTTSForConditionalGeneration.from_pretrained(
        "ai4bharat/indic-parler-tts"
    ).to(device)
    tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts")
    desc_tokenizer = AutoTokenizer.from_pretrained(
        model.config.text_encoder._name_or_path
    )

    description = args.description or DEFAULT_DESCRIPTION.format(speaker=args.speaker)
    desc_ids = desc_tokenizer(description, return_tensors="pt").to(device)

    pieces = []
    for i, chunk in enumerate(chunks, 1):
        print(f"  chunk {i}/{len(chunks)} ({len(chunk)} chars)")
        prompt_ids = tokenizer(chunk, return_tensors="pt").to(device)
        with torch.no_grad():
            audio = model.generate(
                input_ids=desc_ids.input_ids,
                attention_mask=desc_ids.attention_mask,
                prompt_input_ids=prompt_ids.input_ids,
                prompt_attention_mask=prompt_ids.attention_mask,
            )
        pieces.append(audio.to(torch.float32).cpu().numpy().squeeze())

    import numpy as np

    sr = model.config.sampling_rate
    # ~0.35 s of silence between chunks reads as a natural sentence pause.
    gap = np.zeros(int(sr * 0.35), dtype=pieces[0].dtype)
    full = np.concatenate([p for pair in zip(pieces, [gap] * len(pieces)) for p in pair])

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav_path = Path(tmp.name)
    sf.write(wav_path, full, sr)

    # Mono 64 kbps: the spoken-word encoding budget (see module docstring).
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(wav_path), "-ac", "1", "-b:a", "64k", str(out_mp3)],
        check=True, capture_output=True,
    )
    if args.keep_wav:
        wav_path.rename(out_mp3.with_suffix(".wav"))
    else:
        wav_path.unlink()

    mb = out_mp3.stat().st_size / 1e6
    print(f"wrote {out_mp3} ({mb:.1f} MB)")
    print("next: listen to the full file, then set audio_url + "
          "audio_kind: read_aloud in the post frontmatter and run "
          "`npm run lint:content` (R30).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
