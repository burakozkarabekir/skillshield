import { JobCategory } from "@/lib/types";

/**
 * Job categories with baseline automation risk scores.
 *
 * Baseline scores derived from:
 * - Frey & Osborne (2017) occupation-level automation probabilities
 * - Goldman Sachs (2023) sector-level exposure estimates
 * - McKinsey Global Institute (2023) task-automation potential
 *
 * These baselines are blended with quiz answers. The quiz captures
 * individual variation within a role; the baseline captures structural
 * risk for the occupation.
 */
export const jobCategories: JobCategory[] = [
  {
    id: "admin-office",
    label: "Administrative & Office Support",
    baselineRisk: 85,
    typicalSkills: [
      "Data entry",
      "Scheduling",
      "Document management",
      "Email correspondence",
      "Record keeping",
    ],
    industryModifier: 5,
  },
  {
    id: "finance-accounting",
    label: "Finance & Accounting",
    baselineRisk: 72,
    typicalSkills: [
      "Financial analysis",
      "Bookkeeping",
      "Tax preparation",
      "Auditing",
      "Compliance reporting",
    ],
    industryModifier: 8,
  },
  {
    id: "legal",
    label: "Legal",
    baselineRisk: 55,
    typicalSkills: [
      "Legal research",
      "Contract review",
      "Document drafting",
      "Client counseling",
      "Litigation strategy",
    ],
    industryModifier: 5,
  },
  {
    id: "software-it",
    label: "Software Development & IT",
    baselineRisk: 45,
    typicalSkills: [
      "Coding",
      "System architecture",
      "Debugging",
      "Code review",
      "DevOps",
    ],
    industryModifier: 10,
  },
  {
    id: "marketing-content",
    label: "Marketing & Content Creation",
    baselineRisk: 62,
    typicalSkills: [
      "Copywriting",
      "Social media management",
      "SEO",
      "Brand strategy",
      "Campaign analysis",
    ],
    industryModifier: 7,
  },
  {
    id: "sales-bd",
    label: "Sales & Business Development",
    baselineRisk: 35,
    typicalSkills: [
      "Relationship building",
      "Negotiation",
      "Pipeline management",
      "Client presentations",
      "Deal structuring",
    ],
    industryModifier: 3,
  },
  {
    id: "healthcare-clinical",
    label: "Healthcare (Clinical)",
    baselineRisk: 25,
    typicalSkills: [
      "Patient assessment",
      "Clinical decision-making",
      "Hands-on care",
      "Medical procedures",
      "Patient communication",
    ],
    industryModifier: -5,
  },
  {
    id: "education-teaching",
    label: "Education & Teaching",
    baselineRisk: 30,
    typicalSkills: [
      "Lesson planning",
      "Student assessment",
      "Classroom management",
      "Mentoring",
      "Curriculum design",
    ],
    industryModifier: -3,
  },
  {
    id: "creative-design",
    label: "Creative & Design",
    baselineRisk: 42,
    typicalSkills: [
      "Visual design",
      "Art direction",
      "Creative concepting",
      "Brand identity",
      "User experience design",
    ],
    industryModifier: 5,
  },
  {
    id: "management-leadership",
    label: "Management & Leadership",
    baselineRisk: 22,
    typicalSkills: [
      "Team leadership",
      "Strategic planning",
      "Organizational development",
      "Stakeholder management",
      "Decision-making",
    ],
    industryModifier: 2,
  },
  {
    id: "trades-manufacturing",
    label: "Skilled Trades & Manufacturing",
    baselineRisk: 35,
    typicalSkills: [
      "Equipment operation",
      "Hands-on fabrication",
      "Quality inspection",
      "Maintenance & repair",
      "Safety compliance",
    ],
    industryModifier: -2,
  },
  {
    id: "customer-service",
    label: "Customer Service & Support",
    baselineRisk: 78,
    typicalSkills: [
      "Issue resolution",
      "Product knowledge",
      "Communication",
      "Ticket management",
      "Escalation handling",
    ],
    industryModifier: 6,
  },
  {
    id: "research-science",
    label: "Research & Science",
    baselineRisk: 32,
    typicalSkills: [
      "Experimental design",
      "Data analysis",
      "Literature review",
      "Hypothesis generation",
      "Peer collaboration",
    ],
    industryModifier: 4,
  },
  {
    id: "hr-people",
    label: "Human Resources & People Operations",
    baselineRisk: 52,
    typicalSkills: [
      "Recruiting",
      "Employee relations",
      "Benefits administration",
      "Performance management",
      "Policy development",
    ],
    industryModifier: 3,
  },
  {
    id: "logistics-ops",
    label: "Logistics & Operations",
    baselineRisk: 65,
    typicalSkills: [
      "Supply chain management",
      "Inventory tracking",
      "Route optimization",
      "Vendor coordination",
      "Process improvement",
    ],
    industryModifier: 5,
  },
  {
    id: "other",
    label: "Other / Not Listed",
    baselineRisk: 50,
    typicalSkills: [],
    industryModifier: 0,
  },
];
