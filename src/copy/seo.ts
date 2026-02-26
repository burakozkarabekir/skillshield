/**
 * SEO Mesleğe Özel Açılış Sayfası Metinleri — SkillShield
 *
 * Şu tarz sayfalar için şablon sistemi:
 * "Yapay zeka muhasebecilerin yerini alacak mı?"
 * "Yapay zeka grafik tasarımcıların yerini alacak mı?"
 *
 * Her sayfa benzersiz bir slug, başlık ve özel metin alır.
 */

export interface JobSEOPage {
  slug: string;
  jobTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  riskSummary: string;
  averageScore: number;
  tasksAtRisk: string[];
  tasksSafe: string[];
  verdictHeadline: string;
  verdictBody: string;
  ctaHeadline: string;
  ctaSubhead: string;
}

// ─── SEO SAYFA ŞABLONLARI ──────────────────────────────────
export const seoTemplates = {
  metaTitle: (jobTitle: string) =>
    `Yapay Zeka ${jobTitle} Yerini Alacak mı? Risk Skorun | SkillShield`,
  metaDescription: (jobTitle: string, avgScore: number) =>
    `${jobTitle} için ortalama yapay zeka risk skoru ${avgScore}/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.`,
  heroHeadline: (jobTitle: string) =>
    `Yapay zeka ${jobTitle.toLowerCase()} yerini alacak mı?`,
  heroSubhead: (jobTitle: string, avgScore: number) =>
    `Ortalama ${jobTitle.toLowerCase()} yapay zeka kariyer riskinde ${avgScore}/100 alıyor. İşte bunun anlamı — ve kendi skorunu nasıl alacağın.`,
  verdictCta: "Kişisel skorunu al",
} as const;

