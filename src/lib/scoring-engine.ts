import {
  DEFAULT_WEIGHTS,
  Dimension,
  DimensionScore,
  QuizAnswer,
  ReskillRecommendation,
  RiskLevel,
  ScoringResult,
  SkillRisk,
} from "./types";
import { quizQuestions } from "@/data/quiz-questions";
import { jobCategories } from "@/data/job-categories";
import { skillRiskMap } from "@/data/skill-risk-map";

// ─── Dimension Labels ───────────────────────────────────────────────────────

const DIMENSION_LABELS: Record<Dimension, string> = {
  taskComposition: "Görev Yapısı",
  skillReplaceability: "Beceri Değiştirilebilirliği",
  industryVelocity: "Sektör Benimseme Hızı",
  experienceMoat: "Deneyim & Uzmanlık Kalkanı",
  humanInteraction: "İnsan Etkileşimi Bağımlılığı",
  aiReadiness: "Yapay Zeka Hazırlık Durumu",
};

const DIMENSION_EXPLANATIONS: Record<Dimension, (score: number) => string> = {
  taskComposition: (s) =>
    s >= 70
      ? "Günlük görevlerin ağırlıklı olarak rutin ve prosedürel — yapay zeka otomasyonuna en açık kategori."
      : s >= 40
        ? "İş karışımın hem rutin hem de rutin olmayan görevleri içeriyor. Rutin kısımlar risk altında, ama çeşitlilik bir miktar koruma sağlıyor."
        : "İşin önemli ölçüde yaratıcılık, doğaçlama veya yeni problem çözme içeriyor — yapay zekanın en çok zorlandığı görevler.",
  skillReplaceability: (s) =>
    s >= 70
      ? "Temel becerilerin mevcut yapay zeka yetenekleriyle önemli ölçüde örtüşüyor. Bu görevler zaten kısmen veya tamamen otomatikleştirilebilir."
      : s >= 40
        ? "Becerilerinin bazıları yapay zekanın erişim alanında, ama diğerleri yargı, yaratıcılık veya kişilerarası beceriler gerektiriyor."
        : "En önemli becerilerin derinden insani yetenekleri içeriyor — ilişki kurma, karmaşık yargı veya fiziksel uzmanlık — yapay zekanın kopyalayamadığı şeyler.",
  industryVelocity: (s) =>
    s >= 70
      ? "Sektörün yapay zekayı agresif şekilde benimsiyor. Sektöründeki şirketler görevleri ve rolleri değiştirmek için zaten yapay zeka dağıtıyor."
      : s >= 40
        ? "Sektörün yapay zekayı keşfediyor ama tam olarak benimsemedi. Uyum sağlamak için zamanın var, ama baskı artıyor."
        : "Sektörün düzenleme, fiziksel kısıtlamalar veya kurumsal atalet nedeniyle yapay zekayı yavaş benimsiyor. Bu zaman kazandırır ama uzun vadeli riski ortadan kaldırmaz.",
  experienceMoat: (s) =>
    s >= 70
      ? "Rolün hızla öğrenilebilir ve derin zımni bilgiye dayanmıyor. Bu, yapay zekanın (veya herhangi birinin) değiştirmesini kolaylaştırıyor."
      : s >= 40
        ? "Orta düzey uzmanlık ve kurumsal bilgi biriktirdin. Bu bir miktar savunulabilirlik yaratıyor, ama uzun vadede yeterli olmayabilir."
        : "Derin uzmanlığın, yetkinliklerin ve kurumsal bilgin güçlü bir savunma hattı oluşturuyor. Yapay zekanın yargına yaklaşması için yılların bağlamına ihtiyacı olur.",
  humanInteraction: (s) =>
    s >= 70
      ? "İşin ağırlıklı olarak dijital ve uzaktan yapılabilir, bu da yapay zeka otomasyonuna daha açık kılıyor çünkü zaten makineler üzerinden akıyor."
      : s >= 40
        ? "İşinin dijital ve yüz yüze bileşenleri karışık. Yüz yüze unsurlar otomasyona karşı savunulabilirlik ekliyor."
        : "İşin temelde insan varlığı, empati veya fiziksel beceri gerektiriyor — yapay zeka otomasyonuna karşı en güçlü koruma.",
  aiReadiness: (s) =>
    s >= 70
      ? "Yapay zeka araçlarına aşinalığın düşük ve iş akışına entegrasyon planın yok. Bu, değişime uyum sağlama kapasiteni sınırlıyor ve riski artırıyor."
      : s >= 40
        ? "Yapay zeka araçlarını bir miktar kullanıyorsun ama sistematik bir öğrenme planın yok. Daha bilinçli bir yaklaşım risk profilini iyileştirir."
        : "Yapay zeka araçlarını aktif kullanıyor ve gelişmeleri takip ediyorsun. Bu proaktif tutum, değişime uyum kapasiteni güçlendiriyor ve riskini azaltıyor.",
};

