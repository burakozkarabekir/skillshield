import { ScoringResult, DimensionScore, SkillRisk, ReskillRecommendation } from "./types";

/**
 * Premium Report Generator
 *
 * Takes a ScoringResult and produces a detailed, personalized premium report
 * with in-depth analysis, recommendations, and learning paths.
 */

export interface PremiumReport {
  generatedAt: number;
  overallScore: number;
  riskLabel: string;
  executiveSummary: string;
  dimensionAnalysis: DimensionAnalysis[];
  topRisks: RiskInsight[];
  topStrengths: StrengthInsight[];
  actionPlan: ActionItem[];
  learningPath: LearningPathItem[];
  careerOutlook: string;
}

export interface DimensionAnalysis {
  dimension: string;
  label: string;
  score: number;
  detailedExplanation: string;
  recommendations: string[];
}

export interface RiskInsight {
  area: string;
  severity: "critical" | "high" | "moderate";
  description: string;
  mitigation: string;
}

export interface StrengthInsight {
  area: string;
  description: string;
  howToLeverage: string;
}

export interface ActionItem {
  priority: number;
  title: string;
  description: string;
  timeframe: string;
  effort: "low" | "medium" | "high";
}

export interface LearningPathItem {
  order: number;
  skill: string;
  why: string;
  resources: string[];
  estimatedTime: string;
}

// ─── Main Generator ─────────────────────────────────────────────────────────

export function generatePremiumReport(result: ScoringResult): PremiumReport {
  return {
    generatedAt: Date.now(),
    overallScore: result.overallScore,
    riskLabel: result.riskLabel,
    executiveSummary: generateExecutiveSummary(result),
    dimensionAnalysis: generateDimensionAnalysis(result.dimensions),
    topRisks: identifyTopRisks(result),
    topStrengths: identifyTopStrengths(result),
    actionPlan: generateActionPlan(result),
    learningPath: generateLearningPath(result.reskillPriorities),
    careerOutlook: generateCareerOutlook(result),
  };
}

// ─── Executive Summary ──────────────────────────────────────────────────────

function generateExecutiveSummary(result: ScoringResult): string {
  const { overallScore, dimensions } = result;
  const highestRiskDim = [...dimensions].sort((a, b) => b.score - a.score)[0];
  const lowestRiskDim = [...dimensions].sort((a, b) => a.score - b.score)[0];

  if (overallScore >= 75) {
    return `Genel risk skorun ${overallScore}/100 ile yüksek risk kategorisinde. En kritik alan "${highestRiskDim.label}" (${highestRiskDim.score}/100). Ancak "${lowestRiskDim.label}" alanında (${lowestRiskDim.score}/100) güçlü bir savunma hattın var. Acil eylem öneriyoruz: önümüzdeki 3 ay içinde en yüksek riskli becerilerini yapay zekaya dayanıklı alternatiflere yönlendirmeye başla. Bu rapor sana tam olarak nereden başlaman gerektiğini gösteriyor.`;
  }
  if (overallScore >= 50) {
    return `Genel risk skorun ${overallScore}/100 ile orta risk kategorisinde. "${highestRiskDim.label}" alanı (${highestRiskDim.score}/100) en çok dikkat gerektiren boyut. "${lowestRiskDim.label}" (${lowestRiskDim.score}/100) güçlü yönün. Stratejik beceri geliştirme ile risk profilini önemli ölçüde iyileştirebilirsin. Aşağıdaki eylem planı sana 6 aylık bir yol haritası sunuyor.`;
  }
  return `Genel risk skorun ${overallScore}/100 ile düşük risk kategorisinde. Kariyer profilin yapay zeka otomasyonuna karşı güçlü bir konumda. "${lowestRiskDim.label}" (${lowestRiskDim.score}/100) en güçlü savunma hattın. Yine de "${highestRiskDim.label}" (${highestRiskDim.score}/100) alanında gelişim fırsatları var. Aşağıdaki öneriler mevcut güçlü yönlerini daha da pekiştirmene yardımcı olacak.`;
}

