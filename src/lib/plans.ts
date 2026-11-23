export type PlanId = "free" | "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  price: number | null;
  blurb: string;
  credits: number; // monthly AI credits
  agents: number;
  seats: number;
  checkoutUrl: string | null;
  features: string[];
  highlight?: boolean;
}

// Checkout links supplied by the owner. Plan-to-link mapping follows the URL names (47/57/97).
export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Explorer",
    price: 0,
    blurb: "Evaluate the platform on live workflows with a monthly credit allowance.",
    credits: 50,
    agents: 1,
    seats: 1,
    checkoutUrl: null,
    features: ["50 AI credits / month", "1 agent", "Guardrail checks", "Community support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: 47,
    blurb: "For teams moving their first AI workflows into production under policy.",
    credits: 500,
    agents: 3,
    seats: 3,
    checkoutUrl: "https://selar.com/47plan?currency=USD",
    features: ["500 AI credits / month", "3 agents", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 57,
    blurb: "For departments running several agents at sustained volume.",
    credits: 2000,
    agents: 10,
    seats: 10,
    checkoutUrl: "https://selar.com/57plan?currency=USD",
    features: ["2,000 AI credits / month", "10 agents", "Priority support"],
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    price: 97,
    blurb: "For organizations running agents across multiple business units.",
    credits: 8000,
    agents: 50,
    seats: 50,
    checkoutUrl: "https://selar.com/97plan?currency=USD",
    features: ["8,000 AI credits / month", "50 agents", "Advanced analytics and audit log", "Dedicated success manager"],
  },
];

export const getPlan = (id: string | null | undefined): Plan =>
  PLANS.find((p) => p.id === id) ?? PLANS[0];

export const CREDIT_COST = { chat: 1, guardrail: 1, agent: 2 } as const;
