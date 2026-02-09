export type ResearchType = 'paper' | 'video' | 'insight' | 'tool';

interface ResearchSection {
  id: string;
  title: string;
}

interface ResearchVideo {
  title: string;
  url: string;
}

interface ResearchRepository {
  name: string;
  description: string;
  url: string;
}

export interface ResearchItem {
  slug: string;
  title: string;
  summary: string;
  type: ResearchType;
  visual: string;
  date: string;
  readTime?: string;
  tags: string[];
}

export interface ResearchArticle extends ResearchItem {
  heroImage: string;
  readTime: string;
  downloadUrl?: string;
  githubUrl?: string;
  sections?: ResearchSection[];
  content: string[];
  videos?: ResearchVideo[];
  repositories?: ResearchRepository[];
}

const researchArticles: ResearchArticle[] = [
  {
    slug: 'llm-threat-surface',
    title: 'Mapping the LLM Threat Surface for Enterprise Security',
    summary:
      'A systematic framework for assessing and defending against LLM-specific threat vectors across enterprise environments.',
    type: 'paper',
    visual: '/images/llm-threat-surface.svg',
    heroImage: '/images/llm-threat-surface.svg',
    date: 'January 12, 2025',
    readTime: '12',
    tags: ['LLM Security', 'Threat Modeling', 'Enterprise'],
    sections: [
      { id: 'threat-landscape', title: 'Threat Landscape Overview' },
      { id: 'attack-paths', title: 'Attack Paths & Failure Modes' },
      { id: 'controls', title: 'Defensive Controls' },
    ],
    content: [
      'Large language models have expanded the attack surface for enterprise teams responsible for data protection, identity, and automation. Our threat surface model outlines the primary interaction points where adversaries can exploit generative AI systems.',
      'We segment each threat vector into pre-deployment, runtime, and post-deployment risk categories. This allows security teams to map control coverage and identify blind spots across data ingestion, orchestration layers, and user access flows.',
      'By combining traditional application security controls with LLM-aware guardrails, organizations can move toward measurable risk reduction aligned with executive security objectives.',
    ],
    videos: [
      {
        title: 'Live Threat Modeling Workshop',
        url: 'https://www.youtube.com/embed/TPsQ7RFMzSM',
      },
    ],
    repositories: [
      {
        name: 'mcp-sentinel-scanner',
        description: 'Seven-layer detection pipeline for MCP and LLM threat surface analysis.',
        url: 'https://github.com/GeeksikhSecurity/mcp-sentinel-scanner',
      },
    ],
  },
  {
    slug: 'oauth-red-team-lab',
    title: 'OAuth Supply-Chain Security: From the Salesloft/Drift Breach to Zero Trust',
    summary:
      'Applied research on OAuth supply-chain vulnerabilities, analyzing the UNC6395 campaign that compromised 700+ Salesforce environments via stolen tokens from Salesloft/Drift. Includes GWAPT-aligned penetration testing methodology.',
    type: 'tool',
    visual: '/images/oauth-red-team.svg',
    heroImage: '/images/oauth-red-team.svg',
    date: 'February 8, 2026',
    readTime: '12',
    tags: ['OAuth', 'Supply Chain', 'Salesloft/Drift', 'MITRE ATT&CK', 'Penetration Testing'],
    githubUrl: 'https://github.com/GeeksikhSecurity/mcp-sentinel-scanner',
    sections: [
      { id: 'threat-landscape', title: 'Threat Landscape: UNC6395 & the Identity Supply Chain' },
      { id: 'attack-scenarios', title: 'Shadow Trust: Attack Scenarios & Token Persistence' },
      { id: 'methodology', title: 'GWAPT Penetration Testing Methodology' },
      { id: 'hardening', title: 'Zero Trust OAuth Remediation Framework' },
    ],
    content: [
      'The UNC6395 campaign (August 2025) demonstrated a paradigm shift in enterprise attacks: rather than exploiting software vulnerabilities, threat actors compromised Salesloft/Drift AWS infrastructure to harvest valid OAuth tokens for over 700 Salesforce environments. No passwords were stolen. MFA was bypassed by design. Subsequent incidents including Gainsight (November 2025) and the n8n ecosystem attack (January 2026) confirm this is a systemic failure in Non-Human Identity management.',
      'Our research maps these attacks to MITRE ATT&CK (T1528, T1550) and establishes a GWAPT-aligned penetration testing methodology for auditing the Identity Supply Chain. Lab modules replicate over-privileged OAuth scopes, infinite refresh token persistence, and the "Secondary Heist" pattern where API access yields unstructured secrets enabling lateral movement to cloud infrastructure.',
      'The remediation framework enforces Zero Trust principles: 24-hour refresh token expiry, scope restriction policies blocking the "full" scope at the org level, RFC 7662 token introspection at the gateway, and continuous monitoring of OauthToken events to detect token misuse and attacker cleanup patterns.',
    ],
    repositories: [
      {
        name: 'mcp-sentinel-scanner',
        description: 'Security analysis tool with OAuth supply-chain detection capabilities, SOQL enumeration patterns, and MCP vulnerability scanning.',
        url: 'https://github.com/GeeksikhSecurity/mcp-sentinel-scanner',
      },
    ],
  },
  {
    slug: 'mcp-sentinel-architecture',
    title: 'MCP Sentinel Scanner: Seven-Layer Detection Pipeline for AI Agent Security',
    summary:
      'An open-source security analysis tool applying a seven-layer detection pipeline to identify vulnerabilities in AI agent-to-agent communication frameworks, addressing an emerging and rapidly evolving attack surface.',
    type: 'insight',
    visual: '/images/mcp-sentinel.svg',
    heroImage: '/images/mcp-sentinel.svg',
    date: 'February 8, 2026',
    readTime: '10',
    tags: ['MCP', 'AI Security', 'Seven-Layer Pipeline', 'Vulnerability Scanner'],
    sections: [
      { id: 'detection-pipeline', title: 'Seven-Layer Detection Pipeline' },
      { id: 'control-plane', title: 'Control Plane & Enforcement Patterns' },
      { id: 'observability', title: 'Observability & ASR Scoring' },
    ],
    content: [
      'The MCP Sentinel Scanner addresses critical security gaps in Model Context Protocol implementations through a seven-layer detection pipeline: Semgrep taint scanning, LLM-based metadata analysis, AST deep inspection, cross-file flow extraction, secret detection, pattern matching, and risk judgment with Attack Success Rate scoring.',
      'Traditional security scanners lack MCP protocol understanding, miss semantic attacks hidden in tool descriptions, and cannot perform the taint analysis needed to track data flow through AI agent communication channels. The Sentinel pipeline combines static, semantic, and structural analysis techniques to detect vulnerabilities that existing tools cannot identify.',
      'Based on peer-reviewed research (Zhao et al., 2025), the scanner addresses all 12 attack categories in the MCP threat taxonomy. With 96% test coverage and 652 vulnerability findings at v1.5, it provides production-ready scanning via Docker, PyPI, and CI/CD integration with five output formats including SARIF for IDE integration.',
    ],
  },
  {
    slug: 'autonomous-defense-demos',
    title: 'Autonomous Defense Demonstrations',
    summary:
      'Video walk-throughs showcasing how AI agents can execute defensive playbooks and ticket resolution.',
    type: 'video',
    visual: '/images/autonomous-defense.svg',
    heroImage: '/images/autonomous-defense.svg',
    date: 'November 5, 2024',
    readTime: '6',
    tags: ['Automation', 'Blue Team', 'Video Demo'],
    videos: [
      {
        title: 'Containment Workflow',
        url: 'https://www.youtube.com/embed/k85KCIq1FQ8',
      },
      {
        title: 'Ticket Automation Patterns',
        url: 'https://www.youtube.com/embed/q8sX2G9x4U0',
      },
    ],
    sections: [
      { id: 'scenarios', title: 'Scenario Coverage' },
      { id: 'guardrails', title: 'Guardrails & Limits' },
      { id: 'operations', title: 'Operationalizing' },
    ],
    content: [
      'Defensive AI agents excel when missions are well defined and bounded. These demonstrations illustrate incident response workflows where autonomy augments human responders instead of replacing them.',
      'Each scenario highlights human-in-the-loop checkpoints, data provenance controls, and success metrics used to evaluate agent performance.',
      'Recorded playbooks can be repurposed as training material for security operations teams ramping up on AI-assisted workflows.',
    ],
  },
  {
    slug: 'supply-chain-visibility-framework',
    title: 'Supply Chain Visibility Framework for AI Tooling',
    summary:
      'Operational blueprint for tracking dependencies, scanning artifacts, and enforcing policies across AI supply chains.',
    type: 'paper',
    visual: '/images/supply-chain-guardian.svg',
    heroImage: '/images/supply-chain-guardian.svg',
    date: 'October 14, 2024',
    readTime: '11',
    tags: ['Supply Chain', 'Governance', 'Frameworks'],
    sections: [
      { id: 'asset-inventory', title: 'Asset Inventory' },
      { id: 'policy-enforcement', title: 'Policy Enforcement' },
      { id: 'continuous-monitoring', title: 'Continuous Monitoring' },
    ],
    content: [
      'AI supply chains span open-source models, proprietary datasets, and third-party orchestration services. Without visibility, risk accumulates faster than controls can be implemented.',
      'Our framework introduces layered checkpoints that align to procurement, development, and runtime operations. Each checkpoint is mapped to measurable controls and reporting artifacts.',
      'By integrating these checkpoints into existing GRC workflows, organizations can reduce approval friction while maintaining compliance posture.',
    ],
  },
  {
    slug: 'executive-insights-ai-security',
    title: 'Executive Insights: Communicating AI Security Risk',
    summary:
      'Guidance for CISOs and security leaders to translate AI security posture into board-ready narratives.',
    type: 'insight',
    visual: '/images/executive-insights.svg',
    heroImage: '/images/executive-insights.svg',
    date: 'September 8, 2024',
    readTime: '7',
    tags: ['Leadership', 'Reporting', 'Strategy'],
    sections: [
      { id: 'messaging', title: 'Messaging the Risk' },
      { id: 'metrics', title: 'Selecting Metrics' },
      { id: 'alignment', title: 'Alignment with Strategy' },
    ],
    content: [
      'Board-level stakeholders expect clarity on how AI investments align with enterprise risk tolerance. Translating technical findings into strategic narratives is essential.',
      'We outline storytelling frameworks, visual templates, and leading indicators that resonate with non-technical executives while preserving accuracy.',
      'Security leaders can leverage these insights to secure funding, reinforce collaboration, and build durable governance programs.',
    ],
  },
];

export function getResearchItems(
  type?: ResearchType,
  searchQuery = '',
): ResearchItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return researchArticles
    .filter((item) => {
      if (type && item.type !== type) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        item.title,
        item.summary,
        item.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .map(
      ({
        slug,
        title,
        summary,
        type: itemType,
        visual,
        date,
        readTime,
        tags,
      }) => ({
        slug,
        title,
        summary,
        type: itemType,
        visual,
        date,
        readTime,
        tags,
      }),
    );
}

export function getResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((article) => article.slug === slug);
}

export function getResearchTopics() {
  return [
    {
      name: 'LLM Threats',
      slug: 'llm-security',
      icon: 'shield',
      count: 12,
    },
    {
      name: 'Model Context Protocol',
      slug: 'mcp',
      icon: 'layers',
      count: 9,
    },
    {
      name: 'Supply Chain',
      slug: 'supply-chain',
      icon: 'package',
      count: 7,
    },
    {
      name: 'Automation & Tools',
      slug: 'automation',
      icon: 'workflow',
      count: 11,
    },
  ];
}
