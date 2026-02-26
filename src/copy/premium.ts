/**
 * Premium CTA & E-posta Toplama Metinleri — SkillShield
 *
 * Duygusal hedef: Güçlenme + aciliyet
 * "Problemi biliyorsun. İşte kişiselleştirilmiş çözümün."
 */

// ─── PREMIUM CTA (SONUÇ SAYFASINDA) ──────────────────
export const premiumCta = {
  headlines: [
    "Skoru biliyorsun. Planı al.",
    "Teşhis tamam. Tedavi burada.",
    "Skorun ücretsiz. Raporun fiyatı 149 TL.",
  ],
  subheads: [
    "Detaylı skor raporu, kişiselleştirilmiş öneri planı ve PDF kariyer raporu — hepsi bir arada.",
    "Risk profiline özel analiz, gelişim önerileri ve indirilebilir PDF rapor.",
    "Ücretsiz skorun problemi gösteriyor. SkillShield Pro çözüm yolunu gösteriyor — tam senin durumun için hazırlanmış raporla.",
  ],
  ctas: [
    "Raporumu al",
    "Detaylı analizi aç",
    "PDF raporumu oluştur",
  ],
  features: [
    {
      title: "Detaylı Skor Raporu",
      description: "Her boyutun derinlemesine analizi. Güçlü ve zayıf yönlerin, karşılaştırmalı verilerle birlikte.",
    },
    {
      title: "Kişiselleştirilmiş Öneri Planı",
      description: "Risk profiline göre spesifik beceri geliştirme önerileri, eğitim kaynakları ve kariyer hamleleri.",
    },
    {
      title: "PDF Kariyer Raporu",
      description: "Profesyonel formatta indirilebilir rapor. İstediğin zaman bak, paylaş veya danışmanınla incele.",
    },
  ],
  pricing: {
    amount: "149 TL",
    period: "tek seferlik",
    anchoring: [
      "Bir saatlik kariyer koçluğundan daha az.",
      "Ortalama kariyer değişikliği gelir kaybında binlerce TL'ye mal olur. Bu sadece 149 TL.",
      "Bir haftalık kahve parası. Veya önümüzdeki on yıl için bir kariyer planı.",
    ],
  },
  guarantee: [
    "30 gün para iade garantisi. Rapor işe yaramazsa, hiçbir şey ödemezsin.",
    "30 gün içinde tam iade. Soru yok, form yok, sürtünme yok.",
    "30 gün risksiz dene. Memnun değil misin? Her kuruşunu geri al.",
  ],
} as const;

// ─── E-POSTA TOPLAMA (SKOR SONRASI, PREMİUM ÖNCESİ) ────────────
export const emailCapture = {
  headlines: [
    "Skorun değişecek. Değiştiğinde söyleriz.",
    "Yapay zeka yetenekleri her ay değişiyor. Riskin de.",
    "Skorun değiştiğinde bilmek ister misin?",
  ],
  subheads: [
    "E-postanı bırak. Yeni yapay zeka gelişmeleri risk profilini etkilediğinde seni bilgilendiririz.",
    "Yapay zeka atılımları iş kategorini etkilediğinde ücretsiz aylık güncelleme al. Spam yok. İstediğin zaman abonelikten çık.",
    "Yapay zeka yetenek güncellemelerini her gün takip ediyoruz. Skorunu etkileyen bir şey olduğunda, ilk bilen sen olursun.",
  ],
  ctas: [
    "Beni bilgilendir",
    "Beni güncel tut",
    "Skorumu takip et",
  ],
  placeholder: "senin@emailin.com",
  disclaimer: [
    "Ayda en fazla bir e-posta. Tek tıkla abonelikten çık.",
    "Sadece risk profilin değiştiğinde e-posta atarız. Hepsi bu.",
    "Spam yok. Haber bülteni yok. Sadece skor güncellemelerin.",
  ],
  success: [
    "Tamam. Riskini biz takip ederiz, sen etmek zorunda kalma.",
    "Kaydedildi. Bir şey değiştiğinde senden haber alırsın.",
    "Tamam. Kariyer radarın şimdi aktif.",
  ],
} as const;

// ─── E-POSTA ÜST SATIŞ ─────────────────────────────
export const emailUpsell = {
  subject: [
    "Yapay zeka risk skorun değişti.",
    "Güncelleme: kariyer riskin {{direction}} hareket etti.",
    "Yeni yapay zeka gelişmesi rolünü etkiliyor.",
  ],
  preheader: [
    "Skorun {{oldScore}}'dan {{newScore}}'a gitti. İşte nedeni.",
    "Yeni bir yapay zeka modeli artık günlük yaptığın bir şeyi yapabiliyor.",
    "Kariyer risk profili için önemli güncelleme.",
  ],
  body: {
    scoreIncrease:
      "Yapay Zeka Kariyer Risk Skorun bu ay {{oldScore}}'dan {{newScore}}'a yükseldi. Yeni bir yapay zeka yeteneği artık temel görevlerinden biriyle örtüşüyor. İşte ne değişti ve bu konuda ne yapabilirsin.",
    scoreDecrease:
      "İyi haber: risk skorun {{oldScore}}'dan {{newScore}}'a düştü. Rolünü etkileyen yapay zeka yetenekleri tahmin edildiği kadar hızlı ilerlemedi. Ama rahat durma — işte mevcut manzara.",
    noChange:
      "Skorun bu ay {{score}}'da sabit kaldı. Rolünü etkileyen yapay zeka yeteneklerinde büyük değişiklik yok. İşte takip ettiğimiz şeylerin hızlı özeti.",
  },
  premiumNudge: [
    "Spesifik bir plan mı istiyorsun? SkillShield Pro detaylı raporunu oluşturur. →",
    "Skoru bilmek birinci adım. Plan yapmak ikinci adım. →",
    "Skor güncellemeleri ücretsiz. Detaylı rapor 149 TL. →",
  ],
} as const;

// ─── PREMİUM KULLANICILAR İÇİN BİLDİRİM METİNLERİ ─────────────────
export const premiumNotifications = {
  weeklyCheckIn: {
    subject: "Hafta {{weekNumber}} eylem maddesi",
    body: "Bu haftanın odağı: {{skillName}}. İşte görevin ve tamamlaman gereken kaynak.",
  },
  milestoneReached: {
    subject: "Kilometre taşı: {{milestoneName}} tamamlandı",
    body: "{{milestoneName}} adımını tamamladın. Öngörülen risk azalması: {{reduction}} puan. Sıradaki: {{nextStep}}.",
  },
  scoreUpdate: {
    subject: "Skorun {{points}} puan düştü",
    body: "Yeniden beceri kazanman işe yarıyor. {{oldScore}}'dan {{newScore}}'a düştün. Spesifik etki {{skillName}}'den geldi. Devam et.",
  },
  inactivityNudge: {
    subject: [
      "Planın seni bekliyor.",
      "Son eyleminden 7 gün geçti.",
      "İlerlemenle ilgili kısa bir kontrol.",
    ],
    body: "90 günlük planının {{weekNumber}}. haftasındasın. Sonraki adım yaklaşık {{timeEstimate}} dakika sürer. Devam edecek misin?",
    cta: "Planıma devam et",
  },
} as const;