// ─── Risk Labels & Summaries ────────────────────────────────────────────────

function getRiskLabel(score: number): string {
  if (score >= 75) return "Yüksek Risk";
  if (score >= 55) return "Orta-Yüksek Risk";
  if (score >= 35) return "Orta Risk";
  if (score >= 20) return "Düşük-Orta Risk";
  return "Düşük Risk";
}

function getSummary(score: number, jobLabel: string): string {
  if (score >= 75)
    return `${jobLabel} alanındaki kariyer profilin yapay zeka otomasyonuna önemli ölçüde açık. Günlük görevlerinin ve temel becerilerinin çoğu yapay zekanın zaten yapabildiği veya 2-3 yıl içinde yapabileceği alanlarda. Bu işinin yarın yok olacağı anlamına gelmiyor, ama proaktif beceri kazanmanın önemli olduğu anlamına geliyor. Yapay zekanın kolayca kopyalayamadığı becerilere odaklan — ilişki kurma, yaratıcı strateji ve karmaşık yargı.`;
  if (score >= 55)
    return `${jobLabel} alanındaki kariyer profilin, özellikle işinin rutin ve dijital yönlerinde belirgin otomasyon maruziyetine sahip. Ancak nefes alma alanı sağlayan bazı savunulabilir becerilerin ve unsurların var. Şimdi rolünün insani, yaratıcı ve kişilerarası kısımlarına yüklenmenin tam zamanı — yapay zekanın destekleyeceği alanlarda uzmanlık geliştirirken.`;
  if (score >= 35)
    return `${jobLabel} alanındaki kariyer profilin orta düzeyde yapay zeka maruziyetine sahip. Görevlerinin bazıları desteklenebilir veya kısmen otomatikleştirilebilir, ama rolünde insan yargısı, yaratıcılık veya kişilerarası beceri gerektiren anlamlı unsurlar var. Alanına giren yapay zeka araçlarının farkında ol ve yapay zekayı benzersiz insani katkılarını güçlendirmek için kullanma konusunda uzman olmaya odaklan.`;
  if (score >= 20)
    return `${jobLabel} alanındaki kariyer profilin yapay zeka otomasyonundan nispeten iyi korunuyor. İşin, yapay zekanın kopyalayamadığı önemli insan yargısı, kişilerarası beceri veya fiziksel uzmanlık içeriyor. Uzmanlığını ve ilişkilerini derinleştirmeye devam et. En büyük fırsatın, zaten savunulabilir rolünde daha üretken olmak için yapay zeka araçlarını kullanmak.`;
  return `${jobLabel} alanındaki kariyer profilin yapay zeka otomasyonuna karşı son derece dirençli. İşin temelde insani nitelikler üzerine kurulu — empati, fiziksel beceri, yaratıcı vizyon veya derin uzmanlık — yapay zekanın en zorlu meydan okumaları. Bu güçlü yönlerin üzerine inşa etmeye devam et. Yapay zeka muhtemelen cephaneliğinde rakip değil, faydalı bir araç olacak.`;
}

