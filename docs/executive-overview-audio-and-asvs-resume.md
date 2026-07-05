# Executive Overview — Panjabi Audio Launch, Lessons Learned, and the Path to Resuming the ASVS Panjabi Translation

Written 2026-07-05, in plain language. Purpose: a single page anyone can read
to understand what was done, what we learned, and exactly how to pick up the
OWASP ASVS Panjabi translation work using the same playbook.

---

## What was done (July 4–5, 2026)

1. **Found out why the audio "didn't work":** the June 22 audio work was
   never saved to the shared project on GitHub — it existed only on one
   laptop. The website never had it. Nothing was broken; nothing was there.
2. **Rebuilt the audio feature from scratch**, simpler than before: the
   audio player is the browser's own built-in player (works with keyboards
   and screen readers automatically), and every post can declare its audio
   file in two lines at the top of the file.
3. **Added an automatic safety check** (rule R30): if a post points at an
   audio file that doesn't exist, the site refuses to build. If an audio
   file exists that no post uses, it warns. A half-finished state can never
   quietly reach readers again.
4. **Applied a licensing gate before publishing:** of the audio on the
   laptop, only the four NotebookLM discussion tracks were cleared to
   publish. The computer-voice narrations were made with a tool whose
   license forbids commercial use, so they stayed private. One narration
   (gurdwara post) was published on the owner's explicit decision, with
   that caveat written down.
5. **Labeled the audio honestly:** a track that is an AI-made *discussion
   about* the article says so; only a word-for-word narration is called
   "listen to this article." Different labels, in Panjabi and English.
6. **Shipped it:** all five Panjabi scam-awareness posts now have audio on
   the live site. The owner confirmed three pages by listening.
7. **Started a daily decision log:** every working session now writes short
   plain-language notes (what changed, why, what was skipped, what failed
   and must not be retried) into the project, so the next session — human
   or AI — starts from knowledge instead of guesswork.

## Lessons learned (each one cost us something once)

1. **Work that isn't pushed doesn't exist.** The whole "audio didn't work"
   mystery was uncommitted work on one machine. Commit and push small
   pieces the same day, even drafts.
2. **Make half-finished states loud.** The R30 rule turns "quietly broken"
   into "refuses to build." Every content type that has two parts (a file
   plus a reference to it) deserves a check like this.
3. **License before publish, always.** Good audio from the wrong tool is
   unusable. Check the tool's license *before* generating hours of content.
4. **Honest labels protect trust.** Our readers are elders being told to
   distrust convincing voices on the phone — the last thing we may do is
   blur what is AI-made on our own site.
5. **Stage safely:** send the files first (harmless alone), wire them
   second. At no point was the site broken in between.
6. **Write decisions down when they happen.** The decision log and the
   "do not retry" list (tool licenses, blocked accounts, API limits) saved
   this session hours of re-discovery — it will save the next one more.
7. **The person stays the reviewer.** Automation moved files and checked
   rules; a human listened to the audio and made the publish calls.

## How this applies to resuming the ASVS Panjabi translation

Background, without jargon: ASVS is a widely used security checklist
published by OWASP, a non-profit. We are translating it into Panjabi. The
translation submission (PR #3254 on GitHub) is under review by OWASP, and
this website already hosts ten hidden review pages (title page, introduction,
glossary, several chapters) that Panjabi speakers can read via a direct link
— no GitHub account needed.

The playbook proven by the audio work maps directly:

1. **Get the finished chapters off the laptop first** (Lesson 1). Any
   completed chapter drafts that exist only in the local working copy of
   the OWASP material should be committed to this site as hidden review
   pages the same day they're found. The pattern to copy already exists:
   the ten `asvs-panjabi-review-*` files in `posts/` (frontmatter with
   `hidden: true`, plain-language wrapper text, verbatim OWASP content).
2. **Let the existing checks guard the content.** The same automatic rules
   that guard the scam posts (script contamination, locked vocabulary,
   country names, table shapes) run on every ASVS page too. Add a rule when
   a new mistake class appears — the way R30 was added for audio.
3. **Community review through easy links** — the whole reason the pages are
   on this site: an elder or a granthi can open a link from WhatsApp and
   read, no accounts. The share-message pattern written for the audio posts
   (`outputs/whatsapp-share-pa-2026-07-05.md`) works for review requests
   too: short Panjabi note + link + one specific ask ("does this sentence
   sound right to you?").
4. **Keep the review honest:** pages stay marked as AI-assisted drafts
   (`ai_draft`) until a Panjabi speaker confirms them — the dictionary
   validates words; only people validate tone (this rule is already in
   CLAUDE.md).
5. **Log every translation decision** in the daily decision log: which term
   was chosen, what the dictionary said, what an elder suggested. That log
   becomes the evidence trail OWASP reviewers and future translators need.
6. **Audio later, cheaply:** once chapters stabilize, the same two
   frontmatter lines + the committed generation script
   (`scripts/generate-audio-parler.py`, permissively licensed engine) give
   any chapter a spoken version — with R30 already guarding it.

### Concrete next steps for the resuming session

1. On the laptop: `git status` in the local working copy — list every
   untracked/modified ASVS chapter file and commit the finished ones as
   hidden review pages here (same-day rule).
2. Run the content checks; fix what they flag.
3. Send the review-request WhatsApp note with direct links to the sangat
   reviewers named in the review hub page.
4. Record in the decision log which chapters are now up, which remain, and
   any term decisions made along the way.