// ─── Dimension Analysis ─────────────────────────────────────────────────────

function generateDimensionAnalysis(
  dimensions: DimensionScore[]
): DimensionAnalysis[] {
  return dimensions.map((dim) => ({
    dimension: dim.dimension,
    label: dim.label,
    score: dim.score,
    detailedExplanation: generateDetailedDimensionExplanation(dim),
    recommendations: generateDimensionRecommendations(dim),
  }));
}

function generateDetailedDimensionExplanation(dim: DimensionScore): string {
  const base = dim.explanation;
  if (dim.score >= 70) {
    return `${base} Bu boyutta skorun ${dim.score}/100 ile yüksek risk bölgesinde. Bu, yapay zekanın bu alanda seni etkileme potansiyelinin ciddi olduğu anlamına geliyor. Proaktif adım atman kritik.`;
  }
  if (dim.score >= 40) {
    return `${base} Bu boyutta skorun ${dim.score}/100 ile orta risk bölgesinde. Hem savunulabilir hem de risk altında olan unsurlar var. Stratejik odaklanma ile risk profilini iyileştirebilirsin.`;
  }
  return `${base} Bu boyutta skorun ${dim.score}/100 ile düşük risk bölgesinde. Bu alandaki güçlü yönlerini korumaya ve derinleştirmeye devam et.`;
}

function generateDimensionRecommendations(dim: DimensionScore): string[] {
  const recs: string[] = [];
  switch (dim.dimension) {
    case "taskComposition":
      if (dim.score >= 60) {
        recs.push("Rutin görevleri yapay zeka araçlarına devretmeyi öğren — bu seni daha değerli kılar");
        recs.push("Yaratıcı ve stratejik görevlere daha fazla zaman ayır");
        recs.push("Görev dağılımını üstünle konuşarak yeniden şekillendir");
      } else {
        recs.push("Mevcut yaratıcı ve stratejik görevlerini korumaya devam et");
        recs.push("Yapay zekayı rutin kısımlarda asistan olarak kullanmayı öğren");
      }
      break;
    case "skillReplaceability":
      if (dim.score >= 60) {
        recs.push("Yapay zekanın zayıf olduğu beceriler geliştir: müzakere, liderlik, yaratıcı strateji");
        recs.push("Mevcut becerilerini yapay zeka ile birlikte kullanmayı öğren");
        recs.push("T-şekilli beceri profili oluştur: bir alanda derin, geniş yatay bilgi");
      } else {
        recs.push("İnsani becerilerini derinleştirmeye devam et");
        recs.push("Bu becerileri başkalarına öğreterek değerini artır");
      }
      break;
    case "industryVelocity":
      if (dim.score >= 60) {
        recs.push("Sektöründeki yapay zeka gelişmelerini yakından takip et");
        recs.push("Sektör konferanslarına ve yapay zeka toplantılarına katıl");
        recs.push("Şirketindeki yapay zeka projelerinde aktif rol al");
      } else {
        recs.push("Sektörün yavaş olması seni rehavete itmesin — hazırlığa devam et");
        recs.push("Diğer sektörlerdeki yapay zeka trendlerini takip et — yayılma hızlanıyor");
      }
      break;
    case "experienceMoat":
      if (dim.score >= 60) {
        recs.push("Uzmanlığını derinleştir — niş alanlarda uzmanlaş");
        recs.push("Mentorluk yaparak kurumsal bilgini kurumsallaştır");
        recs.push("Profesyonel ağını genişlet ve güçlendir");
      } else {
        recs.push("Mevcut derin uzmanlığını belgelendirme ve sertifikalarla güçlendir");
        recs.push("Ağını genişletmeye devam et — ilişkiler en güçlü savunma");
      }
      break;
    case "humanInteraction":
      if (dim.score >= 60) {
        recs.push("İşine daha fazla insani etkileşim unsuru ekle");
        recs.push("Empati, ikna ve duygusal zeka becerilerini geliştir");
        recs.push("Yüz yüze veya canlı etkileşim gerektiren projelere yönel");
      } else {
        recs.push("İnsani etkileşim güçlü yönün — bunu daha da derinleştir");
        recs.push("Yapay zekayı idari görevlerde kullanarak insanlarla daha fazla vakit geçir");
      }
      break;
  }
  return recs;
}