// ─── Core Scoring Algorithm ─────────────────────────────────────────────────

/**
 * Calculate the overall AI Career Risk Score from quiz answers.
 *
 * Algorithm:
 * 1. Compute per-dimension scores by averaging answers within each dimension.
 * 2. Apply job-category baseline blending (30% baseline, 70% quiz-derived).
 * 3. Apply industry modifier from job category.
 * 4. Compute weighted overall score using research-backed dimension weights.
 * 5. Generate skill-level risk breakdown based on job category + answers.
 * 6. Generate reskilling recommendations from high-risk skills.
 */
export function calculateScore(
  answers: QuizAnswer[],
  jobCategoryId: string
): ScoringResult {
  const job = jobCategories.find((j) => j.id === jobCategoryId);
  if (!job) {
    throw new Error(`Unknown job category: ${jobCategoryId}`);
  }

  // Step 1: Compute per-dimension raw scores
  const dimensionRawScores = computeDimensionScores(answers);

  // Step 2: Apply industry modifier to industryVelocity dimension
  const industryModified = { ...dimensionRawScores };
  industryModified.industryVelocity = clamp(
    dimensionRawScores.industryVelocity + job.industryModifier,
    0,
    100
  );

  // Step 3: Compute weighted quiz score
  const quizScore = Object.entries(DEFAULT_WEIGHTS).reduce(
    (total, [dim, weight]) => {
      return total + industryModified[dim as Dimension] * weight;
    },
    0
  );

  // Step 4: Blend with job category baseline (70% quiz, 30% baseline)
  // This anchors scores to research while allowing individual variation.
  const QUIZ_WEIGHT = 0.7;
  const BASELINE_WEIGHT = 0.3;
  const overallScore = Math.round(
    quizScore * QUIZ_WEIGHT + job.baselineRisk * BASELINE_WEIGHT
  );

  // Step 5: Build dimension breakdown
  const dimensions: DimensionScore[] = (
    Object.keys(DEFAULT_WEIGHTS) as Dimension[]
  ).map((dim) => ({
    dimension: dim,
    label: DIMENSION_LABELS[dim],
    score: Math.round(industryModified[dim]),
    explanation: DIMENSION_EXPLANATIONS[dim](industryModified[dim]),
  }));

  // Step 6: Build skill risk breakdown from job category
  const skillBreakdown = buildSkillBreakdown(job.typicalSkills, overallScore);

  // Step 7: Generate reskilling recommendations
  const reskillPriorities = generateReskillRecommendations(skillBreakdown);

  return {
    overallScore: clamp(overallScore, 0, 100),
    riskLabel: getRiskLabel(overallScore),
    summary: getSummary(overallScore, job.label),
    dimensions,
    skillBreakdown,
    reskillPriorities,
    jobCategoryId,
    quizAnswers: answers,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function computeDimensionScores(
  answers: QuizAnswer[]
): Record<Dimension, number> {
  const dimensionScores: Record<Dimension, number[]> = {
    taskComposition: [],
    skillReplaceability: [],
    industryVelocity: [],
    experienceMoat: [],
    humanInteraction: [],
    aiReadiness: [],
  };

  for (const answer of answers) {
    const question = quizQuestions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const selectedAnswer = question.answers.find(
      (a) => a.id === answer.answerId
    );
    if (!selectedAnswer) continue;

    dimensionScores[question.dimension].push(selectedAnswer.score);
  }

  // Average scores per dimension; default to 50 (neutral) if no answers
  const result: Record<Dimension, number> = {} as Record<Dimension, number>;
  for (const [dim, scores] of Object.entries(dimensionScores)) {
    result[dim as Dimension] =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 50;
  }

  return result;
}

function buildSkillBreakdown(
  typicalSkills: string[],
  overallScore: number
): SkillRisk[] {
  return typicalSkills.map((skillName) => {
    const mapped = skillRiskMap[skillName];
    if (mapped) {
      return mapped;
    }
    // Fallback: estimate from overall score for unmapped skills
    const estimatedScore = clamp(overallScore + randomOffset(), 0, 100);
    return {
      skillName,
      riskLevel: scoreToRiskLevel(estimatedScore),
      riskScore: estimatedScore,
      explanation: `Bu becerinin otomasyon riski genel kariyer profiline göre tahmin edilmiştir. Daha spesifik değerlendirme detaylı görev analizi gerektirir.`,
      timeHorizon: estimatedScore > 60 ? "2-3 years" : "5+ years" as const,
    };
  });
}

function generateReskillRecommendations(
  skills: SkillRisk[]
): ReskillRecommendation[] {
  const highRiskSkills = skills
    .filter((s) => s.riskLevel === "high" || s.riskScore >= 65)
    .sort((a, b) => b.riskScore - a.riskScore);

  const recommendations: ReskillRecommendation[] = [];

  for (const skill of highRiskSkills.slice(0, 5)) {
    const rec = getRecommendationForSkill(skill);
    if (rec) recommendations.push(rec);
  }

  // Always add universal recommendations
  recommendations.push({
    skill: "Yapay Zeka Araç Yetkinliği",
    reason:
      "Rolün ne olursa olsun, uzman bir yapay zeka kullanıcısı olmak seni daha değerli kılar. Etkili prompt yazmayı, yapay zeka çıktısını eleştirel değerlendirmeyi ve yapay zekayı iş akışlarına entegre etmeyi öğren.",
    effort: "weeks",
    resources: [
      "Coursera: AI For Everyone (Andrew Ng)",
      "LinkedIn Learning: Generative AI for Business",
    ],
  });

  return recommendations;
}

function getRecommendationForSkill(
  skill: SkillRisk
): ReskillRecommendation | null {
  const reskillMap: Record<string, ReskillRecommendation> = {
    "Data entry": {
      skill: "Data Analysis & Interpretation",
      reason:
        "Move from entering data to analyzing it. Learn to interpret trends, build dashboards, and translate data into business decisions.",
      effort: "months",
      resources: [
        "Google Data Analytics Certificate",
        "Coursera: Excel to MySQL",
      ],
    },
    Bookkeeping: {
      skill: "Financial Analysis & Advisory",
      reason:
        "Shift from recording transactions to advising on financial strategy. The analytical and advisory layer is much harder to automate.",
      effort: "months",
      resources: [
        "CPA exam prep",
        "Coursera: Financial Markets (Yale)",
      ],
    },
    Copywriting: {
      skill: "Brand Strategy & Voice Curation",
      reason:
        "Move from writing copy to defining the brand voice, editorial strategy, and quality standards that guide AI-generated content.",
      effort: "months",
      resources: [
        "Coursera: Brand Management (London Business School)",
        "The Brand Gap by Marty Neumeier",
      ],
    },
    Scheduling: {
      skill: "Project Management & Coordination",
      reason:
        "Expand from scheduling to full project management. Coordinating people, priorities, and deliverables requires human judgment.",
      effort: "months",
      resources: [
        "Google Project Management Certificate",
        "PMI CAPM certification",
      ],
    },
    "Legal research": {
      skill: "Legal Strategy & Client Advisory",
      reason:
        "Shift from research to strategic legal advice. Develop expertise in counseling clients, structuring deals, and courtroom strategy.",
      effort: "6+ months",
      resources: [
        "Advanced litigation workshops",
        "Negotiation courses (Harvard PON)",
      ],
    },
    "Contract review": {
      skill: "Contract Negotiation & Drafting Strategy",
      reason:
        "Move from reviewing contracts to negotiating and strategically structuring them. The human relationship in deal-making is defensible.",
      effort: "months",
      resources: [
        "Coursera: Successful Negotiation (Michigan)",
        "ABA Contract Drafting programs",
      ],
    },
    "Email correspondence": {
      skill: "Stakeholder Communication & Relationship Management",
      reason:
        "Evolve from email handling to strategic stakeholder management. Focus on high-stakes, nuanced communication where AI falls short.",
      effort: "weeks",
      resources: [
        "Crucial Conversations (book & workshop)",
        "LinkedIn Learning: Executive Communication",
      ],
    },
    "Social media management": {
      skill: "Community Building & Brand Strategy",
      reason:
        "Move from managing posts to building engaged communities. Strategy, brand voice, and real human connection are defensible.",
      effort: "months",
      resources: [
        "Meta Social Media Marketing Certificate",
        "Community management courses",
      ],
    },
    SEO: {
      skill: "Growth Strategy & Marketing Analytics",
      reason:
        "Expand from SEO tactics to holistic growth strategy. Understanding customer journeys and multi-channel attribution adds human value.",
      effort: "months",
      resources: [
        "Google Digital Marketing Certificate",
        "Reforge growth series",
      ],
    },
    "Ticket management": {
      skill: "Customer Success & Account Management",
      reason:
        "Move from reactive ticket handling to proactive customer success. Building relationships and driving adoption requires human connection.",
      effort: "months",
      resources: [
        "Gainsight Customer Success courses",
        "LinkedIn Learning: Customer Success Management",
      ],
    },
    "Document management": {
      skill: "Knowledge Management & Information Architecture",
      reason:
        "Move from filing documents to designing how organizations capture, share, and leverage knowledge. Strategic information architecture is human work.",
      effort: "months",
      resources: [
        "Coursera: Information Architecture",
        "KM certifications (KMI)",
      ],
    },
    "Record keeping": {
      skill: "Compliance & Governance Oversight",
      reason:
        "Move from recording to ensuring records meet governance standards. Compliance judgment and regulatory interpretation need humans.",
      effort: "months",
      resources: [
        "Coursera: Risk Management",
        "Industry-specific compliance certifications",
      ],
    },
    "Tax preparation": {
      skill: "Tax Planning & Advisory",
      reason:
        "Move from preparation to strategic tax planning. Complex tax strategy, estate planning, and advisory work remain human-centric.",
      effort: "6+ months",
      resources: ["CPA exam prep", "EA (Enrolled Agent) certification"],
    },
    "Issue resolution": {
      skill: "Complex Problem-Solving & Escalation Expertise",
      reason:
        "Specialize in the hardest, most emotionally sensitive issues that AI cannot handle. Become the expert for complex edge cases.",
      effort: "months",
      resources: [
        "Conflict resolution courses",
        "Advanced customer service certifications",
      ],
    },
    "Inventory tracking": {
      skill: "Supply Chain Strategy & Analytics",
      reason:
        "Move from tracking to optimizing. Strategic supply chain management, vendor relationships, and risk mitigation are human-centric.",
      effort: "months",
      resources: [
        "APICS CSCP certification",
        "Coursera: Supply Chain Management (Rutgers)",
      ],
    },
    "Literature review": {
      skill: "Research Design & Scientific Strategy",
      reason:
        "Move from reviewing literature to designing experiments and forming novel hypotheses. The creative research process is harder to automate.",
      effort: "6+ months",
      resources: [
        "Advanced research methods courses",
        "Grant writing workshops",
      ],
    },
  };

  return reskillMap[skill.skillName] || null;
}

function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 65) return "high";
  if (score >= 35) return "medium";
  return "low";
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Deterministic "random" offset for unmapped skills (seeded by string hash)
function randomOffset(): number {
  return 0; // Keep deterministic for now; in production, use skill name hash
}
