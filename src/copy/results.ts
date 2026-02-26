/**
 * Sonuçlar / Skor Açıklama Sayfası Metinleri — SkillShield
 *
 * Duygusal hedef: Duygusal zirve (rahatlama veya aciliyet)
 *   → sonra paylaşma isteği
 *   → sonra bilgilendirilmiş ve kontrol altında hissetme
 *
 * "73/100" gördükleri an onları derinden etkilemeli.
 * Sonra analiz hemen bilgilendirilmiş hissetmelerini sağlamalı.
 */

// ─── SKOR AÇIKLAMA ────────────────────────────────────────
// Skor aralıklarına göre dinamik başlıklar
export const scoreReveal = {
  ranges: [
    {
      min: 0,
      max: 25,
      label: "Düşük Risk",
      color: "#22c55e", // yeşil
      headlines: [
        "İyi durumdasın.",
        "Yapay zeka henüz sana gelmiyor.",
        "Rahat ol. Kariyer sağlam.",
      ],
      subheads: [
        "Rolün otomasyona karşı güçlü savunmalara sahip. İşte nedeni — ve böyle tutmanın yolu.",
        "Temel görevlerinin sadece küçük bir kısmı mevcut yapay zeka yetenekleriyle örtüşüyor.",
        "En güvenli çeyrekte yer alıyorsun. Ama 'güvenli', 'sonsuza kadar' demek değil. İşte analizin.",
      ],
    },
    {
      min: 26,
      max: 50,
      label: "Orta Risk",
      color: "#eab308", // sarı
      headlines: [
        "Zamanın var. İyi kullan.",
        "Acil değil. Güvenli de değil.",
        "Pencere hâlâ açık.",
      ],
      subheads: [
        "Temel görevlerinin yaklaşık üçte biri otomatikleştirilebilir. Şimdi harekete geçersen yönetilebilir.",
        "Ortalamanın tam ortasındasın. Görevlerinin bazıları başka yerlerde zaten otomatikleştiriliyor.",
        "Rolün değişecek, yok olmayacak. Soru bu değişikliğe öncülük mü edeceksin yoksa takip mi.",
      ],
    },
    {
      min: 51,
      max: 75,
      label: "Yüksek Risk",
      color: "#f97316", // turuncu
      headlines: [
        "Bu senin uyandırma çağrın.",
        "Saat işliyor.",
        "Hamle yapma zamanı.",
      ],
      subheads: [
        "Günlük görevlerinin yarısından fazlası yapay zekanın şu an yapabildiğiyle örtüşüyor. Gelecek yıl değil — şu an.",
        "Rolün yapay zekadan en çok etkilenen %40'ın içinde. Aşağıdaki detaylı analiz tam olarak nerede olduğunu gösteriyor.",
        "Bu skor bir sinyal, mahkumiyet değil. Risk ile yıkım arasındaki fark, bundan sonra ne yapacağın.",
      ],
    },
    {
      min: 76,
      max: 100,
      label: "Kritik Risk",
      color: "#ef4444", // kırmızı
      headlines: [
        "Bunu görmen gerekiyor.",
        "Seninle açık konuşalım.",
        "Bu ciddi. Ama düzeltilebilir.",
      ],
      subheads: [
        "Temel görevlerinin büyük çoğunluğu zaten yapay zekanın yetenek aralığında. Zaman çizelgen yıllar değil, aylar.",
        "En yüksek risk kategorisindeysin. Bu bir ölüm cezası değil — bir başlangıç tabancası.",
        "Günlük işinin çoğu bugünkü yapay zeka sistemlerinin yapabildiğiyle örtüşüyor. İşte bunun tam olarak ne anlama geldiği.",
      ],
    },
  ],
} as const;

// ─── SKOR BAĞLAM BARI ───────────────────────────────────
export const scoreContext = {
  comparisonLabels: [
    (score: number, percentile: number) =>
      `${score} puanın seni risk sıralamasında ${percentile}. yüzdelik dilime koyuyor.`,
    (score: number, percentile: number) =>
      `${score}/100 — bu testi çözenlerin %${percentile}'inden yüksek.`,
    (score: number, percentile: number) =>
      `Profesyonellerin %${percentile}'i senin ${score} puanından daha düşük aldı.`,
  ],
  industryComparison: (industry: string, avgScore: number) =>
    `${industry} sektöründe ortalama skor ${avgScore}. İşte görevlerinin karşılaştırması.`,
} as const;