// ─── Risk Insights ──────────────────────────────────────────────────────────

function identifyTopRisks(result: ScoringResult): RiskInsight[] {
  const risks: RiskInsight[] = [];

  // From dimensions
  const highRiskDims = result.dimensions
    .filter((d) => d.score >= 60)
    .sort((a, b) => b.score - a.score);

  for (const dim of highRiskDims.slice(0, 3)) {
    risks.push({
      area: dim.label,
      severity: dim.score >= 75 ? "critical" : dim.score >= 65 ? "high" : "moderate",
      description: `${dim.label} boyutunda ${dim.score}/100 skor, yapay zeka otomasyonuna önemli açıklık gösteriyor.`,
      mitigation: `Bu alanda yapay zekaya dayanıklı becerilere yatırım yap ve mevcut görevlerini yeniden şekillendir.`,
    });
  }

  // From skills
  const highRiskSkills = result.skillBreakdown
    .filter((s) => s.riskLevel === "high")
    .sort((a, b) => b.riskScore - a.riskScore);

  for (const skill of highRiskSkills.slice(0, 2)) {
    risks.push({
      area: skill.skillName,
      severity: skill.riskScore >= 80 ? "critical" : "high",
      description: skill.explanation,
      mitigation: `Bu beceriyi yapay zeka ile birlikte kullanmayı öğren veya daha savunulabilir bir alternatife geçiş yap.`,
    });
  }

  return risks;
}

// ─── Strength Insights ──────────────────────────────────────────────────────

function identifyTopStrengths(result: ScoringResult): StrengthInsight[] {
  const strengths: StrengthInsight[] = [];

  const lowRiskDims = result.dimensions
    .filter((d) => d.score < 40)
    .sort((a, b) => a.score - b.score);

  for (const dim of lowRiskDims.slice(0, 3)) {
    strengths.push({
      area: dim.label,
      description: `${dim.label} boyutunda ${dim.score}/100 skor, yapay zekaya karşı güçlü savunulabilirlik gösteriyor.`,
      howToLeverage: `Bu güçlü yönünü kariyerinin merkezine koy. Yapay zeka bu alanda seni yakın zamanda tehdit edemez.`,
    });
  }

  const lowRiskSkills = result.skillBreakdown
    .filter((s) => s.riskLevel === "low")
    .sort((a, b) => a.riskScore - b.riskScore);

  for (const skill of lowRiskSkills.slice(0, 2)) {
    strengths.push({
      area: skill.skillName,
      description: `${skill.skillName} düşük yapay zeka riski taşıyor (${skill.riskScore}/100).`,
      howToLeverage: `Bu becerini daha da derinleştir ve yapay zeka araçlarıyla birlikte kullanarak verimliliğini artır.`,
    });
  }

  return strengths;
}

// ─── Action Plan ────────────────────────────────────────────────────────────

