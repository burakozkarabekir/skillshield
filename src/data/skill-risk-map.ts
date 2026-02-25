import { SkillRisk } from "@/lib/types";

/**
 * Comprehensive skill-level risk mapping.
 *
 * Each skill is assessed against current and near-future AI capabilities
 * based on:
 * - Demonstrated LLM capabilities (GPT-4, Claude, Gemini benchmarks)
 * - Computer vision state-of-the-art (2024-2025)
 * - Robotics maturity levels
 * - O*NET task decomposition
 * - Real-world enterprise deployment patterns
 */
export const skillRiskMap: Record<string, SkillRisk> = {
  // ── HIGH RISK SKILLS ──────────────────────────────────────────────────────
  "Data entry": {
    skillName: "Data entry",
    riskLevel: "high",
    riskScore: 95,
    explanation:
      "Data entry is one of the most automated tasks globally. OCR, form parsing, and RPA tools handle this faster and more accurately than humans.",
    aiCapability: "OCR + RPA + LLM extraction",
    timeHorizon: "now",
  },
  Scheduling: {
    skillName: "Scheduling",
    riskLevel: "high",
    riskScore: 85,
    explanation:
      "AI scheduling tools (Calendly AI, x.ai) already handle multi-party scheduling, resource allocation, and calendar optimization.",
    aiCapability: "AI scheduling agents",
    timeHorizon: "now",
  },
  "Document management": {
    skillName: "Document management",
    riskLevel: "high",
    riskScore: 88,
    explanation:
      "AI can classify, tag, organize, and retrieve documents more efficiently than humans. Enterprise search + RAG systems are replacing manual document management.",
    aiCapability: "RAG + document AI",
    timeHorizon: "now",
  },
  "Email correspondence": {
    skillName: "Email correspondence",
    riskLevel: "high",
    riskScore: 80,
    explanation:
      "LLMs can draft, respond to, and triage emails effectively. Gmail Smart Compose, Outlook Copilot, and similar tools are already mainstream.",
    aiCapability: "LLM text generation",
    timeHorizon: "now",
  },
  "Record keeping": {
    skillName: "Record keeping",
    riskLevel: "high",
    riskScore: 90,
    explanation:
      "Automated record-keeping systems eliminate manual logging, tracking, and filing. Cloud databases with AI interfaces handle this end-to-end.",
    aiCapability: "Database automation + RPA",
    timeHorizon: "now",
  },
  Bookkeeping: {
    skillName: "Bookkeeping",
    riskLevel: "high",
    riskScore: 88,
    explanation:
      "AI bookkeeping tools (QuickBooks AI, Bench AI) automate transaction categorization, reconciliation, and basic financial reporting.",
    aiCapability: "Financial AI + RPA",
    timeHorizon: "now",
  },
  "Tax preparation": {
    skillName: "Tax preparation",
    riskLevel: "high",
    riskScore: 82,
    explanation:
      "TurboTax, H&R Block AI, and similar tools automate standard tax preparation. Complex cases still need human CPAs, but routine filings are automated.",
    aiCapability: "Rule-based AI + LLM",
    timeHorizon: "now",
  },
  Copywriting: {
    skillName: "Copywriting",
    riskLevel: "high",
    riskScore: 78,
    explanation:
      "LLMs produce quality marketing copy, ad text, and product descriptions. Human copywriters increasingly shift to editing and brand voice curation.",
    aiCapability: "LLM text generation",
    timeHorizon: "now",
  },
  "Social media management": {
    skillName: "Social media management",
    riskLevel: "high",
    riskScore: 75,
    explanation:
      "AI tools handle content scheduling, basic creation, audience analytics, and even comment responses. Strategy and brand voice still need humans.",
    aiCapability: "Content AI + analytics",
    timeHorizon: "now",
  },
  SEO: {
    skillName: "SEO",
    riskLevel: "high",
    riskScore: 72,
    explanation:
      "AI SEO tools analyze keywords, optimize content, and monitor rankings automatically. The strategic layer persists but execution is increasingly automated.",
    aiCapability: "Search AI + content optimization",
    timeHorizon: "now",
  },
  "Legal research": {
    skillName: "Legal research",
    riskLevel: "high",
    riskScore: 80,
    explanation:
      "AI legal research tools (Westlaw AI, CoCounsel) can search case law, identify relevant precedents, and summarize findings faster than junior associates.",
    aiCapability: "LLM + legal databases",
    timeHorizon: "now",
  },
  "Contract review": {
    skillName: "Contract review",
    riskLevel: "high",
    riskScore: 76,
    explanation:
      "AI contract review tools flag risks, inconsistencies, and non-standard clauses. Routine contract review is being automated; complex negotiation strategy is not.",
    aiCapability: "LLM document analysis",
    timeHorizon: "now",
  },
  "Ticket management": {
    skillName: "Ticket management",
    riskLevel: "high",
    riskScore: 85,
    explanation:
      "AI triage, classify, and auto-respond to support tickets. Level 1 support is heavily automated; escalation to humans happens for complex issues only.",
    aiCapability: "Chatbots + ticket AI",
    timeHorizon: "now",
  },
  "Issue resolution": {
    skillName: "Issue resolution",
    riskLevel: "high",
    riskScore: 72,
    explanation:
      "Routine issue resolution follows patterns that AI can learn from historical tickets. Complex, novel, or emotionally charged issues still need humans.",
    aiCapability: "LLM + knowledge base AI",
    timeHorizon: "2-3 years",
  },
  "Inventory tracking": {
    skillName: "Inventory tracking",
    riskLevel: "high",
    riskScore: 88,
    explanation:
      "IoT sensors, RFID, and AI-powered inventory management systems track stock levels, predict demand, and automate reordering with minimal human input.",
    aiCapability: "IoT + predictive AI",
    timeHorizon: "now",
  },
  "Literature review": {
    skillName: "Literature review",
    riskLevel: "high",
    riskScore: 75,
    explanation:
      "AI tools like Elicit, Semantic Scholar AI, and LLM-based search can scan, summarize, and synthesize research papers far faster than humans.",
    aiCapability: "LLM + academic search",
    timeHorizon: "now",
  },

  // ── MEDIUM RISK SKILLS ────────────────────────────────────────────────────
  "Financial analysis": {
    skillName: "Financial analysis",
    riskLevel: "medium",
    riskScore: 60,
    explanation:
      "AI handles quantitative analysis and pattern detection well, but interpretation, stakeholder communication, and strategic recommendations still need human analysts.",
    aiCapability: "ML + LLM analysis",
    timeHorizon: "2-3 years",
  },
  Auditing: {
    skillName: "Auditing",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "AI can flag anomalies and automate compliance checks, but the judgment, professional skepticism, and client interaction in auditing require human expertise.",
    aiCapability: "Anomaly detection + rule engines",
    timeHorizon: "2-3 years",
  },
  "Compliance reporting": {
    skillName: "Compliance reporting",
    riskLevel: "medium",
    riskScore: 65,
    explanation:
      "AI automates data gathering and report generation for compliance, but regulatory interpretation and stakeholder communication still need humans.",
    aiCapability: "RegTech AI",
    timeHorizon: "2-3 years",
  },
  Coding: {
    skillName: "Coding",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "AI coding tools (Copilot, Cursor) accelerate development significantly. Routine coding tasks are automatable, but architecture, debugging complex systems, and understanding business context still need skilled engineers.",
    aiCapability: "LLM code generation",
    timeHorizon: "2-3 years",
  },
  "Code review": {
    skillName: "Code review",
    riskLevel: "medium",
    riskScore: 50,
    explanation:
      "AI can flag bugs, style issues, and security vulnerabilities, but understanding design intent, assessing maintainability, and mentoring through reviews is still human.",
    aiCapability: "Static analysis + LLM",
    timeHorizon: "2-3 years",
  },
  DevOps: {
    skillName: "DevOps",
    riskLevel: "medium",
    riskScore: 45,
    explanation:
      "Infrastructure-as-code and CI/CD automation are mature, but incident response, architecture decisions, and cross-team coordination need human DevOps engineers.",
    aiCapability: "IaC + monitoring AI",
    timeHorizon: "5+ years",
  },
  "Document drafting": {
    skillName: "Document drafting",
    riskLevel: "medium",
    riskScore: 65,
    explanation:
      "LLMs produce quality first drafts of most business documents. The value shifts from drafting to reviewing, refining, and ensuring accuracy.",
    aiCapability: "LLM text generation",
    timeHorizon: "now",
  },
  "Campaign analysis": {
    skillName: "Campaign analysis",
    riskLevel: "medium",
    riskScore: 60,
    explanation:
      "AI analytics tools handle performance tracking and basic attribution well. Strategic interpretation and cross-channel optimization insights still add human value.",
    aiCapability: "Marketing analytics AI",
    timeHorizon: "2-3 years",
  },
  "Product knowledge": {
    skillName: "Product knowledge",
    riskLevel: "medium",
    riskScore: 60,
    explanation:
      "AI chatbots with product knowledge bases answer customer questions effectively. Deep product expertise for complex configurations still needs specialists.",
    aiCapability: "RAG + chatbot AI",
    timeHorizon: "2-3 years",
  },
  Recruiting: {
    skillName: "Recruiting",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "AI handles resume screening, candidate sourcing, and initial outreach. But assessing cultural fit, closing candidates, and navigating compensation requires human recruiters.",
    aiCapability: "ATS AI + sourcing tools",
    timeHorizon: "2-3 years",
  },
  "Benefits administration": {
    skillName: "Benefits administration",
    riskLevel: "medium",
    riskScore: 68,
    explanation:
      "Benefits enrollment, tracking, and FAQ responses are increasingly automated. Complex situations (leave cases, accommodations) still need human judgment.",
    aiCapability: "HRIS automation",
    timeHorizon: "2-3 years",
  },
  "Supply chain management": {
    skillName: "Supply chain management",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "AI optimizes routing, demand forecasting, and vendor selection. But managing supplier relationships, handling disruptions, and strategic sourcing need humans.",
    aiCapability: "Predictive logistics AI",
    timeHorizon: "2-3 years",
  },
  "Route optimization": {
    skillName: "Route optimization",
    riskLevel: "medium",
    riskScore: 65,
    explanation:
      "Algorithmic route optimization is mature and outperforms human planners. But real-world exceptions and customer preferences add human value.",
    aiCapability: "Optimization algorithms",
    timeHorizon: "now",
  },
  "Data analysis": {
    skillName: "Data analysis",
    riskLevel: "medium",
    riskScore: 58,
    explanation:
      "AI handles data cleaning, visualization, and pattern detection well. Strategic interpretation and translating insights to action still need human analysts.",
    aiCapability: "ML + automated analytics",
    timeHorizon: "2-3 years",
  },
  "Visual design": {
    skillName: "Visual design",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "AI image generation (Midjourney, DALL-E) creates impressive outputs, but brand coherence, contextual design, and client collaboration still need human designers.",
    aiCapability: "Image generation AI",
    timeHorizon: "2-3 years",
  },
  "Lesson planning": {
    skillName: "Lesson planning",
    riskLevel: "medium",
    riskScore: 50,
    explanation:
      "AI can generate lesson plans, worksheets, and assessments. But adapting to specific student needs, classroom dynamics, and pedagogical goals needs teachers.",
    aiCapability: "EdTech AI",
    timeHorizon: "2-3 years",
  },
  "Student assessment": {
    skillName: "Student assessment",
    riskLevel: "medium",
    riskScore: 45,
    explanation:
      "AI handles standardized grading well but struggles with assessing critical thinking, creativity, and personal growth in students.",
    aiCapability: "Automated grading",
    timeHorizon: "2-3 years",
  },
  "Pipeline management": {
    skillName: "Pipeline management",
    riskLevel: "medium",
    riskScore: 55,
    explanation:
      "CRM AI handles pipeline tracking, forecasting, and next-action suggestions. But qualifying deals and reading buyer signals needs human salespeople.",
    aiCapability: "CRM AI + predictive sales",
    timeHorizon: "2-3 years",
  },
  "Process improvement": {
    skillName: "Process improvement",
    riskLevel: "medium",
    riskScore: 45,
    explanation:
      "AI can identify bottlenecks from process data, but designing solutions that work within organizational culture and managing change needs human expertise.",
    aiCapability: "Process mining AI",
    timeHorizon: "5+ years",
  },
  "Vendor coordination": {
    skillName: "Vendor coordination",
    riskLevel: "medium",
    riskScore: 45,
    explanation:
      "Routine vendor communications can be automated, but negotiation, relationship management, and handling exceptions require human coordinators.",
    aiCapability: "Procurement AI",
    timeHorizon: "5+ years",
  },
  Communication: {
    skillName: "Communication",
    riskLevel: "medium",
    riskScore: 40,
    explanation:
      "AI handles written communication well but interpersonal communication, tone-reading, and emotionally sensitive conversations still need humans.",
    aiCapability: "LLM text generation",
    timeHorizon: "5+ years",
  },
  "Escalation handling": {
    skillName: "Escalation handling",
    riskLevel: "medium",
    riskScore: 40,
    explanation:
      "Escalated issues typically involve frustrated customers or novel problems — both areas where human empathy and creative problem-solving outperform AI.",
    aiCapability: "Advanced chatbot AI",
    timeHorizon: "5+ years",
  },
  "Policy development": {
    skillName: "Policy development",
    riskLevel: "medium",
    riskScore: 40,
    explanation:
      "AI can draft policy documents from templates, but developing policies requires understanding organizational politics, legal constraints, and cultural impact.",
    aiCapability: "LLM + compliance AI",
    timeHorizon: "5+ years",
  },
  "Performance management": {
    skillName: "Performance management",
    riskLevel: "medium",
    riskScore: 38,
    explanation:
      "AI assists with performance tracking and data, but the coaching conversations, development planning, and feedback delivery require human managers.",
    aiCapability: "People analytics AI",
    timeHorizon: "5+ years",
  },
  "Curriculum design": {
    skillName: "Curriculum design",
    riskLevel: "medium",
    riskScore: 40,
    explanation:
      "AI can suggest curriculum structures and learning objectives, but aligning to pedagogy, community standards, and student needs requires human educators.",
    aiCapability: "EdTech AI",
    timeHorizon: "5+ years",
  },
  "User experience design": {
    skillName: "User experience design",
    riskLevel: "medium",
    riskScore: 42,
    explanation:
      "AI can generate wireframes and suggest UI patterns, but understanding user psychology, conducting research, and designing for accessibility needs human designers.",
    aiCapability: "Design AI + prototyping tools",
    timeHorizon: "5+ years",
  },

  // ── LOW RISK SKILLS ───────────────────────────────────────────────────────
  "System architecture": {
    skillName: "System architecture",
    riskLevel: "low",
    riskScore: 30,
    explanation:
      "System architecture requires understanding business context, technical constraints, team capabilities, and long-term maintainability — deeply contextual human judgment.",
    aiCapability: "LLM-assisted design",
    timeHorizon: "5+ years",
  },
  Debugging: {
    skillName: "Debugging",
    riskLevel: "low",
    riskScore: 35,
    explanation:
      "AI can assist with identifying common bugs, but complex debugging across distributed systems with subtle interaction effects still requires deep human expertise.",
    aiCapability: "LLM code analysis",
    timeHorizon: "5+ years",
  },
  "Client counseling": {
    skillName: "Client counseling",
    riskLevel: "low",
    riskScore: 18,
    explanation:
      "Legal client counseling involves understanding personal situations, risk tolerance, and building trust. This is deeply interpersonal and judgment-intensive.",
    aiCapability: "None adequate",
    timeHorizon: "unlikely",
  },
  "Litigation strategy": {
    skillName: "Litigation strategy",
    riskLevel: "low",
    riskScore: 20,
    explanation:
      "Litigation strategy requires understanding judges, opposing counsel, jury psychology, and case-specific nuance that AI cannot replicate.",
    aiCapability: "LLM analysis (assistant only)",
    timeHorizon: "unlikely",
  },
  "Brand strategy": {
    skillName: "Brand strategy",
    riskLevel: "low",
    riskScore: 28,
    explanation:
      "Brand strategy requires cultural intuition, market sensing, and creative vision that goes beyond pattern matching. AI assists but doesn't replace strategists.",
    aiCapability: "Market analytics AI",
    timeHorizon: "5+ years",
  },
  "Relationship building": {
    skillName: "Relationship building",
    riskLevel: "low",
    riskScore: 10,
    explanation:
      "Building genuine trust, rapport, and long-term business relationships is fundamentally human. AI cannot attend dinners, read body language, or build social capital.",
    timeHorizon: "unlikely",
  },
  Negotiation: {
    skillName: "Negotiation",
    riskLevel: "low",
    riskScore: 12,
    explanation:
      "High-stakes negotiation requires reading the room, managing emotions, building coalitions, and making real-time strategic pivots. Deeply human.",
    timeHorizon: "unlikely",
  },
  "Client presentations": {
    skillName: "Client presentations",
    riskLevel: "low",
    riskScore: 25,
    explanation:
      "AI can generate slides, but presenting persuasively, reading the audience, handling live questions, and building confidence requires human presence.",
    aiCapability: "Presentation AI (assist only)",
    timeHorizon: "5+ years",
  },
  "Deal structuring": {
    skillName: "Deal structuring",
    riskLevel: "low",
    riskScore: 22,
    explanation:
      "Structuring complex deals requires understanding regulatory constraints, risk appetite, relationship dynamics, and creative problem-solving in ambiguous situations.",
    aiCapability: "Financial modeling AI (assist only)",
    timeHorizon: "5+ years",
  },
  "Patient assessment": {
    skillName: "Patient assessment",
    riskLevel: "low",
    riskScore: 20,
    explanation:
      "Clinical assessment combines physical examination, patient history interpretation, and clinical judgment in ways that AI cannot replicate — especially with hands-on components.",
    aiCapability: "Diagnostic AI (assist only)",
    timeHorizon: "5+ years",
  },
  "Clinical decision-making": {
    skillName: "Clinical decision-making",
    riskLevel: "low",
    riskScore: 22,
    explanation:
      "Medical decision-making involves integrating patient preferences, clinical evidence, comorbidities, and ethical considerations. AI assists but doctors decide.",
    aiCapability: "Clinical decision support",
    timeHorizon: "5+ years",
  },
  "Hands-on care": {
    skillName: "Hands-on care",
    riskLevel: "low",
    riskScore: 8,
    explanation:
      "Physical patient care — bathing, wound care, physical therapy, surgery — requires dexterity, empathy, and real-time adaptation that robotics cannot match.",
    timeHorizon: "unlikely",
  },
  "Medical procedures": {
    skillName: "Medical procedures",
    riskLevel: "low",
    riskScore: 15,
    explanation:
      "Surgical and medical procedures require fine motor skills, real-time judgment, and the ability to handle unexpected complications. Robotic surgery assists but doesn't replace.",
    aiCapability: "Surgical robotics (assist only)",
    timeHorizon: "unlikely",
  },
  "Patient communication": {
    skillName: "Patient communication",
    riskLevel: "low",
    riskScore: 10,
    explanation:
      "Delivering diagnoses, managing patient anxiety, and building therapeutic relationships requires empathy and emotional intelligence AI cannot replicate.",
    timeHorizon: "unlikely",
  },
  "Classroom management": {
    skillName: "Classroom management",
    riskLevel: "low",
    riskScore: 10,
    explanation:
      "Managing a room full of students requires physical presence, reading emotional cues, maintaining discipline, and adapting in real-time. This is irreplaceably human.",
    timeHorizon: "unlikely",
  },
  Mentoring: {
    skillName: "Mentoring",
    riskLevel: "low",
    riskScore: 8,
    explanation:
      "Mentoring is built on trust, personal connection, and contextual understanding of someone's career and life. AI can inform but cannot mentor.",
    timeHorizon: "unlikely",
  },
  "Art direction": {
    skillName: "Art direction",
    riskLevel: "low",
    riskScore: 30,
    explanation:
      "Art direction requires creative vision, cultural awareness, and the ability to guide creative teams — all deeply human, even as AI generates more raw content.",
    aiCapability: "Image generation AI (raw content only)",
    timeHorizon: "5+ years",
  },
  "Creative concepting": {
    skillName: "Creative concepting",
    riskLevel: "low",
    riskScore: 28,
    explanation:
      "Original creative concepts require connecting disparate ideas, cultural intuition, and genuine novelty. AI can remix but struggles to truly originate.",
    aiCapability: "Generative AI (derivative only)",
    timeHorizon: "5+ years",
  },
  "Brand identity": {
    skillName: "Brand identity",
    riskLevel: "low",
    riskScore: 25,
    explanation:
      "Defining a brand identity requires understanding market positioning, emotional resonance, and cultural context at a level AI cannot achieve independently.",
    timeHorizon: "5+ years",
  },
  "Team leadership": {
    skillName: "Team leadership",
    riskLevel: "low",
    riskScore: 10,
    explanation:
      "Leading teams requires emotional intelligence, conflict resolution, motivation, and trust-building. These are the most fundamentally human workplace skills.",
    timeHorizon: "unlikely",
  },
  "Strategic planning": {
    skillName: "Strategic planning",
    riskLevel: "low",
    riskScore: 20,
    explanation:
      "Long-term strategy requires market intuition, organizational knowledge, stakeholder management, and vision. AI provides data but humans set direction.",
    aiCapability: "Analytics AI (data support only)",
    timeHorizon: "5+ years",
  },
  "Organizational development": {
    skillName: "Organizational development",
    riskLevel: "low",
    riskScore: 15,
    explanation:
      "Reshaping organizational culture, structure, and capabilities requires deep understanding of human dynamics and change management. Irreplaceably human.",
    timeHorizon: "unlikely",
  },
  "Stakeholder management": {
    skillName: "Stakeholder management",
    riskLevel: "low",
    riskScore: 12,
    explanation:
      "Managing diverse stakeholders with competing interests requires political savvy, relationship skills, and real-time negotiation. AI cannot navigate politics.",
    timeHorizon: "unlikely",
  },
  "Decision-making": {
    skillName: "Decision-making",
    riskLevel: "low",
    riskScore: 18,
    explanation:
      "Strategic decision-making under uncertainty, with incomplete information and competing stakeholder interests, remains a distinctly human strength.",
    aiCapability: "Decision support AI",
    timeHorizon: "5+ years",
  },
  "Equipment operation": {
    skillName: "Equipment operation",
    riskLevel: "low",
    riskScore: 25,
    explanation:
      "Operating heavy equipment requires spatial awareness, fine motor control, real-time environmental assessment, and safety judgment that robotics can't match yet.",
    aiCapability: "Autonomous machinery (limited)",
    timeHorizon: "5+ years",
  },
  "Hands-on fabrication": {
    skillName: "Hands-on fabrication",
    riskLevel: "low",
    riskScore: 20,
    explanation:
      "Custom fabrication, fitting, and craftsmanship require dexterity, spatial reasoning, and material knowledge that robotics cannot replicate for non-standard work.",
    timeHorizon: "unlikely",
  },
  "Quality inspection": {
    skillName: "Quality inspection",
    riskLevel: "low",
    riskScore: 35,
    explanation:
      "AI visual inspection is advancing for standardized products, but complex assemblies and non-standard work still need experienced human inspectors.",
    aiCapability: "Computer vision QC",
    timeHorizon: "2-3 years",
  },
  "Maintenance & repair": {
    skillName: "Maintenance & repair",
    riskLevel: "low",
    riskScore: 15,
    explanation:
      "Diagnosing and repairing equipment in the field requires physical skills, troubleshooting intuition, and adaptability that robotics cannot provide.",
    timeHorizon: "unlikely",
  },
  "Safety compliance": {
    skillName: "Safety compliance",
    riskLevel: "low",
    riskScore: 30,
    explanation:
      "While AI can monitor sensor data, hands-on safety assessment, site inspection, and enforcing compliance with workers requires human presence and authority.",
    aiCapability: "IoT monitoring",
    timeHorizon: "5+ years",
  },
  "Experimental design": {
    skillName: "Experimental design",
    riskLevel: "low",
    riskScore: 25,
    explanation:
      "Designing novel experiments requires creative hypothesis generation, methodological expertise, and understanding of practical constraints AI cannot fully grasp.",
    aiCapability: "ML-assisted design",
    timeHorizon: "5+ years",
  },
  "Hypothesis generation": {
    skillName: "Hypothesis generation",
    riskLevel: "low",
    riskScore: 22,
    explanation:
      "Generating scientifically meaningful hypotheses requires deep domain knowledge, creative thinking, and awareness of what's truly novel. AI can suggest but not originate.",
    aiCapability: "LLM ideation (assist only)",
    timeHorizon: "5+ years",
  },
  "Peer collaboration": {
    skillName: "Peer collaboration",
    riskLevel: "low",
    riskScore: 8,
    explanation:
      "Scientific collaboration involves trust, intellectual exchange, debate, and shared exploration. These are human social processes AI cannot participate in as a peer.",
    timeHorizon: "unlikely",
  },
  "Employee relations": {
    skillName: "Employee relations",
    riskLevel: "low",
    riskScore: 15,
    explanation:
      "Managing employee grievances, mediating conflicts, and navigating sensitive workplace situations requires empathy, discretion, and human judgment.",
    timeHorizon: "unlikely",
  },
};