// ─── GÖREV ANALİZİ BÖLÜMÜ ──────────────────────────────
export const taskBreakdown = {
  sectionHeadlines: [
    "İşte yapay zekanın yapabildiği — ve yapamadığı.",
    "Görev görev analizin.",
    "Riskin tam olarak nerede?",
  ],
  riskLabels: {
    high: "Yüksek Otomasyon Riski",
    medium: "Kısmi Otomasyon Riski",
    low: "Düşük Otomasyon Riski",
    safe: "İnsan Avantajı",
  },
  riskDescriptions: {
    high: "Yapay zeka bu görevi bugün ortalama insan seviyesinde veya üzerinde yapabiliyor.",
    medium: "Yapay zeka yardımcı olabilir ama kalite için hâlâ insan denetimine ihtiyaç var.",
    low: "Yapay zekanın burada sınırlı yeteneği var. İnsan becerisi hâlâ baskın.",
    safe: "Bu görev yapay zekanın kopyalayamadığı benzersiz insani nitelikler gerektiriyor.",
  },
} as const;

// ─── BECERİ ANALİZİ BÖLÜMÜ ─────────────────────────────
export const skillBreakdown = {
  sectionHeadlines: [
    "Seni koruyan beceriler.",
    "Kariyer zırhın, sıralanmış.",
    "Seni değiştirmesi zor kılan ne.",
  ],
  subheads: [
    "Bunlar riskini düşüren spesifik beceriler. Yeşil olanlara yüklen.",
    "Yeşildeki beceriler senin savunma hattın. Kırmızıdakiler yapay zekanın en hızlı kapattığı açıklar.",
    "Beceri geliştirmeni buraya odakla. Bunlar yatırım getirisi en yüksek beceriler.",
  ],
  categories: {
    shielded: {
      label: "Kalkan Becerilerin",
      description: "Yapay zeka bunlara dokunamaz. Seni vazgeçilmez yapıyorlar.",
    },
    atRisk: {
      label: "Tehdit Altındaki Beceriler",
      description:
        "Yapay zeka bunlarda iyileşiyor. Bunlara bağımlılıktan geçiş yapmaya başla.",
    },
    emerging: {
      label: "Geliştirmen Gereken Beceriler",
      description:
        "Bunlara henüz sahip değilsin, ama skorunu ciddi şekilde düşürürler.",
    },
  },
} as const;

// ─── İÇGÖRÜ PARAGRAFLARI ──────────────────────────────
// Bunlar dinamik olarak üretilir ama işte şablon kalıpları
export const insights = {
  sectionHeadlines: [
    "Bu senin için ne anlama geliyor.",
    "Sonuç.",
    "Durumun, çözülmüş.",
  ],
  templates: {
    highRisk:
      "Rolünün temel değeri, yapay zeka sistemlerinin zaten halledebildiği görevlerde yoğunlaşmış. Bu, işinin yarın yok olacağı anlamına gelmiyor — benimseme zaman alır. Ama yörünge net ve erken beceri kazanan profesyoneller en güçlü müzakere pozisyonuna sahip olacak.",
    moderateRisk:
      "Geçiş bölgesindesin. Rolünün bazı kısımları yapay zeka tarafından desteklenecek — araçları benimsersen seni daha üretken, benimsemezsen daha değiştirilebilir yapacak. Anahtar, yapay zekayı kullanan kişi olmak, yapay zekanın yerini aldığı kişi değil.",
    lowRisk:
      "İşin ağırlıklı olarak yapay zekanın hâlâ zorlandığı yeteneklere dayanıyor — ister fiziksel varlık, ister incelikli insan yargısı, ister derin ilişki yönetimi olsun. Bu güçlü yönlerinde keskin kal ve hangi yapay zeka yeteneklerinin yıldan yıla geliştiğini takip et.",
    adaptable:
      "Uyum sağlama isteğin en büyük varlıklarından biri. Bunu aşağıdaki spesifik beceri önerileriyle birleştir ve alanındaki çoğu insanın çok önünde olursun.",
    resistant:
      "Sektörünün yeni teknolojiyi yavaş benimsediğini belirttin. Bu şimdilik güvenli hissettirebilir, ama aynı zamanda yıkım — geldiğinde — daha ani olacak demek. Yapay zeka benimsemesini erteleyen sektörler daha yavaş değil, daha keskin geçişler yaşama eğiliminde.",
  },
} as const;

// ─── SKOR GÖRSEL ETİKETLERİ ─────────────────────────────
export const scoreVisual = {
  meterLabels: {
    low: "Düşük Risk",
    moderate: "Orta",
    high: "Yüksek Risk",
    critical: "Kritik",
  },
  // Büyük skor sayısının altında gösterilir
  taglines: [
    (score: number) =>
      score <= 25
        ? "Kariyer iyi konumlanmış."
        : score <= 50
          ? "Dikkat gerekli. Acil değil."
          : score <= 75
            ? "Yakında aksiyon gerekli."
            : "Acil aksiyon önerilir.",
  ],
} as const;
