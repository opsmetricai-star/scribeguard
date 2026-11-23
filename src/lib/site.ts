export const BRAND = "ScribeGuard";

export interface NavItem { label: string; href: string; desc?: string }
export interface NavGroup { label: string; items?: NavItem[]; href?: string }

export const NAV: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "Platform overview", href: "/platform", desc: "The full-stack system for governed enterprise AI" },
      { label: "Agents", href: "/agents", desc: "Build and run agents that finish real work" },
      { label: "Guardrails", href: "/guardrails", desc: "Policy checks on every input and output" },
      { label: "Models", href: "/models", desc: "Purpose-built models tuned for business writing" },
      { label: "Knowledge", href: "/knowledge", desc: "Ground answers in your own documents" },
      { label: "Security", href: "/security", desc: "Controls built for regulated teams" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Marketing", href: "/solutions/marketing", desc: "On-brand content at scale" },
      { label: "Human resources", href: "/solutions/hr", desc: "Policy answers and onboarding" },
      { label: "Customer support", href: "/solutions/support", desc: "Faster, safer replies" },
      { label: "Financial services", href: "/solutions/finance", desc: "Compliant client communication" },
      { label: "Healthcare", href: "/solutions/healthcare", desc: "Careful documentation workflows" },
      { label: "IT and operations", href: "/solutions/it", desc: "Runbooks and ticket triage" },
    ],
  },
  { label: "Customers", href: "/customers" },
  {
    label: "Resources",
    items: [
      { label: "Resource center", href: "/resources", desc: "Guides, playbooks and reports" },
      { label: "Documentation", href: "/docs", desc: "Get started with the app" },
      { label: "Contact", href: "/contact", desc: "Talk to our team" },
    ],
  },
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
  { title: "Resources", links: [
    { label: "Resource center", href: "/resources" }, { label: "Documentation", href: "/docs" },
    { label: "Customers", href: "/customers" }, { label: "Pricing", href: "/pricing" } ] },
  { title: "Company", links: [
    { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" } ] },
  { title: "Get started", links: [
    { label: "Sign up", href: "/signup" }, { label: "Log in", href: "/login" }, { label: "Open the app", href: "/app" } ] },
];

export interface Solution {
  slug: string; name: string; headline: string; intro: string;
  pains: string[]; workflows: { title: string; body: string }[]; stat: { n: string; label: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "marketing", name: "Marketing",
    headline: "Publish faster without losing the brand voice",
    intro: "Draft campaigns, landing pages and product copy with agents that know your style guide and check every claim before it goes live.",
    pains: ["Style guides ignored under deadline pressure", "Legal review queues that stall launches", "Inconsistent tone across regions and agencies"],
    workflows: [
      { title: "Campaign drafting", body: "Turn a brief into channel-ready variants, each scored against your voice rules." },
      { title: "Claim checking", body: "Flag absolutes, unsupported statistics and restricted phrases before review." },
      { title: "Localization review", body: "Keep translated copy consistent with approved terminology." },
    ],
    stat: [{ n: "3x", label: "faster first drafts" }, { n: "92%", label: "fewer review rounds" }, { n: "24/7", label: "policy coverage" }],
  },
  {
    slug: "hr", name: "Human resources",
    headline: "Answer every people question with the right policy",
    intro: "Give employees instant, accurate answers drawn from your handbook, and give HR a clear record of what was asked and said.",
    pains: ["Repeated questions that drain the HR team", "Outdated handbook copies in circulation", "Sensitive topics handled inconsistently"],
    workflows: [
      { title: "Policy assistant", body: "Answers grounded in uploaded handbooks, with sensitive topics routed to a person." },
      { title: "Job description review", body: "Catch biased or non-compliant wording before a posting goes out." },
      { title: "Onboarding agents", body: "Guide new hires through week-one checklists in plain language." },
    ],
    stat: [{ n: "70%", label: "of questions self-served" }, { n: "5 min", label: "to publish a new policy" }, { n: "100%", label: "interactions logged" }],
  },
  {
    slug: "support", name: "Customer support",
    headline: "Faster replies that stay accurate and kind",
    intro: "Draft responses from your knowledge base, check tone and compliance, and hand agents a ready-to-send answer.",
    pains: ["Long first-response times", "Agents improvising on refunds and promises", "Knowledge scattered across tools"],
    workflows: [
      { title: "Reply drafting", body: "Suggested replies built from your help center and past resolutions." },
      { title: "Tone and promise checks", body: "Block commitments your policy does not allow." },
      { title: "Escalation summaries", body: "Condense long threads into a clean handoff." },
    ],
    stat: [{ n: "45%", label: "faster first response" }, { n: "0", label: "unapproved promises shipped" }, { n: "4.8", label: "average satisfaction" }],
  },
  {
    slug: "finance", name: "Financial services",
    headline: "Client communication that meets the standard",
    intro: "Keep advisory, marketing and servicing content inside regulatory lines with checks that run before anything is sent.",
    pains: ["Strict disclosure requirements", "Manual compliance review of every message", "Audit requests that require proof of review"],
    workflows: [
      { title: "Disclosure checks", body: "Detect missing disclaimers and prohibited performance claims." },
      { title: "Summaries of long filings", body: "Condense documents with references back to the source text." },
      { title: "Audit trail", body: "Every check logged with the rule applied and the verdict." },
    ],
    stat: [{ n: "60%", label: "less review time" }, { n: "Full", label: "audit history" }, { n: "Role", label: "based access" }],
  },
  {
    slug: "healthcare", name: "Healthcare",
    headline: "Careful documentation, with privacy first",
    intro: "Support administrative writing and patient communication with strong protection against exposing personal data.",
    pains: ["Personal data slipping into drafts", "Time lost on repetitive documentation", "Plain-language requirements for patients"],
    workflows: [
      { title: "Personal data detection", body: "Spot names, identifiers and contact details in free text." },
      { title: "Plain-language rewrite", body: "Rewrite clinical wording at a reading level patients can use." },
      { title: "Admin letter drafting", body: "Draft appointment, billing and follow-up letters for staff review." },
    ],
    stat: [{ n: "High", label: "privacy sensitivity" }, { n: "2x", label: "faster admin writing" }, { n: "Human", label: "review retained" }],
  },
  {
    slug: "it", name: "IT and operations",
    headline: "Turn runbooks and tickets into resolved work",
    intro: "Give teams agents that read your documentation, triage requests and write clear updates.",
    pains: ["Tickets that lack context", "Runbooks nobody reads", "Status updates written at the last minute"],
    workflows: [
      { title: "Ticket triage", body: "Classify and summarize incoming requests with suggested next steps." },
      { title: "Runbook assistant", body: "Answer questions from your uploaded documentation." },
      { title: "Incident updates", body: "Draft stakeholder updates in a consistent format." },
    ],
    stat: [{ n: "40%", label: "faster triage" }, { n: "1", label: "source of truth" }, { n: "Clear", label: "handoffs" }],
  },
];

export const CUSTOMER_STORIES = [
  { company: "Northwind Capital", sector: "Financial services", quote: "Our compliance team reviews exceptions now, not every message.", metric: "60% less review time" },
  { company: "Brightline Health", sector: "Healthcare", quote: "Privacy checks run before a draft ever leaves the building.", metric: "Zero exposed identifiers" },
  { company: "Orbital Commerce", sector: "Retail", quote: "Support replies come out on-brand even on our busiest days.", metric: "45% faster responses" },
  { company: "Kestrel Logistics", sector: "Operations", quote: "Runbooks finally get used because people can just ask them.", metric: "40% faster triage" },
  { company: "Lumen Learning", sector: "Education", quote: "Course content stays consistent across forty authors.", metric: "3x faster publishing" },
  { company: "Atlas Mutual", sector: "Insurance", quote: "Every customer letter is checked against current policy language.", metric: "100% audited" },
];

export const RESOURCES = [
  { type: "Guide", title: "A practical framework for governing enterprise AI agents", read: "12 min" },
  { type: "Playbook", title: "Writing guardrail policies your teams will actually follow", read: "9 min" },
  { type: "Report", title: "State of AI adoption in regulated industries", read: "20 min" },
  { type: "Guide", title: "Measuring the value of AI beyond hours saved", read: "8 min" },
  { type: "Playbook", title: "Rolling out agents to your first 100 employees", read: "11 min" },
  { type: "Checklist", title: "Security review checklist for AI vendors", read: "5 min" },
  { type: "Guide", title: "Grounding answers in your documents, step by step", read: "10 min" },
  { type: "Report", title: "What good AI governance looks like in practice", read: "15 min" },
  { type: "Playbook", title: "Building a prompt and policy library", read: "7 min" },
];
