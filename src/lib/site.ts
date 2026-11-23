export const BRAND = "ScribeGuard";

export interface NavItem { label: string; href: string; desc?: string }
export interface NavGroup { label: string; items?: NavItem[]; href?: string }

export const NAV: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "Platform overview", href: "/platform", desc: "One AI engine for analysis, decisions and automation" },
      { label: "Agents", href: "/agents", desc: "Autonomous workflows that finish the work" },
      { label: "Guardrails", href: "/guardrails", desc: "Automated risk scoring and policy decisions" },
      { label: "Models", href: "/models", desc: "The reasoning layer behind every action" },
      { label: "Knowledge", href: "/knowledge", desc: "Decisions grounded in your own documents" },
      { label: "Security", href: "/security", desc: "Isolation, audit and control by design" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Marketing", href: "/solutions/marketing", desc: "Approved copy at campaign speed" },
      { label: "Human resources", href: "/solutions/hr", desc: "Policy answers without the queue" },
      { label: "Customer support", href: "/solutions/support", desc: "Faster resolutions, zero rogue promises" },
      { label: "Financial services", href: "/solutions/finance", desc: "Compliant client communication" },
      { label: "Healthcare", href: "/solutions/healthcare", desc: "Documentation with sensitive data controls" },
      { label: "IT and operations", href: "/solutions/it", desc: "Triage and runbooks on autopilot" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

export const FOOTER: { title: string; links: NavItem[] }[] = [
  { title: "Platform", links: [
    { label: "Overview", href: "/platform" }, { label: "Agents", href: "/agents" }, { label: "Guardrails", href: "/guardrails" },
    { label: "Models", href: "/models" }, { label: "Knowledge", href: "/knowledge" }, { label: "Security", href: "/security" } ] },
  { title: "Solutions", links: [
    { label: "Marketing", href: "/solutions/marketing" }, { label: "Human resources", href: "/solutions/hr" },
    { label: "Customer support", href: "/solutions/support" }, { label: "Financial services", href: "/solutions/finance" },
    { label: "Healthcare", href: "/solutions/healthcare" }, { label: "IT and operations", href: "/solutions/it" } ] },
  { title: "Company", links: [
    { label: "About", href: "/about" }, { label: "Pricing", href: "/pricing" }, { label: "Docs", href: "/docs" },
    { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" } ] },
  { title: "Account", links: [
    { label: "Sign up", href: "/signup" }, { label: "Log in", href: "/login" } ] },
];

export interface Solution {
  slug: string; name: string; headline: string; intro: string;
  pains: string[]; workflows: { title: string; body: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "marketing", name: "Marketing",
    headline: "Cut campaign cycle time without exposing the brand",
    intro: "Agents draft campaign copy, score every claim against your rules and return an approved rewrite. Review queues shrink because the AI resolves the routine violations before a person sees them.",
    pains: ["Style guides ignored under deadline pressure", "Legal review queues that stall launches", "Inconsistent claims across regions and agencies"],
    workflows: [
      { title: "Campaign drafting", body: "Turn a brief into channel-ready variants, each scored against your voice and claim rules." },
      { title: "Claim screening", body: "Detect absolutes, unsupported statistics and restricted phrases, then rewrite them automatically." },
      { title: "Approval routing", body: "Pass, warn or block each asset so reviewers spend time only on real exceptions." },
    ],
  },
  {
    slug: "hr", name: "Human resources",
    headline: "Resolve employee policy questions at the source",
    intro: "An agent grounded in your handbook answers policy questions instantly and logs every exchange. HR time moves from repeat questions to decisions that need judgment.",
    pains: ["Repeat questions that consume HR capacity", "Outdated handbook copies in circulation", "Inconsistent handling of sensitive topics"],
    workflows: [
      { title: "Policy agent", body: "Answers drawn only from the documents you upload, with a full record of each interaction." },
      { title: "Job posting screening", body: "Flag non-compliant or biased wording before a role goes live." },
      { title: "Onboarding automation", body: "Walk new hires through role-specific checklists from your own material." },
    ],
  },
  {
    slug: "support", name: "Customer support",
    headline: "Shorten time to resolution and stop unauthorized promises",
    intro: "Agents draft replies from your knowledge library and block commitments your policy does not allow. Handle time falls while risk from off-script answers falls with it.",
    pains: ["Slow first response times", "Agents improvising on refunds and commitments", "Answers scattered across tools"],
    workflows: [
      { title: "Reply drafting", body: "Suggested responses built from your approved documentation." },
      { title: "Commitment screening", body: "Block promises and guarantees that policy prohibits." },
      { title: "Escalation briefs", body: "Condense long threads into a handoff that is ready to act on." },
    ],
  },
  {
    slug: "finance", name: "Financial services",
    headline: "Move client communication through compliance at machine speed",
    intro: "Every message is scored for disclosure gaps and prohibited claims before it leaves the building, and every verdict is stored. Compliance reviews exceptions instead of everything.",
    pains: ["Strict disclosure requirements", "Manual review of every outbound message", "Audit requests that demand proof of review"],
    workflows: [
      { title: "Disclosure screening", body: "Detect missing disclaimers and prohibited performance language." },
      { title: "Document analysis", body: "Condense long filings into structured summaries your team can verify." },
      { title: "Audit record", body: "Each check is logged with the rule applied, the verdict and the credits used." },
    ],
  },
  {
    slug: "healthcare", name: "Healthcare",
    headline: "Accelerate documentation while controlling sensitive data",
    intro: "Detect names, identifiers and contact details in free text before a draft is shared, and rewrite to a plain-language standard. Administrative output rises without raising exposure.",
    pains: ["Sensitive data slipping into drafts", "Time lost on repetitive administrative writing", "Plain-language requirements for patient communication"],
    workflows: [
      { title: "Sensitive data detection", body: "Spot names, identifiers and contact details in free text." },
      { title: "Plain-language rewrite", body: "Convert clinical wording into language recipients can act on." },
      { title: "Administrative drafting", body: "Draft appointment, billing and follow-up letters for staff review." },
    ],
  },
  {
    slug: "it", name: "IT and operations",
    headline: "Triage faster and keep runbooks in constant use",
    intro: "Agents classify incoming requests, answer from your documentation and draft stakeholder updates. Mean time to triage drops because the first pass is automated.",
    pains: ["Tickets that arrive without context", "Runbooks nobody opens", "Status updates written under pressure"],
    workflows: [
      { title: "Ticket triage", body: "Classify and summarize requests with a recommended next step." },
      { title: "Runbook agent", body: "Answer operational questions from your uploaded documentation." },
      { title: "Incident updates", body: "Draft stakeholder communication in a consistent format." },
    ],
  },
];
