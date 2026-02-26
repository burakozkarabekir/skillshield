/**
 * Paylaşım Kartı & Sosyal Paylaşım Metinleri — AdaptAI
 *
 * Duygusal hedef: Sosyal kimlik + sohbet başlatıcı
 * Paylaşım kartı onları testi çözdükleri için akıllı/proaktif göstermeli,
 * korkmuş değil.
 */

// ─── OG GÖRSEL / PAYLAŞIM KARTI METNİ ──────────────────────────
// LinkedIn/Twitter'da paylaşıldığında önizleme kartında görünen metin
export const shareCard = {
  // OG görseldeki ana metin (skor aralığına göre değişir)
  cardHeadlines: {
    low: [
      "Yapay Zeka Kariyer Risk Puanım: {{score}}/100. Gayet iyi durumdayım.",
      "Yapay zeka riskinde {{score}}/100 aldım. Kariyerimi otomatikleştirmek sanıldığı kadar kolay değilmiş.",
      "{{score}}/100 yapay zeka riski. Düşük tehdit algılandı.",
    ],
    moderate: [
      "Yapay Zeka Kariyer Risk Puanım: {{score}}/100. Dikkat etme zamanı.",
      "Yapay zeka risk puanım: {{score}}/100. Detaylarda bazı sürprizler var.",
      "{{score}}/100 — ne güvende, ne de batmış. Artık nereye odaklanmam gerektiğini biliyorum.",
    ],
    high: [
      "Yapay Zeka Kariyer Risk Puanım: {{score}}/100. Kontrol ettiğime iyi oldu.",
      "Yapay zeka risk puanımı öğrendim. {{score}}/100. Artık bir planım var.",
      "{{score}}/100 — tam ihtiyacım olan uyandırma çağrısı. Senin puanın kaç?",
    ],
    critical: [
      "Yapay Zeka Kariyer Risk Puanım: {{score}}/100. Şimdi öğrendiğime iyi oldu.",
      "{{score}}/100 yapay zeka kariyer riski. Bilmek, inkar etmekten iyidir. Seninki kaç?",
      "{{score}}/100 aldım. Tahmin etmektense bilmek daha iyi. Testi çöz.",
    ],
  },
  // Karttaki alt metin
  cardSubtext: [
    "Ücretsiz Yapay Zeka Kariyer Risk Değerlendirmesi — AdaptAI",
    "7 dakikalık testi adaptai.dev'de çöz",
    "Yapay Zeka Kariyer Risk Puanın kaç? Ücretsiz öğren.",
  ],
} as const;

// ─── PAYLAŞIM İSTEMİ (SAYFA İÇİ) ──────────────────────────────
// Sonuç sayfasında paylaşımı teşvik etmek için gösterdiğimiz şey
export const sharePrompt = {
  headlines: [
    "Puanını görmesi gereken biri var mı?",
    "Paylaş. Konuşmayı başlat.",
    "Çevrendeki insanların bunu görmesi lazım.",
  ],
  subheads: [
    "Puanını paylaşanlar, gerçekten önemli olan kariyer konuşmalarını başlatıyor.",
    "847.000 kişi testi çözdü. Çevrenin de katılmasına yardım et.",
    "Puanını paylaşmak övünmek değil — topluma hizmet.",
  ],
  buttonLabels: {
    linkedin: "LinkedIn'de Paylaş",
    twitter: "X'te Paylaş",
    copy: "Linki kopyala",
    email: "E-posta ile gönder",
  },
} as const;

// ─── PAYLAŞIM ŞABLONLARI (ÖN DOLDURULMUŞ GÖNDERİ METNİ) ──────────────
export const shareTemplates = {
  linkedin: [
    "AdaptAI Yapay Zeka Kariyer Risk Değerlendirmesini çözdüm. Puanım: {{score}}/100.\n\nGörev görev analiz gerçekten göz açıcıydı. Yapay zekanın rolünüzü nasıl etkileyeceğini merak ediyorsanız, 7 dakikaya değer.\n\n{{url}}",
    "Yıllardır yapay zekanın işleri ele geçireceğini duyuyordum. Sonunda KENDİ rolüm için somut, veriye dayalı bir cevap aldım.\n\nYapay Zeka Kariyer Risk Puanım: {{score}}/100.\n\nAnaliz, günlük görevlerimden hangilerinin en çok risk altında olduğunu gösteriyor. Sen de dene: {{url}}",
    "Herkesin yapay zeka ve işler hakkında bir fikri var. AdaptAI sana veri veriyor.\n\nBenim puanım: {{score}}/100. Seninki kaç?\n\n{{url}}",
  ],
  twitter: [
    "Yapay Zeka Kariyer Risk Puanım: {{score}}/100\n\n7 dakikalık test, veriye dayalı sonuçlar. Laf yok.\n\nSeninki kaç? {{url}}",
    "Temel iş görevlerimin %{{score}}'inin yapay zeka tarafından otomatikleştirilebileceğini öğrendim.\n\nBilmek > inkar etmek.\n\n{{url}}",
    "\"Yapay zeka işimi nasıl etkiler?\" belirsiz.\n\"{{score}}/100\" net.\n\nTesti çöz: {{url}}",
  ],
} as const;

// ─── PAYLAŞIM BAŞARILI / KOPYALANDI DURUMU ────────────────────────
export const shareConfirmation = {
  copied: [
    "Link kopyalandı. Paylaşabilirsin.",
    "Panoya kopyalandı.",
    "Tamam. Şimdi güzel bir yere yapıştır.",
  ],
  shared: [
    "Paylaşıldı. Artık resmen proaktifsin.",
    "Tamam. Çevren sana teşekkür edecek.",
    "Paylaşıldı. Şimdi sonuçlarına geri dönelim.",
  ],
} as const;
