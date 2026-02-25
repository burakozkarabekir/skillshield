import { QuizQuestion } from "@/lib/types";

/**
 * Quiz questions mapped to scoring dimensions.
 * 10 questions total — should take ~2-3 minutes.
 *
 * Score semantics: higher score = MORE at risk from AI automation.
 * Each answer's score (0-100) represents risk contribution for that dimension.
 */
export const quizQuestions: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION: taskComposition (weight: 0.30)
  // Research basis: Frey & Osborne's bottleneck framework — routine cognitive
  // tasks are most automatable, followed by routine manual, then non-routine.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tc1",
    dimension: "taskComposition",
    question: "What does a typical day at work look like for you?",
    helpText: "Think about the tasks you spend the most time on.",
    answers: [
      {
        id: "tc1-a",
        text: "Mostly processing information — data entry, filing, sorting, or formatting",
        score: 90,
        reasoning:
          "Routine information processing is the #1 category AI automates. LLMs and RPA can handle data entry, classification, and formatting with high accuracy.",
      },
      {
        id: "tc1-b",
        text: "Analyzing data, writing reports, or making decisions based on rules",
        score: 70,
        reasoning:
          "Rule-based analysis and report generation are increasingly handled by AI. Tools like GPT-4 can already draft reports and apply decision trees.",
      },
      {
        id: "tc1-c",
        text: "A mix of desk work and working directly with people or physical tasks",
        score: 45,
        reasoning:
          "Hybrid roles have partial automation exposure. The desk-work portion is at risk, but the in-person component provides some defensibility.",
      },
      {
        id: "tc1-d",
        text: "Mostly creative work, strategy, or solving novel problems",
        score: 20,
        reasoning:
          "Creative and strategic work remains hard for AI. While AI can assist, the synthesis of novel ideas and strategic judgment still requires human cognition.",
      },
    ],
  },
  {
    id: "tc2",
    dimension: "taskComposition",
    question:
      "How often could someone do your work by following a detailed instruction manual?",
    helpText:
      "If your work follows clear steps, it's more routine. If every day is different, it's less routine.",
    answers: [
      {
        id: "tc2-a",
        text: "Almost always — my work follows clear, repeatable steps",
        score: 90,
        reasoning:
          "Highly procedural work is prime territory for automation. If it can be documented step-by-step, it can be coded or prompted.",
      },
      {
        id: "tc2-b",
        text: "Often, but I need to make judgment calls along the way",
        score: 60,
        reasoning:
          "Semi-structured work is partially automatable. AI can handle the routine parts, but your judgment calls add value — for now.",
      },
      {
        id: "tc2-c",
        text: "Sometimes — each project is somewhat different",
        score: 35,
        reasoning:
          "Variable work with unique projects is harder to automate. AI works best when patterns repeat; novelty creates a moat.",
      },
      {
        id: "tc2-d",
        text: "Rarely — my work requires constant improvisation and adaptation",
        score: 10,
        reasoning:
          "Improvisation and contextual adaptation are among the hardest tasks for AI. This maps to Frey & Osborne's 'non-routine cognitive' category.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION: skillReplaceability (weight: 0.25)
  // Research basis: O*NET task breakdowns + real-world AI capabilities
  // assessment. Skills are scored by current AI capability benchmarks.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "sr1",
    dimension: "skillReplaceability",
    question: "Which of these best describes your most important work skill?",
    helpText:
      "Pick the one skill that would be hardest to replace if you left your job.",
    answers: [
      {
        id: "sr1-a",
        text: "Writing, summarizing, or communicating information clearly",
        score: 75,
        reasoning:
          "LLMs now produce human-quality writing for most business contexts. Summarization, email drafting, and content creation are core AI strengths.",
      },
      {
        id: "sr1-b",
        text: "Building relationships, negotiating, or persuading people",
        score: 20,
        reasoning:
          "Interpersonal influence requires emotional intelligence, trust, and real-time social calibration. AI cannot replicate genuine rapport or negotiate in high-stakes settings.",
      },
      {
        id: "sr1-c",
        text: "Technical expertise — coding, engineering, operating specialized equipment",
        score: 55,
        reasoning:
          "AI coding assistants are advancing fast (Copilot, Cursor), but complex system design, debugging novel issues, and physical equipment operation still need humans.",
      },
      {
        id: "sr1-d",
        text: "Managing people, resolving conflicts, or coaching teams",
        score: 15,
        reasoning:
          "People management is deeply human. Reading team dynamics, navigating organizational politics, and coaching require empathy and contextual understanding AI lacks.",
      },
    ],
  },
  {
    id: "sr2",
    dimension: "skillReplaceability",
    question:
      "If an AI tool could do 80% of one part of your job, which would it be?",
    helpText:
      "Be honest — this helps us identify where AI is closest to your work.",
    answers: [
      {
        id: "sr2-a",
        text: "Researching information or answering factual questions",
        score: 85,
        reasoning:
          "AI already handles research and factual Q&A at near-human level. RAG systems and search-augmented LLMs are replacing research analyst tasks.",
      },
      {
        id: "sr2-b",
        text: "Creating first drafts — documents, code, designs, or plans",
        score: 70,
        reasoning:
          "AI excels at first-draft generation across text, code, and even visual design. The value is shifting from creation to curation and refinement.",
      },
      {
        id: "sr2-c",
        text: "Scheduling, coordinating, or organizing logistics",
        score: 65,
        reasoning:
          "AI scheduling and coordination tools are maturing rapidly. Routine logistics can be automated, though complex multi-stakeholder coordination still needs humans.",
      },
      {
        id: "sr2-d",
        text: "Honestly, none — my work requires being physically present or reading people",
        score: 10,
        reasoning:
          "Physical presence and real-time human reading are the strongest moats against AI. Robotics is decades behind AI software capabilities.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION: industryVelocity (weight: 0.20)
  // Research basis: McKinsey industry adoption curves + Goldman Sachs
  // sector-level automation exposure estimates.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "iv1",
    dimension: "industryVelocity",
    question: "Which industry do you work in?",
    helpText: "Pick the closest match. This affects how fast AI is entering your field.",
    answers: [
      {
        id: "iv1-a",
        text: "Tech, finance, or professional services (consulting, legal, accounting)",
        score: 80,
        reasoning:
          "These industries are AI-first adopters. Goldman Sachs estimates 46% of finance tasks and 44% of legal tasks are exposed to automation.",
      },
      {
        id: "iv1-b",
        text: "Media, marketing, retail, or customer service",
        score: 70,
        reasoning:
          "Content generation, ad targeting, and customer service are rapidly being AI-augmented. McKinsey estimates 50%+ task automation potential in retail operations.",
      },
      {
        id: "iv1-c",
        text: "Healthcare, education, or government",
        score: 40,
        reasoning:
          "These sectors adopt AI slowly due to regulation, privacy concerns, and institutional inertia. Exposure exists but timelines are longer.",
      },
      {
        id: "iv1-d",
        text: "Construction, manufacturing, skilled trades, or agriculture",
        score: 30,
        reasoning:
          "Physical industries have lower near-term AI risk. Robotics lags behind software AI. The main exposure is in planning/logistics, not core physical work.",
      },
    ],
  },
  {
    id: "iv2",
    dimension: "industryVelocity",
    question: "How is AI currently being used at your workplace?",
    helpText: "Think about tools your company has adopted or is piloting.",
    answers: [
      {
        id: "iv2-a",
        text: "AI tools are already replacing tasks people used to do",
        score: 90,
        reasoning:
          "If your workplace is already automating roles, you're in a high-velocity environment. The transition from 'pilot' to 'production' AI is underway.",
      },
      {
        id: "iv2-b",
        text: "We use AI tools to assist, but humans still do the core work",
        score: 55,
        reasoning:
          "AI-assisted workflows are the current norm in progressive companies. This is a transitional phase — today's assistant becomes tomorrow's replacement for simpler tasks.",
      },
      {
        id: "iv2-c",
        text: "There's talk about AI, but we haven't really adopted anything yet",
        score: 35,
        reasoning:
          "Low current adoption doesn't mean low future risk — it may mean your industry hasn't hit the tipping point yet. But it does buy time for reskilling.",
      },
      {
        id: "iv2-d",
        text: "AI isn't really relevant to what we do",
        score: 15,
        reasoning:
          "Some roles genuinely have low AI exposure. But be aware: many people said this about their jobs in 2022 before ChatGPT changed the landscape.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION: experienceMoat (weight: 0.10)
  // Research basis: Brookings Institution analysis showing experience
  // creates defensibility through tacit knowledge and institutional context.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "em1",
    dimension: "experienceMoat",
    question: "How long would it take to train someone new to do your job well?",
    helpText:
      "Think about all the context, relationships, and know-how you've built up.",
    answers: [
      {
        id: "em1-a",
        text: "A few weeks — it's fairly straightforward once you learn the systems",
        score: 85,
        reasoning:
          "Low training time = low barrier to replacement, whether by humans or AI. Jobs that can be learned quickly can also be automated quickly.",
      },
      {
        id: "em1-b",
        text: "A few months — there's a real learning curve",
        score: 55,
        reasoning:
          "Moderate complexity creates some defensibility. The learning curve suggests tacit knowledge that AI struggles to replicate.",
      },
      {
        id: "em1-c",
        text: "A year or more — it takes deep expertise and relationship building",
        score: 25,
        reasoning:
          "Deep expertise and relationship capital are strong moats. This level of tacit knowledge and institutional context is very hard to automate.",
      },
      {
        id: "em1-d",
        text: "Years — my role requires rare credentials, extensive training, or deep institutional knowledge",
        score: 10,
        reasoning:
          "Rare expertise + credentials + deep institutional knowledge is the strongest moat. Even if AI can assist, the human is irreplaceable in the near term.",
      },
    ],
  },
  {
    id: "em2",
    dimension: "experienceMoat",
    question: "How much of your job depends on things you can only learn by doing it for years?",
    helpText:
      "Tacit knowledge — the stuff you can't Google — is your competitive advantage.",
    answers: [
      {
        id: "em2-a",
        text: "Very little — most of what I need is available in documentation or training materials",
        score: 80,
        reasoning:
          "If your job knowledge is documented, it's trainable — both for humans and AI. LLMs excel at learning from documented procedures.",
      },
      {
        id: "em2-b",
        text: "Some — I've developed intuitions that help, but the basics are teachable",
        score: 50,
        reasoning:
          "Intuition built from experience is partially defensible. AI can learn patterns but struggles with the edge cases that experience teaches you to handle.",
      },
      {
        id: "em2-c",
        text: "A lot — I rely heavily on judgment, pattern recognition, and relationships built over years",
        score: 20,
        reasoning:
          "Deep tacit knowledge is a strong moat. Pattern recognition from years of experience, especially combined with relationship capital, is very hard to automate.",
      },
      {
        id: "em2-d",
        text: "Almost everything — my value comes from decades of accumulated expertise and networks",
        score: 5,
        reasoning:
          "Decades of domain expertise plus networks is the gold standard for automation resistance. No current AI can replicate this depth of institutional knowledge.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION: humanInteraction (weight: 0.15)
  // Research basis: WEF Future of Jobs 2025 — jobs requiring empathy,
  // physical presence, or moral judgment are least automatable.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hi1",
    dimension: "humanInteraction",
    question:
      "How much of your job requires being face-to-face with people (or would suffer if done remotely)?",
    helpText:
      "Physical presence, body language, and in-person trust all create AI-resistance.",
    answers: [
      {
        id: "hi1-a",
        text: "Almost none — I could do my whole job from anywhere with a laptop",
        score: 80,
        reasoning:
          "Fully remote-capable work is more automatable because it's already digitized. If your work flows through a screen, AI can learn to do it through that same screen.",
      },
      {
        id: "hi1-b",
        text: "Some — certain meetings or activities benefit from being in person",
        score: 50,
        reasoning:
          "Partial in-person requirements create moderate defensibility. The remote portions are at risk, but the in-person elements add human value.",
      },
      {
        id: "hi1-c",
        text: "A lot — I need to physically be somewhere, handle materials, or work with my hands",
        score: 20,
        reasoning:
          "Physical work creates a strong moat. AI exists primarily in software; robotics is far less mature and far more expensive to deploy.",
      },
      {
        id: "hi1-d",
        text: "Essentially all of it — my job IS the human interaction (therapy, teaching, care, etc.)",
        score: 10,
        reasoning:
          "Pure human-interaction roles are the most AI-resistant. Empathy, moral judgment, and trust in high-stakes human contexts cannot be replicated by AI.",
      },
    ],
  },
  {
    id: "hi2",
    dimension: "humanInteraction",
    question:
      "How often does your job require making decisions where there's no clear right answer?",
    helpText:
      "Ethical dilemmas, judgment calls with incomplete info, or weighing competing interests.",
    answers: [
      {
        id: "hi2-a",
        text: "Rarely — most decisions have clear criteria or standard procedures",
        score: 80,
        reasoning:
          "Decisions with clear criteria are automatable. AI excels at applying rules consistently — often better than humans for well-defined decision frameworks.",
      },
      {
        id: "hi2-b",
        text: "Sometimes — I make judgment calls, but within a structured framework",
        score: 50,
        reasoning:
          "Structured judgment calls are in the 'AI augmentation' zone. AI can assist with the framework, but the judgment call itself still has value.",
      },
      {
        id: "hi2-c",
        text: "Often — I deal with ambiguity and competing stakeholder interests regularly",
        score: 25,
        reasoning:
          "Navigating ambiguity and stakeholder politics requires social intelligence and contextual judgment that AI consistently struggles with.",
      },
      {
        id: "hi2-d",
        text: "Constantly — my whole role is about navigating gray areas and human complexity",
        score: 5,
        reasoning:
          "Roles defined by moral reasoning, ethical judgment, and human complexity are among the last to be automated, if ever.",
      },
    ],
  },
];
