import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { PremiumReport, EnhancedPremiumReport } from "./premium-report";

/**
 * Server-side PDF report generator using @react-pdf/renderer.
 *
 * Usage: const buffer = await renderPremiumPDF(report);
 *        const buffer = await renderEnhancedPremiumPDF(report);
 */

const colors = {
  primary: "#6366f1",
  primaryLight: "#818cf8",
  danger: "#ef4444",
  warning: "#f59e0b",
  success: "#22c55e",
  dark: "#1e293b",
  muted: "#64748b",
  light: "#f8fafc",
  border: "#e2e8f0",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.dark,
  },
  header: {
    marginBottom: 24,
    borderBottom: `2px solid ${colors.primary}`,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  scoreBox: {
    backgroundColor: colors.light,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${colors.border}`,
  },
  scoreNumber: {
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: `1px solid ${colors.border}`,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.dark,
    marginBottom: 8,
  },
  dimRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottom: `1px solid ${colors.border}`,
  },
  dimLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    flex: 1,
  },
  dimScore: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    width: 50,
    textAlign: "right",
  },
  riskTag: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: colors.white,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 8,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: colors.primary,
  },
  listText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
  },
  actionCard: {
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    border: `1px solid ${colors.border}`,
  },
  actionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  actionMeta: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: colors.muted,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 8,
  },
  // ─── Enhanced styles ────────────────────────────────────────────────────
  insightCard: {
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
    border: `1px solid ${colors.border}`,
    flexDirection: "row",
  },
  insightBadge: {
    width: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  insightContent: {
    flex: 1,
  },
  insightQuestion: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 3,
  },
  insightExplanation: {
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.muted,
    marginBottom: 3,
  },
  insightTip: {
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.primary,
  },
  toolRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottom: `1px solid ${colors.border}`,
    alignItems: "center",
  },
  toolName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    width: 110,
  },
  toolDesc: {
    fontSize: 8,
    flex: 1,
    color: colors.muted,
    paddingHorizontal: 4,
  },
  toolPricing: {
    fontSize: 8,
    width: 65,
    textAlign: "center",
  },
  toolPriority: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    width: 55,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
    color: colors.white,
  },
  roadmapMonth: {
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
    border: `1px solid ${colors.border}`,
  },
  roadmapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  roadmapMonthNum: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  roadmapTheme: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  roadmapDetail: {
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.muted,
    marginBottom: 2,
  },
  roadmapMilestone: {
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.dark,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },
  resourceCard: {
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
    border: `1px solid ${colors.border}`,
  },
  resourceName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  resourceDesc: {
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.muted,
  },
  resourceMeta: {
    fontSize: 7,
    color: colors.primary,
    marginTop: 2,
  },
  investmentBox: {
    backgroundColor: colors.light,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    border: `1px solid ${colors.primary}`,
  },
  investmentTotal: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 4,
  },
});

function getScoreColor(score: number): string {
  if (score >= 65) return colors.danger;
  if (score >= 35) return colors.warning;
  return colors.success;
}

function getSeverityColor(severity: string): string {
  if (severity === "critical") return colors.danger;
  if (severity === "high") return colors.warning;
  return colors.primaryLight;
}

function getRiskImpactColor(impact: string): string {
  if (impact === "artiriyor") return colors.danger;
  if (impact === "azaltiyor") return colors.success;
  return colors.warning;
}

function getPriorityColor(priority: string): string {
  if (priority === "zorunlu") return colors.danger;
  if (priority === "onerilen") return colors.primary;
  return colors.muted;
}

function getPriorityLabel(priority: string): string {
  if (priority === "zorunlu") return "Zorunlu";
  if (priority === "onerilen") return "Onerilen";
  return "Ileri Seviye";
}

function PageFooter({ page, total }: { page: number; total: number }) {
  return (
    <View style={styles.footer}>
      <Text>AdaptAI Pro — adaptai.dev</Text>
      <Text>Sayfa {page}/{total}</Text>
    </View>
  );
}

// ─── Original PDF Document Component (backward-compatible) ──────────────────

function PremiumPDFDocument({ report }: { report: PremiumReport }) {
  const date = new Date(report.generatedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      {/* Page 1: Overview + Dimensions */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AdaptAI Pro Rapor</Text>
          <Text style={styles.subtitle}>
            Yapay Zeka Kariyer Risk Analizi — {date}
          </Text>
        </View>

        {/* Overall Score */}
        <View style={styles.scoreBox}>
          <View>
            <Text style={styles.scoreLabel}>Genel Risk Skoru</Text>
            <Text style={{ fontSize: 10, color: colors.muted, marginTop: 2 }}>
              {report.riskLabel}
            </Text>
          </View>
          <Text style={[styles.scoreNumber, { color: getScoreColor(report.overallScore) }]}>
            {report.overallScore}/100
          </Text>
        </View>

        {/* Executive Summary */}
        <Text style={styles.sectionTitle}>Yonetici Ozeti</Text>
        <Text style={styles.paragraph}>{report.executiveSummary}</Text>

        {/* Dimension Analysis */}
        <Text style={styles.sectionTitle}>Boyut Analizi</Text>
        {report.dimensionAnalysis.map((dim) => (
          <View key={dim.dimension} style={{ marginBottom: 12 }}>
            <View style={styles.dimRow}>
              <Text style={styles.dimLabel}>{dim.label}</Text>
              <Text style={[styles.dimScore, { color: getScoreColor(dim.score) }]}>
                {dim.score}/100
              </Text>
            </View>
            <Text style={[styles.paragraph, { paddingLeft: 8, marginTop: 4 }]}>
              {dim.detailedExplanation}
            </Text>
            {dim.recommendations.map((rec, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{rec}</Text>
              </View>
            ))}
          </View>
        ))}

        <PageFooter page={1} total={2} />
      </Page>

      {/* Page 2: Risks, Strengths, Action Plan */}
      <Page size="A4" style={styles.page}>
        {/* Top Risks */}
        <Text style={styles.sectionTitle}>En Onemli Riskler</Text>
        {report.topRisks.map((risk, i) => (
          <View key={i} style={styles.actionCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={styles.actionTitle}>{risk.area}</Text>
              <Text
                style={[
                  styles.riskTag,
                  { backgroundColor: getSeverityColor(risk.severity) },
                ]}
              >
                {risk.severity === "critical" ? "Kritik" : risk.severity === "high" ? "Yuksek" : "Orta"}
              </Text>
            </View>
            <Text style={styles.paragraph}>{risk.description}</Text>
            <Text style={[styles.paragraph, { color: colors.primary }]}>
              Oneri: {risk.mitigation}
            </Text>
          </View>
        ))}

        {/* Top Strengths */}
        <Text style={styles.sectionTitle}>Guclu Yonler</Text>
        {report.topStrengths.map((s, i) => (
          <View key={i} style={styles.actionCard}>
            <Text style={styles.actionTitle}>{s.area}</Text>
            <Text style={styles.paragraph}>{s.description}</Text>
            <Text style={[styles.paragraph, { color: colors.success }]}>
              Nasil kullanilir: {s.howToLeverage}
            </Text>
          </View>
        ))}

        {/* Action Plan */}
        <Text style={styles.sectionTitle}>Eylem Plani</Text>
        {report.actionPlan.map((item) => (
          <View key={item.priority} style={styles.actionCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.actionTitle}>
                {item.priority}. {item.title}
              </Text>
              <Text style={styles.actionMeta}>{item.timeframe}</Text>
            </View>
            <Text style={styles.paragraph}>{item.description}</Text>
          </View>
        ))}

        {/* Career Outlook */}
        <Text style={styles.sectionTitle}>Kariyer Gorunumu</Text>
        <Text style={styles.paragraph}>{report.careerOutlook}</Text>

        <PageFooter page={2} total={2} />
      </Page>
    </Document>
  );
}

// ─── Enhanced PDF Document Component (5-6 pages) ────────────────────────────

function EnhancedPremiumPDFDocument({ report }: { report: EnhancedPremiumReport }) {
  const date = new Date(report.generatedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalPages = 6;

  return (
    <Document>
      {/* ─── Page 1: Overview + Dimensions ─────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AdaptAI Pro Rapor</Text>
          <Text style={styles.subtitle}>
            Kisisel Yapay Zeka Kariyer Risk Analizi — {date}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          <View>
            <Text style={styles.scoreLabel}>Genel Risk Skoru</Text>
            <Text style={{ fontSize: 10, color: colors.muted, marginTop: 2 }}>
              {report.riskLabel}
            </Text>
          </View>
          <Text style={[styles.scoreNumber, { color: getScoreColor(report.overallScore) }]}>
            {report.overallScore}/100
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Yonetici Ozeti</Text>
        <Text style={styles.paragraph}>{report.executiveSummary}</Text>

        <Text style={styles.sectionTitle}>Boyut Analizi</Text>
        {report.dimensionAnalysis.map((dim) => (
          <View key={dim.dimension} style={{ marginBottom: 12 }}>
            <View style={styles.dimRow}>
              <Text style={styles.dimLabel}>{dim.label}</Text>
              <Text style={[styles.dimScore, { color: getScoreColor(dim.score) }]}>
                {dim.score}/100
              </Text>
            </View>
            <Text style={[styles.paragraph, { paddingLeft: 8, marginTop: 4 }]}>
              {dim.detailedExplanation}
            </Text>
            {dim.recommendations.map((rec, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{rec}</Text>
              </View>
            ))}
          </View>
        ))}

        <PageFooter page={1} total={totalPages} />
      </Page>

      {/* ─── Page 2: Risks + Strengths + Action Plan ───────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>En Onemli Riskler</Text>
        {report.topRisks.map((risk, i) => (
          <View key={i} style={styles.actionCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={styles.actionTitle}>{risk.area}</Text>
              <Text
                style={[
                  styles.riskTag,
                  { backgroundColor: getSeverityColor(risk.severity) },
                ]}
              >
                {risk.severity === "critical" ? "Kritik" : risk.severity === "high" ? "Yuksek" : "Orta"}
              </Text>
            </View>
            <Text style={styles.paragraph}>{risk.description}</Text>
            <Text style={[styles.paragraph, { color: colors.primary }]}>
              Oneri: {risk.mitigation}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Guclu Yonler</Text>
        {report.topStrengths.map((s, i) => (
          <View key={i} style={styles.actionCard}>
            <Text style={styles.actionTitle}>{s.area}</Text>
            <Text style={styles.paragraph}>{s.description}</Text>
            <Text style={[styles.paragraph, { color: colors.success }]}>
              Nasil kullanilir: {s.howToLeverage}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Eylem Plani</Text>
        {report.actionPlan.map((item) => (
          <View key={item.priority} style={styles.actionCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.actionTitle}>
                {item.priority}. {item.title}
              </Text>
              <Text style={styles.actionMeta}>{item.timeframe}</Text>
            </View>
            <Text style={styles.paragraph}>{item.description}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Kariyer Gorunumu</Text>
        <Text style={styles.paragraph}>{report.careerOutlook}</Text>

        <PageFooter page={2} total={totalPages} />
      </Page>

      {/* ─── Page 3: Answer Insights ───────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Cevaplarin Ne Anlatiyor?</Text>
        <Text style={[styles.paragraph, { marginBottom: 12 }]}>
          Quiz cevaplarin analiz edildi. Asagida risk profilini en cok etkileyen cevaplarin ve bunlarin kariyer riskin uzerindeki etkileri yer aliyor.
        </Text>

        {report.answerInsights.map((insight, i) => (
          <View key={i} style={styles.insightCard}>
            <View
              style={[
                styles.insightBadge,
                { backgroundColor: getRiskImpactColor(insight.riskImpact) },
              ]}
            />
            <View style={styles.insightContent}>
              <Text style={styles.insightQuestion}>
                {insight.questionSummary}
              </Text>
              <Text style={styles.insightExplanation}>
                {insight.riskImpact === "artiriyor" ? "Risk Artiriyor" : insight.riskImpact === "azaltiyor" ? "Risk Azaltiyor" : "Notr Etki"} — {insight.explanation}
              </Text>
              <Text style={styles.insightTip}>
                Oneri: {insight.personalTip}
              </Text>
            </View>
          </View>
        ))}

        {report.answerInsights.length === 0 && (
          <Text style={styles.paragraph}>
            Cevap verisi mevcut degil. Bu bolum, quiz cevaplari kaydedildiginde kisiselestirilmis icgoruler sunar.
          </Text>
        )}

        <PageFooter page={3} total={totalPages} />
      </Page>

      {/* ─── Page 4: Tool Recommendations ──────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Meslegine Ozel AI Arac Onerileri</Text>
        <Text style={[styles.paragraph, { marginBottom: 12 }]}>
          Meslek kategorine gore secilmis yapay zeka araclari. Oncelik sirasina gore uygulamaya basla.
        </Text>

        {/* Table header */}
        <View style={[styles.toolRow, { backgroundColor: colors.primary }]}>
          <Text style={[styles.toolName, { color: colors.white }]}>Arac</Text>
          <Text style={[styles.toolDesc, { color: colors.white }]}>Neden Onemli</Text>
          <Text style={[styles.toolPricing, { color: colors.white }]}>Fiyat</Text>
          <Text style={{ fontSize: 7, width: 55, textAlign: "center", color: colors.white }}>Oncelik</Text>
        </View>

        {report.toolRecommendations.map((tool, i) => (
          <View key={i} style={styles.toolRow}>
            <View style={{ width: 110 }}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={{ fontSize: 7, color: colors.muted }}>{tool.description.slice(0, 50)}...</Text>
            </View>
            <Text style={styles.toolDesc}>{tool.whyRelevant}</Text>
            <Text style={styles.toolPricing}>
              {tool.pricing === "ucretsiz" ? "Ucretsiz" : tool.pricing === "freemium" ? `Freemium${tool.monthlyPrice ? `\n${tool.monthlyPrice}` : ""}` : tool.monthlyPrice ?? "Ucretli"}
            </Text>
            <Text
              style={[
                styles.toolPriority,
                { backgroundColor: getPriorityColor(tool.priority) },
              ]}
            >
              {getPriorityLabel(tool.priority)}
            </Text>
          </View>
        ))}

        {/* Investment summary */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Yatirim Ozeti</Text>
        <View style={styles.investmentBox}>
          <Text style={styles.investmentTotal}>
            Zorunlu Araclar: {report.paidInvestments.totalMonthly}
          </Text>
          <Text style={styles.paragraph}>{report.paidInvestments.roiExplanation}</Text>
        </View>

        <PageFooter page={4} total={totalPages} />
      </Page>

      {/* ─── Page 5: Six Month Roadmap ─────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>{report.sixMonthRoadmap.title}</Text>
        <Text style={[styles.paragraph, { marginBottom: 12 }]}>
          {report.sixMonthRoadmap.overview}
        </Text>

        {report.sixMonthRoadmap.months.map((month) => (
          <View key={month.month} style={styles.roadmapMonth}>
            <View style={styles.roadmapHeader}>
              <Text style={styles.roadmapMonthNum}>Ay {month.month}</Text>
              <Text style={styles.roadmapTheme}>{month.theme}</Text>
            </View>
            <Text style={styles.roadmapDetail}>Beceri: {month.skill}</Text>
            <Text style={styles.roadmapDetail}>Arac: {month.tool}</Text>
            <Text style={styles.roadmapDetail}>Kaynak: {month.course}</Text>
            <Text style={styles.roadmapDetail}>Haftalik Aksiyon: {month.weeklyAction}</Text>
            <Text style={styles.roadmapMilestone}>Hedef: {month.milestone}</Text>
          </View>
        ))}

        <PageFooter page={5} total={totalPages} />
      </Page>

      {/* ─── Page 6: Free Resources + Next Steps ──────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Ucretsiz Kaynaklar</Text>
        <Text style={[styles.paragraph, { marginBottom: 8 }]}>
          Meslek kategorine gore secilmis ucretsiz egitim kaynaklari. Hemen baslamak icin herhangi bir yatirim gerekmez.
        </Text>

        {report.freeResources.map((resource, i) => (
          <View key={i} style={styles.resourceCard}>
            <Text style={styles.resourceName}>{resource.name}</Text>
            <Text style={styles.resourceDesc}>{resource.description}</Text>
            <Text style={styles.resourceMeta}>
              {resource.type === "kurs" ? "Online Kurs" : resource.type === "youtube" ? "YouTube" : resource.type === "blog" ? "Blog/Makale" : resource.type === "topluluk" ? "Topluluk" : "Dokumantasyon"}
              {resource.estimatedHours > 0 ? ` — Tahmini ${resource.estimatedHours} saat` : ""}
              {" — "}{resource.url}
            </Text>
          </View>
        ))}

        {/* Paid tier breakdown */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Ucretli Arac Kategorileri</Text>

        {report.paidInvestments.mustHave.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text style={[styles.actionTitle, { color: colors.danger }]}>Zorunlu Araclar</Text>
            {report.paidInvestments.mustHave.map((tool, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  {tool.name} ({tool.monthlyPrice ?? tool.pricing}) — {tool.whyRelevant.slice(0, 80)}...
                </Text>
              </View>
            ))}
          </View>
        )}

        {report.paidInvestments.niceToHave.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text style={[styles.actionTitle, { color: colors.primary }]}>Onerilen Araclar</Text>
            {report.paidInvestments.niceToHave.map((tool, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  {tool.name} ({tool.monthlyPrice ?? tool.pricing}) — {tool.whyRelevant.slice(0, 80)}...
                </Text>
              </View>
            ))}
          </View>
        )}

        {report.paidInvestments.advanced.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text style={[styles.actionTitle, { color: colors.muted }]}>Ileri Seviye Araclar</Text>
            {report.paidInvestments.advanced.map((tool, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  {tool.name} ({tool.monthlyPrice ?? tool.pricing}) — {tool.whyRelevant.slice(0, 80)}...
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Next steps */}
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Sonraki Adimlar</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>1.</Text>
          <Text style={styles.listText}>Bu raporu kaydet ve 6 aylik yol haritasini takvime isaretle</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>2.</Text>
          <Text style={styles.listText}>Zorunlu araclari bu hafta icinde kur ve gunluk kullanima basla</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>3.</Text>
          <Text style={styles.listText}>Ilk ucretsiz kaynak ile bu hafta egitim programina basla</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>4.</Text>
          <Text style={styles.listText}>3 ay sonra adaptai.dev/quiz adresinden yeniden test coz ve ilerleme olc</Text>
        </View>

        <PageFooter page={6} total={totalPages} />
      </Page>
    </Document>
  );
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function renderPremiumPDF(report: PremiumReport): Promise<Buffer> {
  return renderToBuffer(<PremiumPDFDocument report={report} />);
}

export async function renderEnhancedPremiumPDF(report: EnhancedPremiumReport): Promise<Buffer> {
  return renderToBuffer(<EnhancedPremiumPDFDocument report={report} />);
}
