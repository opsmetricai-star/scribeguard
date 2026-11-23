import type { FeatureData } from "@/components/marketing/FeaturePage";

const faq = (extra: { q: string; a: string }[] = []) => [
  ...extra,
  { q: "Can we evaluate the platform before committing?", a: "Yes. The Explorer plan includes 50 AI credits each month so your team can test live workflows before choosing a paid plan." },
  { q: "Where is our data stored and who can see it?", a: "Records live in an isolated workspace protected by row-level security. Only the owning account can read its documents, policies, agents and run history." },
  { q: "Can we change plans as usage grows?", a: "Yes. Upgrade from the billing page at any time. Credits refresh when a paid plan is activated." },
];

export const FEATURES: Record<string, FeatureData> = {
  platform: {
    eyebrow: "Platform", title: "One AI engine that analyzes, decides and automates",
    sub: "ScribeGuard puts a reasoning model at the center of your workflows. It reads your content, scores risk, decides what clears policy and completes the work, so review capacity goes to the exceptions that matter.",
    blocks: [
      { title: "Analyze every input", body: "Each piece of text is evaluated against your rules and your own documents, producing a verdict, a compliance score and itemized findings.", points: ["Pass, warn or block decisions", "Severity-ranked findings with excerpts", "Scores that let you triage at volume"] },
      { title: "Decide and automate", body: "Agents carry instructions through to a finished output, then apply policy before anything leaves the platform.", points: ["Instruction-driven agents", "Policy applied to every run", "Rewrites that resolve findings automatically"] },
      { title: "Prove every outcome", body: "Every run records its input, output, verdict and cost, giving risk and finance teams the evidence they ask for.", points: ["Complete run history", "Usage charts by day and type", "Credit metering tied to your plan"] },
    ],
    grid: [
      { title: "Assistant", body: "A reasoning workspace for analysis, drafting and synthesis." },
      { title: "Guardrail engine", body: "Structured, validated policy decisions on any text." },
      { title: "Agent runtime", body: "Instructions, policy and knowledge combined into repeatable workflows." },
      { title: "Knowledge library", body: "Private storage whose contents ground every agent answer." },
      { title: "Analytics", body: "Credits, volume and verdict mix over time." },
      { title: "Billing and limits", body: "Plan status, metering and upgrades in one place." },
    ],
    faq: faq(),
  },
  agents: {
    eyebrow: "Agents", title: "Agents that execute the work and answer to your policy",
    sub: "Define a role in plain language and the agent analyzes inputs, applies your rules and delivers a finished output. Every run is metered and recorded.",
    blocks: [
      { title: "From instruction to outcome", body: "Describe the job, the tone and the output format. The agent reasons over the input and returns a result ready to use.", points: ["Reusable instruction sets", "Attach any saved policy", "Edit and rerun in seconds"] },
      { title: "Grounded in your documents", body: "Agents draw on your latest knowledge documents, so answers reflect your own facts instead of generic model memory.", points: ["Private document storage", "Text extracted for grounding", "Source documents stay under your control"] },
      { title: "Metered and accountable", body: "Each run records its input, output and credits, so cost and quality stay visible to the whole team.", points: ["Agent allowances by plan", "Real-time credit counter", "Full run history"] },
    ],
    grid: [
      { title: "Policy-aware", body: "Agents are bound to the rules you set." },
      { title: "Fast iteration", body: "Change instructions and test the effect immediately." },
      { title: "Plan-based capacity", body: "Agent counts scale with your subscription." },
      { title: "Run history", body: "Every execution stored for review." },
      { title: "Safe by default", body: "A baseline policy applies even without custom rules." },
      { title: "Fair metering", body: "Credits are returned when a model call fails." },
    ],
    faq: faq([{ q: "How many agents does each plan include?", a: "Explorer includes 1, Starter 3, Pro 10 and Business 50." }]),
  },
  guardrails: {
    eyebrow: "Guardrails", title: "Automated risk decisions on every input and output",
    sub: "Submit any text and the engine returns a verdict, a 0 to 100 compliance score, itemized findings and a compliant rewrite. Reviewers see exceptions, not volume.",
    blocks: [
      { title: "Validated, structured decisions", body: "Every check returns a verdict, score and findings that are validated against a schema before they reach your team.", points: ["Pass, warn or block verdicts", "Severity on every finding", "Excerpt, explanation and remedy"] },
      { title: "Policies written in plain language", body: "Encode your own rules once and apply them to every check and every agent.", points: ["Saved policy library", "Combined with a baseline policy", "Reused across agents"] },
      { title: "A rewrite that clears the rules", body: "Each check includes a revised version that resolves the findings, ready to copy into your workflow.", points: ["Preserves intent", "Removes restricted content", "Copy in one click"] },
    ],
    grid: [
      { title: "Sensitive data", body: "Detect emails, phone numbers and identifiers." },
      { title: "Unsupported claims", body: "Flag absolutes and statements you cannot substantiate." },
      { title: "Tone control", body: "Hold language to a professional, brand-safe standard." },
      { title: "Compliance score", body: "A 0 to 100 score for rapid triage." },
      { title: "Decision history", body: "Every check stored with its verdict." },
      { title: "Enforced limits", body: "Input size and credits are enforced on the server." },
    ],
    faq: faq([{ q: "Does a guardrail verdict replace compliance review?", a: "No. It is an automated first pass that narrows human review to the cases that need judgment. It supports your compliance process and does not substitute for it." }]),
  },
  models: {
    eyebrow: "Models", title: "The reasoning layer behind every decision",
    sub: "ScribeGuard routes each task to a leading large language model and wraps it in structured prompts, schema validation and spend controls, so output is dependable enough to act on.",
    blocks: [
      { title: "Structured outputs for decisions", body: "Where precision matters, responses are requested as JSON and validated against a schema before use.", points: ["Schema validation on every decision", "Automatic error handling", "Clear failure messages"] },
      { title: "Credentials stay on the server", body: "Model access is handled entirely server-side and is never exposed to the browser.", points: ["No keys in client code", "Request timeouts", "Credit limits enforced per account"] },
      { title: "Built for continuity", body: "If the primary model is overloaded, the platform fails over to a secondary model automatically.", points: ["Automatic failover", "Consistent interface", "Model choice set by configuration"] },
    ],
    grid: [
      { title: "Long inputs", body: "Check documents up to 12,000 characters." },
      { title: "Conversation memory", body: "The assistant keeps recent context." },
      { title: "Conservative scoring", body: "Guardrail checks run at low temperature." },
      { title: "Bounded latency", body: "Requests are capped at 30 seconds per model." },
      { title: "Fair billing", body: "Failed calls are never charged." },
      { title: "Configurable", body: "Select models through environment settings." },
    ],
    faq: faq(),
  },
  knowledge: {
    eyebrow: "Knowledge", title: "Decisions grounded in your own documents",
    sub: "Upload the documents your business runs on and agents use them as evidence, so answers reflect your policies and facts.",
    blocks: [
      { title: "Private by design", body: "Files sit in a private bucket inside your own folder, readable only by your account.", points: ["Per-account storage paths", "Storage policies enforced in the database", "Delete at any time"] },
      { title: "Evidence for every agent", body: "Text from uploaded plain-text, Markdown and CSV files is extracted and supplied to agents as grounding.", points: ["TXT, MD and CSV extraction", "Most recent documents prioritized", "PDF and Word files stored for retrieval"] },
    ],
    grid: [
      { title: "Upload", body: "Add documents directly in the app." }, { title: "Extract", body: "Text files are prepared for grounding." },
      { title: "Manage", body: "Remove documents when they go stale." }, { title: "Retrieve", body: "Download originals through expiring links." },
      { title: "Size control", body: "Files up to 5 MB each." }, { title: "Traceable", body: "Upload times recorded." },
    ],
    faq: faq([{ q: "Which file types are read by agents?", a: "Plain text, Markdown and CSV files are read today. PDF and Word files are stored and can be downloaded, but their contents are not yet used for grounding." }]),
  },
  security: {
    eyebrow: "Security", title: "Controls built for teams that answer to auditors",
    sub: "Isolation, private storage and server-side secrets are the foundation of the platform, not an add-on.",
    blocks: [
      { title: "Row-level security", body: "Every table enforces ownership inside the database, not only in application code.", points: ["Policies on all account data", "Billing fields locked from users", "Privileged access kept server-side"] },
      { title: "Verified payments only", body: "A redirect from checkout never upgrades an account. Plans change only through an authenticated confirmation.", points: ["Shared-secret verification", "Event log of activations", "Notification on every change"] },
    ],
    grid: [
      { title: "Session handling", body: "Secure cookie sessions refreshed on every request." }, { title: "Protected routes", body: "Application pages require sign-in." },
      { title: "Input validation", body: "All API input validated against schemas." }, { title: "Secret hygiene", body: "No credentials in the repository." },
      { title: "Atomic credits", body: "Spending is a single database operation." }, { title: "Audit trail", body: "Runs retained with outcomes." },
    ],
    faq: faq(),
  },
};
