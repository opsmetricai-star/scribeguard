import type { FeatureData } from "@/components/marketing/FeaturePage";

const faq = (extra: { q: string; a: string }[] = []) => [
  ...extra,
  { q: "Do I need a credit card to start?", a: "No. The Explorer plan is free and includes 50 AI credits each month." },
  { q: "Where is my data stored?", a: "In your private workspace on Supabase, protected by row-level security so only you can read your records." },
  { q: "Can I upgrade or downgrade later?", a: "Yes. Plans can be changed from the billing page, and credits refresh when a paid plan is activated." },
];

export const FEATURES: Record<string, FeatureData> = {
  platform: {
    eyebrow: "Platform", title: "One platform for models, guardrails, knowledge and agents",
    sub: "Stop stitching tools together. ScribeGuard gives every team a single, governed place to build and run AI.",
    blocks: [
      { title: "Build once, govern everywhere", body: "Define policies and knowledge a single time and apply them to every agent and every check.", points: ["Shared policy library", "Central knowledge library", "One usage and billing view"] },
      { title: "Observe every run", body: "See what was asked, what was answered and which rule fired, with credits tracked per run.", points: ["Searchable run history", "Verdicts and compliance scores", "Usage charts by day and type"] },
      { title: "Scale across departments", body: "Roll out from one pilot team to the whole organization without rebuilding.", points: ["Per-user workspaces", "Plan-based limits", "Notifications for key events"] },
    ],
    grid: [
      { title: "Assistant", body: "A chat workspace backed by the model, with conversation context." },
      { title: "Guardrail checks", body: "Structured verdicts, findings and rewrites." },
      { title: "Agent builder", body: "Instructions, policy and knowledge in one form." },
      { title: "Knowledge library", body: "Upload documents to private storage and use them as grounding." },
      { title: "Analytics", body: "Credits, runs and verdict mix over time." },
      { title: "Billing", body: "Plan status, limits and upgrade links." },
    ],
    faq: faq(), tryHref: "/app", tryLabel: "Open the app",
  },
  agents: {
    eyebrow: "Agents", title: "Agents that finish the work, inside your rules",
    sub: "Give an agent instructions, a policy and a knowledge library, then run it on real inputs and review the result.",
    blocks: [
      { title: "Plain-language instructions", body: "Describe the role, the tone and the output format. No code needed to get a working agent.", points: ["Reusable instructions", "Attach any saved policy", "Edit and re-run instantly"] },
      { title: "Grounded in your documents", body: "Agents draw on your most recent knowledge documents, so answers reflect your own material.", points: ["Private document storage", "Text extracted for grounding", "Source documents stay yours"] },
      { title: "Metered and logged", body: "Each run records its input, output and credits so cost and quality stay visible.", points: ["Per-plan agent limits", "Credit counter in real time", "Full run history"] },
    ],
    grid: [
      { title: "Policy aware", body: "Agents are told the rules they must stay inside." },
      { title: "Fast iteration", body: "Change instructions and test again in seconds." },
      { title: "Per-plan limits", body: "Agent counts match your subscription." },
      { title: "Run history", body: "Every execution saved for review." },
      { title: "Safe by default", body: "A base policy applies even without custom rules." },
      { title: "Failure-safe billing", body: "Credits are returned when a model call fails." },
    ],
    faq: faq([{ q: "How many agents can I create?", a: "Explorer allows 1, Starter 3, Pro 10 and Business 50." }]), tryHref: "/app/agents",
  },
  guardrails: {
    eyebrow: "Guardrails", title: "Policy checks on every input and output",
    sub: "Submit text and receive a verdict, a compliance score, itemized findings and a compliant rewrite.",
    blocks: [
      { title: "Structured, validated results", body: "Every check returns a verdict, score and findings that are validated before they reach you.", points: ["Pass, warn or block verdicts", "Severity per finding", "Excerpt, explanation and fix"] },
      { title: "Custom policies", body: "Write your own rules in plain language and apply them to checks and agents.", points: ["Combine with the base policy", "Reuse across agents"] },
      { title: "A rewrite you can use", body: "Each check includes a revised version that resolves the findings.", points: ["Keeps your meaning", "Removes restricted content", "Copy with one click"] },
    ],
    grid: [
      { title: "Personal data", body: "Detect emails, phone numbers and identifiers." },
      { title: "Risky claims", body: "Flag absolutes and unverifiable statements." },
      { title: "Tone", body: "Keep language professional and brand safe." },
      { title: "Compliance score", body: "A 0 to 100 score for quick triage." },
      { title: "Audit history", body: "Checks saved with verdicts." },
      { title: "Deterministic limits", body: "Input size and credits enforced server-side." },
    ],
    faq: faq([{ q: "Is the guardrail check a legal opinion?", a: "No. It is an automated review that should support, not replace, your compliance process." }]), tryHref: "/app/guardrails",
  },
  models: {
    eyebrow: "Models", title: "Language models tuned for business writing and reasoning",
    sub: "ScribeGuard routes work to a capable large language model and wraps it in structured prompts, validation and limits.",
    blocks: [
      { title: "Structured outputs", body: "Where precision matters, responses are requested as JSON and validated against a schema.", points: ["Schema validation", "Automatic error handling", "Retries surfaced to the user"] },
      { title: "Server-side only", body: "Model credentials stay on the server and are never sent to the browser.", points: ["No keys in client code", "Request timeouts", "Rate and credit limits"] },
      { title: "Swap-ready", body: "The model is configured by environment variable so you can upgrade without code changes.", points: ["Single configuration point", "Consistent interface", "Documented in .env.example"] },
    ],
    grid: [
      { title: "Long inputs", body: "Check documents up to 12,000 characters." },
      { title: "Conversation", body: "Assistant keeps recent context." },
      { title: "Low temperature checks", body: "Guardrails use conservative settings." },
      { title: "Timeouts", body: "Requests are capped at 45 seconds." },
      { title: "Fair billing", body: "Failed calls are not charged." },
      { title: "Configurable", body: "Choose the model via GEMINI_MODEL." },
    ],
    faq: faq(),
  },
  knowledge: {
    eyebrow: "Knowledge", title: "Ground every answer in your own documents",
    sub: "Upload files to private storage and let agents use them as reference material.",
    blocks: [
      { title: "Private by design", body: "Files are stored in a private bucket under your user folder, readable only by you.", points: ["Per-user storage paths", "Storage policies enforced", "Delete any time"] },
      { title: "Used by agents", body: "Text from plain-text and Markdown uploads is extracted and supplied to agents as grounding.", points: ["TXT, MD and CSV extraction", "Latest documents prioritized", "Other file types stored for reference"] },
    ],
    grid: [
      { title: "Upload", body: "Drag files into the library." }, { title: "Extract", body: "Text files are indexed for grounding." },
      { title: "Manage", body: "Rename or remove documents." }, { title: "Download", body: "Retrieve originals with signed links." },
      { title: "Limits", body: "Size caps by plan." }, { title: "Audit", body: "Upload times recorded." },
    ],
    faq: faq([{ q: "Which file types are read by agents?", a: "Plain text, Markdown and CSV files are extracted today. PDF and Word extraction are not implemented yet; those files are stored but not used for grounding." }]), tryHref: "/app/knowledge",
  },
  security: {
    eyebrow: "Security", title: "Controls built for teams that answer to auditors",
    sub: "Isolation, private storage and server-side secrets are the foundation of the product.",
    blocks: [
      { title: "Row-level security", body: "Every table enforces ownership at the database, not only in application code.", points: ["Policies on all user tables", "Billing fields locked from users", "Service role used server-side only"] },
      { title: "Verified payments", body: "A redirect from checkout never upgrades an account. Plans change only through an authenticated webhook or admin action.", points: ["Shared-secret verification", "Event log of activations", "Notifications on change"] },
    ],
    grid: [
      { title: "Session handling", body: "Secure cookie sessions refreshed on each request." }, { title: "Protected routes", body: "App pages require sign-in." },
      { title: "Input validation", body: "All API input validated with schemas." }, { title: "Secret hygiene", body: "No secrets committed to the repository." },
      { title: "Atomic credits", body: "Spending is a single database operation." }, { title: "Audit log", body: "Runs retained with outcomes." },
    ],
    faq: faq(),
  },
};
