import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { PremiumReport } from "./premium-report";

/**
 * Server-side PDF report generator using @react-pdf/renderer.
 *
 * Usage: const buffer = await renderPremiumPDF(report);
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

// ─── PDF Document Component ─────────────────────────────────────────────────

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
          <Text style={styles.title}>SkillShield Pro Rapor</Text>
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

        <View style={styles.footer}>
          <Text>SkillShield Pro — skillshield.dev</Text>
          <Text>Sayfa 1/2</Text>
        </View>
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

        <View style={styles.footer}>
          <Text>SkillShield Pro — skillshield.dev</Text>
          <Text>Sayfa 2/2</Text>
        </View>
      </Page>
    </Document>
  );
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function renderPremiumPDF(report: PremiumReport): Promise<Buffer> {
  return renderToBuffer(<PremiumPDFDocument report={report} />);
}