function generateActionPlan(result: ScoringResult): ActionItem[] {
  const items: ActionItem[] = [];
  let priority = 1;

  // Immediate: AI tool adoption
  items.push({
    priority: priority++,
    title: "Yapay zeka araçlarını günlük iş akışına entegre et",
    description:
      "Mesleğine uygun yapay zeka araçlarını belirle ve rutin görevlerde kullanmaya başla. Bu hem verimliliğini artırır hem de yapay zeka okuryazarlığını geliştirir.",
    timeframe: "Bu hafta başla",
    effort: "low",
  });

  // Based on highest risk dimension
  const highestRisk = [...result.dimensions].sort((a, b) => b.score - a.score)[0];
  if (highestRisk.score >= 50) {
    items.push({
      priority: priority++,
      title: `${highestRisk.label} alanında risk azaltma`,
      description: `En yüksek risk boyutun (${highestRisk.score}/100). Bu alandaki görevlerini yeniden değerlendir ve yapay zekaya dayanıklı alternatiflere yönelmeye başla.`,
      timeframe: "Önümüzdeki 1 ay",
      effort: "medium",
    });
  }

  // Skill development
  if (result.reskillPriorities.length > 0) {
    const topReskill = result.reskillPriorities[0];
    items.push({
      priority: priority++,
      title: `${topReskill.skill} becerisi geliştir`,
      description: topReskill.reason,
      timeframe: topReskill.effort === "weeks" ? "1-2 ay" : topReskill.effort === "months" ? "3-6 ay" : "6-12 ay",
      effort: topReskill.effort === "weeks" ? "low" : topReskill.effort === "months" ? "medium" : "high",
    });
  }

  // Network building
  items.push({
    priority: priority++,
    title: "Profesyonel ağını güçlendir",
    description:
      "Sektöründeki yapay zeka liderlerini takip et, ilgili topluluk ve etkinliklere katıl. İlişki ağı yapay zekanın kopyalayamayacağı en güçlü varlığın.",
    timeframe: "Sürekli",
    effort: "low",
  });

  // Career positioning
  items.push({
    priority: priority++,
    title: "Kariyer pozisyonunu yeniden değerlendir",
    description:
      "Mevcut rolünde yapay zekanın güçlendireceği (tehdit etmeyeceği) bir konuma geçmeyi hedefle. Yapay zekayı yöneten, not yapay zeka tarafından yönetilen kişi ol.",
    timeframe: "3-6 ay perspektifle",
    effort: "medium",
  });

  return items;
}

// ─── Learning Path ──────────────────────────────────────────────────────────

function generateLearningPath(
  reskillPriorities: ReskillRecommendation[]
): LearningPathItem[] {
  return reskillPriorities.map((rec, idx) => ({
    order: idx + 1,
    skill: rec.skill,
    why: rec.reason,
    resources: rec.resources || [],
    estimatedTime:
      rec.effort === "weeks"
        ? "2-4 hafta"
        : rec.effort === "months"
          ? "2-4 ay"
          : "6+ ay",
  }));
}

// ─── Career Outlook ─────────────────────────────────────────────────────────

function generateCareerOutlook(result: ScoringResult): string {
  const { overallScore } = result;
  if (overallScore >= 75) {
    return "Kariyer alanın önümüzdeki 2-3 yıl içinde önemli yapay zeka dönüşümü geçirecek. Şimdiden harekete geçmek kritik. Yukarıdaki eylem planını takip ederek 6 ay içinde risk profilini önemli ölçüde iyileştirebilirsin. Yapay zekayı düşman olarak değil, kariyerini güçlendiren bir araç olarak benimse.";
  }
  if (overallScore >= 50) {
    return "Kariyer alanın yapay zekadan etkilenecek ama tamamen dönüşmeyecek. Stratejik beceri geliştirme ile güçlü bir konuma geçebilirsin. Yapay zeka araçlarını erken benimseyenler arasında ol — bu seni rakiplerinden ayıracak. Önümüzdeki 12 ay kritik bir pencere.";
  }
  return "Kariyer alanın yapay zekaya karşı güçlü bir konumda. Ancak rehavete kapılma — yapay zeka yetenekleri hızla gelişiyor. Mevcut güçlü yönlerini korurken yapay zeka okuryazarlığını geliştir. Yapay zekayı verimliliğini artırmak için kullan ve alanında 'yapay zeka + insan' kombinasyonunun en iyisi ol.";
}
