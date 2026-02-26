/**
 * Ana Sayfa Metinleri — SkillShield
 *
 * Duygusal hedef: Merak + hafif kaygı
 * "Herkes yapay zekanın işleri ele geçireceğinden bahsediyor.
 *  Ama kimse sana gerçekten ne yapman gerektiğini söylemiyor."
 *
 * Tüm metinler marka kurallarına uyar:
 *   Başlıklar: max 8 kelime | Alt başlıklar: max 15 kelime
 *   Metin: max 3 cümle | CTA'ler: max 5 kelime, aksiyon odaklı
 *   Her eleman için 3 varyasyon (A/B testi)
 */

// ─── HERO BÖLÜMÜ ────────────────────────────────────────
export const hero = {
  headlines: [
    "Yapay zeka işine göz dikti.",
    "Kariyerinin bir son kullanma tarihi var.",
    "Maaşın ne kadar güvende?",
  ],
  subheads: [
    "5 dakikalık testi çöz. Yapay Zeka Kariyer Risk Skorunu al. Tam olarak nerede durduğunu bil.",
    "İşlerin %67'si 5 yıl içinde yapay zeka tarafından dönüştürülecek. Seninki bunlardan biri mi öğren.",
    "Çoğu insan riskini yanlış tahmin ediyor. Veriye dayalı bir skor, içgüdüsel bir tahminden iyidir.",
  ],
  ctas: [
    "Ücretsiz skorunu al",
    "5 dakikada öğren",
    "Risk skorunu gör",
  ],
} as const;

// ─── SOSYAL KANIT / İSTATİSTİK BARI ────────────────────────────
export const socialProof = {
  headlines: [
    "Rakamlar yalan söylemez.",
    "2,4 milyon veri noktası ne ortaya koyuyor.",
    "Gerçek işgücü piyasası verileri üzerine kurulu.",
  ],
  stats: [
    { value: "847K+", label: "skor hesaplandı" },
    { value: "4.8/5", label: "ortalama kullanıcı puanı" },
    { value: "%92", label: "kariyer planını değiştirdiğini söylüyor" },
  ],
  sourceNote:
    "Analiz O*NET görev verileri, BLS projeksiyonları ve yapay zeka yetenek ölçütlerine dayanmaktadır.",
} as const;

// ─── NASIL ÇALIŞIR ────────────────────────────────────
export const howItWorks = {
  headlines: [
    "Beş dakika. Sıfır tahmin.",
    "Belirsizlikten netliğe 5 dakikada.",
    "İşte böyle çalışıyor.",
  ],
  steps: [
    {
      number: "01",
      title: "25 soruyu cevapla",
      description:
        "Rolün, günlük görevlerin ve kullandığın araçlar hakkında. Boş laf yok — her soru gerçek bir risk faktörüyle eşleşiyor.",
    },
    {
      number: "02",
      title: "Verileri işliyoruz",
      description:
        "Cevapların 1.200'den fazla meslek profili ve en güncel yapay zeka yetenek araştırmalarıyla karşılaştırılıyor.",
    },
    {
      number: "03",
      title: "Skorunu ve planını al",
      description:
        "0–100 risk skoru, görev görev analiz ve seni değiştirmesi zor kılan spesifik beceriler.",
    },
  ],
} as const;

// ─── GÜVEN / "NEDEN ÖNEMLİ" BÖLÜMÜ ──────────────────
export const whyThisMatters = {
  headlines: [
    "İnkar bir kariyer stratejisi değil.",
    "Umut bir plan değil.",
    "Yapay zekayı görmezden gelmek, onun seni görmezden gelmesini sağlamaz.",
  ],
  body: [
    "Tüm sektörlerdeki çalışma saatlerinin %40'ı artık büyük dil modelleri tarafından otomatikleştirilebiliyor. Bu rakam iki yıl önce %15'ti. Soru işinin değişip değişmeyeceği değil — değiştiğinde hazır olup olmayacağın.",
    "McKinsey, 2030'a kadar 12 milyon kişinin meslek değiştirmesi gerekeceğini tahmin ediyor. Çoğu listede olduğunu bilmiyor. Yapay Zeka Kariyer Risk Skorun, tepki vermek zorunda kalmadan önce harekete geçmen için gereken netliği veriyor.",
    "Şirketler beklemiyor. Fortune 500 firmalarının %78'i belirli rollerde çalışan sayısını azaltmak için aktif olarak yapay zeka dağıtıyor. Riskini bilmek karamsarlık değil — ilgili kalmaya doğru atılan ilk adım.",
  ],
} as const;

// ─── SSS BÖLÜMÜ ─────────────────────────────────────
export const faq = {
  headlines: [
    "Çok sorulan sorular.",
    "Merak ediyorsun. Cevaplıyoruz.",
    "Sadece düz cevaplar.",
  ],
  items: [
    {
      question: "Skor ne kadar doğru?",
      answer:
        "Cevaplarını O*NET mesleki görev verileri, Çalışma İstatistikleri Bürosu projeksiyonları ve yayınlanmış yapay zeka benchmark araştırmalarıyla çapraz kontrol ediyoruz. Hiçbir model mükemmel değil, ama bu kamuya açık en veriye dayalı değerlendirme.",
    },
    {
      question: "Verilerim satılıyor veya paylaşılıyor mu?",
      answer:
        "Hayır. Quiz cevapların sadece skorunu üretmek için kullanılıyor. Verileri üçüncü taraflara satmıyoruz. Nokta.",
    },
    {
      question: "Skor gerçekte ne anlama geliyor?",
      answer:
        "0–100 arası skorun, mevcut veya yakın vadeli yapay zeka sistemlerinin temel iş görevlerinin yüzde kaçını yapabileceğini yansıtır. 73 demek kabaca temel görevlerinin %73'ünün otomatikleştirilebilir olduğu anlamına gelir. Analiz tam olarak hangilerini gösteriyor.",
    },
    {
      question: "Bu sadece beni korkutmaya mı çalışıyor?",
      answer:
        "Tam tersi. Korku bilmemekten gelir. Skorun sana net bir resim veriyor ve — premium'a geçersen — somut bir eylem planı. Bilgi, kaygının panzehiridir.",
    },
    {
      question: "Ne kadar sürüyor?",
      answer:
        "Quiz için 5 dakika. Skorun hesaplanması için yaklaşık 10 saniye. Ömür boyu sürecek kariyer netliği.",
    },
    {
      question: "Buna neden genel bir makaleden daha çok güvenmeliyim?",
      answer:
        "Genel makaleler 'yapay zeka bazı işleri etkileyebilir' diyor. Biz SENİN spesifik günlük görevlerinden hangilerinin en çok risk altında olduğunu ve her biri için ne yapman gerektiğini söylüyoruz.",
    },
  ],
} as const;

// ─── ALT CTA (ANA SAYFA ALT KISMI) ────────────────
export const footerCta = {
  headlines: [
    "Hâlâ kaydırıyor musun? Testi çöz artık.",
    "Yeterince okudun. Öğrenme zamanı.",
    "Beş dakika, üç yıl merak etmekten iyidir.",
  ],
  subheads: [
    "847.000 profesyonel skorunu zaten biliyor. Sen biliyor musun?",
    "Ücretsiz. Anonim. Son kahve siparişinden daha kısa sürer.",
    "Quiz ücretsiz. Huzur paha biçilemez.",
  ],
  ctas: [
    "Ücretsiz skorunu al",
    "Şimdi testi çöz",
    "Teste başla",
  ],
} as const;