// ─── ÖRNEK MESLEK SAYFALARI ────────────────────────────────
export const jobPages: JobSEOPage[] = [
  {
    slug: "accountants",
    jobTitle: "Muhasebeciler",
    metaTitle: "Yapay Zeka Muhasebecilerin Yerini Alacak mı? Risk Skorun | SkillShield",
    metaDescription:
      "Muhasebeciler için ortalama yapay zeka risk skoru 72/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.",
    heroHeadline: "Yapay zeka muhasebecilerin yerini alacak mı?",
    heroSubhead:
      "Ortalama muhasebeci yapay zeka kariyer riskinde 72/100 alıyor. Defter tutma neredeyse tamamen otomatikleştirilebilir. Danışmanlık işi değil. Sen neredesin?",
    riskSummary:
      "Muhasebe en yüksek riskli beyaz yakalı mesleklerden biri. Yapay zeka zaten defter tutma, vergi hazırlama, temel denetim ve finansal raporlamayı insanlardan daha hızlı ve ucuza yapabiliyor. Ama karmaşık danışmanlık, müşteri ilişkileri ve düzenleyici yargı kesinlikle insani kalmaya devam ediyor.",
    averageScore: 72,
    tasksAtRisk: [
      "Defter tutma ve işlem kaydı",
      "Standart vergi beyannamesi hazırlama",
      "Finansal rapor üretimi",
      "Fatura işleme ve mutabakat",
      "Temel denetim prosedürleri",
    ],
    tasksSafe: [
      "Karmaşık vergi stratejisi ve planlama",
      "Müşteri ilişkileri yönetimi",
      "Yeni durumlar için düzenleyici yorum",
      "Araştırma yargısı gerektiren dolandırıcılık tespiti",
      "İş danışmanlığı ve stratejik rehberlik",
    ],
    verdictHeadline: "Sonuç: gelişmek ya da yazılımla rekabet etmek.",
    verdictBody:
      "Günün çoğunlukla defter tutma ve standart uyumla geçiyorsa, riskin gerçek. Stratejik danışmanlık ve karmaşık müşteri işleri yapıyorsan, daha güçlü bir konumdasın. Çoğu muhasebeci ikisinin arasında bir yerde — kişisel skorunu almanın tam da bu yüzden önemli olduğu yer.",
    ctaHeadline: "Bir muhasebeci olarak SENİN skorun kaç?",
    ctaSubhead:
      "Ortalama 72/100. Ama günlük görevlerin, deneyim seviyen ve uzmanlık alanın kişisel riskini etkiliyor. 5 dakikada öğren.",
  },
  {
    slug: "graphic-designers",
    jobTitle: "Grafik Tasarımcılar",
    metaTitle:
      "Yapay Zeka Grafik Tasarımcıların Yerini Alacak mı? Risk Skorun | SkillShield",
    metaDescription:
      "Grafik tasarımcılar için ortalama yapay zeka risk skoru 61/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.",
    heroHeadline: "Yapay zeka grafik tasarımcıların yerini alacak mı?",
    heroSubhead:
      "Ortalama grafik tasarımcı yapay zeka kariyer riskinde 61/100 alıyor. Şablon işi bitti. Özgün marka düşüncesi bitmedi.",
    riskSummary:
      "Yapay zeka görsel üretimi neredeyse diğer tüm alanlardan daha hızlı ilerledi. Midjourney ve DALL-E gibi araçlar artık saniyeler içinde profesyonel kalitede görseller üretebiliyor. Ama marka stratejisi, sanat yönetimi ve derin müşteri anlayışı gerektiren tasarımlar insanların yönetiminde kalmaya devam ediyor.",
    averageScore: 61,
    tasksAtRisk: [
      "Şablonlardan sosyal medya grafiği oluşturma",
      "Stok görsel seçimi ve temel fotoğraf düzenleme",
      "Standart sunum tasarımı",
      "Basit logo varyasyonları ve yeniden boyutlandırma",
      "Banner reklam üretimi",
    ],
    tasksSafe: [
      "Marka kimliği geliştirme ve strateji",
      "Sanat yönetimi ve yaratıcı liderlik",
      "Kullanıcı araştırması gerektiren kullanıcı deneyimi tasarımı",
      "Karmaşık çoklu temas noktası kampanya tasarımı",
      "Müşteri sunumu ve konsept satışı",
    ],
    verdictHeadline: "Sonuç: üretim işi kayboluyor. Düşünce kaybolmuyor.",
    verdictBody:
      "Esas olarak şablon ve üretim işi yapıyorsan, yapay zeka zaten daha hızlı yapıyor. Neyin yapılacağına, neden yapılacağına ve iş hedeflerine nasıl bağlanacağına karar veren kişiysen — yapay zekayı yönetecek olan sensin, onunla rekabet eden değil.",
    ctaHeadline: "Bir tasarımcı olarak SENİN skorun kaç?",
    ctaSubhead:
      "Ortalama 61/100. Ama üretim mi strateji mi yaptığın her şeyi değiştiriyor. Kişisel analizini al.",
  },
  {
    slug: "software-engineers",
    jobTitle: "Yazılım Mühendisleri",
    metaTitle:
      "Yapay Zeka Yazılım Mühendislerinin Yerini Alacak mı? Risk Skorun | SkillShield",
    metaDescription:
      "Yazılım mühendisleri için ortalama yapay zeka risk skoru 48/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.",
    heroHeadline: "Yapay zeka yazılım mühendislerinin yerini alacak mı?",
    heroSubhead:
      "Ortalama yazılım mühendisi yapay zeka kariyer riskinde 48/100 alıyor. Şablon kod yapay zeka için kolay. Sistem tasarımı değil.",
    riskSummary:
      "Yapay zeka kodlama asistanları artık çoğu rutin programlama görevini halledecek seviyede kod yazabilir, hata ayıklayabilir ve yeniden düzenleyebilir. Ama sistem mimarisi, belirsiz gereksinimleri anlama, ekipler arası koordinasyon ve yeni problem çözme derinden insani kalmaya devam ediyor. Rol dönüşüyor, yok olmuyor.",
    averageScore: 48,
    tasksAtRisk: [
      "Şablon ve CRUD kodu yazma",
      "İyi belgelenmiş kod tabanlarında hata düzeltme",
      "Stil ve standart sorunları için kod inceleme",
      "Mevcut kod için birim test yazma",
      "Dokümantasyon üretimi",
    ],
    tasksSafe: [
      "Sistem mimarisi ve tasarım kararları",
      "Belirsiz iş gereksinimlerini teknik özelliklere dönüştürme",
      "Ekipler arası teknik liderlik",
      "Karmaşık sistemlerin performans optimizasyonu",
      "Mühendislik ekiplerini mentorluk ve büyütme",
    ],
    verdictHeadline: "Sonuç: 10x mühendisler artık 100x mühendis oldu.",
    verdictBody:
      "Yapay zeka yazılım mühendislerinin yerini almayacak — onları güçlendirecek. Yapay zeka araçlarını benimseyen mühendisler dramatik şekilde daha üretken olacak. Benimsemeyenler yapay zeka kullanan daha küçük ekipler tarafından geçilecek. Soru değiştirme değil. Araçları kullanıp kullanmadığın.",
    ctaHeadline: "Bir mühendis olarak SENİN skorun kaç?",
    ctaSubhead:
      "Ortalama 48/100. Ama junior bireysel katkıcı ile senior mimar arasında büyük fark var. Kişisel skorunu al.",
  },
  {
    slug: "registered-nurses",
    jobTitle: "Hemşireler",
    metaTitle:
      "Yapay Zeka Hemşirelerin Yerini Alacak mı? Risk Skorun | SkillShield",
    metaDescription:
      "Hemşireler için ortalama yapay zeka risk skoru 23/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.",
    heroHeadline: "Yapay zeka hemşirelerin yerini alacak mı?",
    heroSubhead:
      "Ortalama hemşire yapay zeka kariyer riskinde 23/100 alıyor. Uygulamalı bakım vazgeçilmez. Kayıt tutma değil.",
    riskSummary:
      "Hemşirelik yapay zekaya en dirençli mesleklerden biri. Fiziksel hasta bakımı, duygusal destek ve öngörülemeyen durumlarda klinik yargı yapay zekanın erişim alanının ötesinde. Ancak dokümantasyon, zamanlama ve rutin izleme görevleri giderek daha fazla otomatikleştirilecek.",
    averageScore: 23,
    tasksAtRisk: [
      "Tıbbi kayıt ve dokümantasyon",
      "Rutin yaşam bulgusu izleme",
      "İlaç uygulama zamanlaması",
      "Hasta kaydı veri girişi",
    ],
    tasksSafe: [
      "Fiziksel hasta bakımı ve prosedürler",
      "Acil müdahale ve triaj kararları",
      "Hasta ve aile duygusal desteği",
      "Karmaşık klinik yargı kararları",
      "Disiplinler arası bakım koordinasyonu",
    ],
    verdictHeadline: "Sonuç: Yapay zeka hemşireleri daha verimli yapacak, gereksiz değil.",
    verdictBody:
      "Hemşirelik fiziksel beceri, duygusal zeka ve hızlı klinik yargıyı yapay zekanın kopyalayamadığı şekillerde birleştiriyor. Yapay zekanın evrak işlerini halletmesini bekle, hastalarını değil. En büyük değişiklik: yapay zeka dokümantasyon araçlarını benimseyen hemşireler gerçek bakıma daha fazla zaman ayıracak.",
    ctaHeadline: "Bir hemşire olarak SENİN skorun kaç?",
    ctaSubhead:
      "Ortalama 23/100. Spesifik uzmanlık alanın ve günlük görev karışımın kişisel skorunu etkiler. Öğren.",
  },
  {
    slug: "marketing-managers",
    jobTitle: "Pazarlama Yöneticileri",
    metaTitle:
      "Yapay Zeka Pazarlama Yöneticilerinin Yerini Alacak mı? Risk Skorun | SkillShield",
    metaDescription:
      "Pazarlama yöneticileri için ortalama yapay zeka risk skoru 55/100. Kişiselleştirilmiş skorunu ve görev görev analizini almak için ücretsiz 5 dakikalık testi çöz.",
    heroHeadline: "Yapay zeka pazarlama yöneticilerinin yerini alacak mı?",
    heroSubhead:
      "Ortalama pazarlama yöneticisi yapay zeka kariyer riskinde 55/100 alıyor. İçerik üretimi zaten otomatikleştirildi. Strateji sağlam duruyor.",
    riskSummary:
      "Yapay zeka artık metin yazabilir, görsel üretebilir, kampanya verilerini analiz edebilir, A/B testleri çalıştırabilir ve reklam harcamalarını optimize edebilir — bir pazarlamacının gününün çoğunu dolduran görevler. Ama marka konumlandırma, müşteri içgörüsü, yaratıcı yönetim ve çapraz fonksiyonel liderlik hâlâ insan yargısı gerektiriyor.",
    averageScore: 55,
    tasksAtRisk: [
      "Sosyal medya içerik üretimi",
      "Temel metin yazarlığı (e-postalar, reklam metni, blog yazıları)",
      "Kampanya performans raporlaması",
      "A/B test kurulumu ve analizi",
      "SEO anahtar kelime araştırması ve optimizasyonu",
    ],
    tasksSafe: [
      "Marka stratejisi ve konumlandırma",
      "Müşteri içgörüsü ve persona geliştirme",
      "Yaratıcı kampanya konsepti oluşturma",
      "Paydaş yönetimi ve çapraz fonksiyonel liderlik",
      "Bütçe tahsisi ve stratejik planlama",
    ],
    verdictHeadline: "Sonuç: içerik üreticileri risk altında. Stratejistler değil.",
    verdictBody:
      "En çok risk altındaki pazarlama yöneticileri günlerini içerik üreterek ve rapor çekerek geçirenler. Strateji, müşteri anlayışı ve ekip liderliğine odaklananlar iyi konumda. En akıllı hamle: yapay zekayı yöneten kişi ol, yapay zekanın yerini aldığı kişi değil.",
    ctaHeadline: "Bir pazarlamacı olarak SENİN skorun kaç?",
    ctaSubhead:
      "Ortalama 55/100. Ama içerik odaklı ile strateji odaklı roller çok farklı puan alıyor. Kendininkini gör.",
  },
] as const;

// ─── SEO PAYLAŞILAN ELEMANLAR ─────────────────────────────────
export const seoShared = {
  methodology: {
    headline: "Bu skorları nasıl hesaplıyoruz.",
    body: "Her skor, yayınlanmış yapay zeka yetenek ölçütleriyle çapraz kontrol edilen O*NET görev düzeyinde verilerden türetilir. Her meslek içindeki hangi spesifik görevlerin mevcut yapay zeka sistemleri tarafından yapılabileceğini, çalışanların her göreve ne kadar zaman harcadığına göre ağırlıklandırarak analiz ediyoruz.",
  },
  disclaimerFooter:
    "Skorlar mevcut yapay zeka yetenek örtüşmesini temsil eder, iş kaybı tahmini değil. Gerçek iş yerinden edilme benimseme hızına, düzenlemeye ve ekonomik faktörlere bağlıdır. Üç ayda bir güncellenir.",
  relatedJobs: {
    headline: "İlgili roller için skorları gör.",
  },
  breadcrumb: {
    home: "Ana Sayfa",
    careers: "Kariyer Risk Skorları",
  },
} as const;
