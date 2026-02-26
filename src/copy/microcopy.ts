/**
 * Mikro Metinler — Yükleniyor, Hata ve Boş Durumlar — AdaptAI
 *
 * Kullanıcının karşılaştığı her durum kasıtlı,
 * marka uyumlu ve insani hissettirmeli. Hata mesajları bile.
 */

// ─── YÜKLEME DURUMLARI ──────────────────────────────────
export const loading = {
  quizLoading: [
    "Soruların yükleniyor...",
    "Değerlendirmen hazırlanıyor...",
    "Her şey hazırlanıyor...",
  ],
  scoreCalculating: [
    "1.200'den fazla veri noktası işleniyor...",
    "Profilin çapraz kontrol ediliyor...",
    "Yanıtların gerçek işgücü verileriyle analiz ediliyor...",
  ],
  scoreCalculatingSequence: [
    "Görevlerin yapay zeka yetenek ölçütleriyle eşleştiriliyor...",
    "1.200'den fazla meslek profiliyle karşılaştırılıyor...",
    "Görev görev risk analizin hesaplanıyor...",
    "Çalışma İstatistikleri Bürosu verileriyle çapraz kontrol ediliyor...",
    "Kişiselleştirilmiş içgörülerin üretiliyor...",
    "Neredeyse tamam...",
  ],
  resultsLoading: [
    "Analizin hazırlanıyor...",
    "Sonuçların hazırlanıyor...",
    "Raporun üretiliyor...",
  ],
  shareCardGenerating: [
    "Paylaşım kartın oluşturuluyor...",
    "Sonuç kartın hazırlanıyor...",
    "Paylaşılabilir skorun üretiliyor...",
  ],
  premiumLoading: [
    "Kişiselleştirilmiş raporun hazırlanıyor...",
    "Detaylı analizin üretiliyor...",
    "PDF raporun oluşturuluyor...",
  ],
  generic: [
    "Üzerinde çalışıyoruz...",
    "Bir saniye...",
    "Neredeyse tamam...",
  ],
} as const;

// ─── HATA DURUMLARI ────────────────────────────────────
export const errors = {
  generic: {
    headlines: [
      "Bir şey bozuldu.",
      "Bu işe yaramadı.",
      "Bir sorunla karşılaştık.",
    ],
    body: [
      "Senin hatan değil. Sayfayı yenilemeyi dene.",
      "Bizim tarafımızda bir şeyler ters gitti. Yenileme genellikle düzeltir.",
      "Bir hatayla karşılaştık. Sayfayı yenile ve tekrar dene.",
    ],
    cta: "Sayfayı yenile",
  },
  quizSubmitFailed: {
    headlines: [
      "Cevapların gönderilemedi.",
      "Gönderme başarısız.",
      "Cevaplarını kaydedemedik.",
    ],
    body: [
      "Cevapların hâlâ burada. Tekrar gönder butonuna bas.",
      "Bağlantı sorunu. Merak etme — hiçbir şey kaybolmadı. Tekrar göndermeyi dene.",
      "Gönderme sırasında bir şeyler ters gitti. Cevapların güvende. Bir kez daha dene.",
    ],
    cta: "Tekrar dene",
  },
  scoreCalculationFailed: {
    headlines: [
      "Skor hesaplama başarısız.",
      "Skorunu üretememiz.",
      "Sonuçlarında bir sorun oldu.",
    ],
    body: [
      "Cevapların kaydedildi. Skorunu tekrar hesaplamayı deneyeceğiz.",
      "Puanlama motoru bir sorunla karşılaştı. Şimdi tekrar deniyoruz — cevapların güvende.",
      "Sonuçlarını üretmekte sorun yaşıyoruz. Biraz bekle.",
    ],
    cta: "Hesaplamayı tekrarla",
  },
  emailSubmitFailed: {
    headlines: [
      "E-posta gönderilemedi.",
      "E-postanı kaydedemedik.",
      "E-posta kaydı başarısız.",
    ],
    body: [
      "Adresi kontrol edip tekrar dene.",
      "E-postanı bir daha kontrol et ve tekrar dene.",
      "Bir şeyler ters gitti. E-postanın doğru olduğundan emin ol ve tekrar dene.",
    ],
    cta: "Tekrar dene",
  },
  paymentFailed: {
    headlines: [
      "Ödeme gerçekleşmedi.",
      "İşlem başarısız.",
      "Ödemeni işleyemedik.",
    ],
    body: [
      "Kart bilgilerini kontrol edip tekrar dene. İki kez ücret alınmaz.",
      "Kartın reddedildi. Farklı bir ödeme yöntemi dene.",
      "Ödemede bir sorun oldu. Ücret alınmadı. Tekrar dene.",
    ],
    cta: "Ödemeyi tekrarla",
  },
  networkError: {
    headlines: [
      "Çevrimdışı görünüyorsun.",
      "Bağlantı algılanamadı.",
      "Sunucularımıza ulaşamıyoruz.",
    ],
    body: [
      "İnternet bağlantını kontrol edip tekrar dene.",
      "Şu anda bağlanamıyoruz. Çevrimiçi olduğundan emin ol ve yenile.",
      "Bağlantı sorunu gibi görünüyor. Tekrar çevrimiçi olduğunda deneyeceğiz.",
    ],
    cta: "Bağlantıyı tekrarla",
  },
  notFound: {
    headlines: [
      "Sayfa bulunamadı.",
      "Bu sayfa mevcut değil.",
      "Burada hiçbir şey yok.",
    ],
    body: [
      "Aradığın sayfa taşınmış veya silinmiş.",
      "Bu URL bir yere götürmüyor. Ana sayfaya geri dön.",
      "Aradığın her neyse, burada değil. Baştan başlamayı dene.",
    ],
    cta: "Ana sayfaya git",
  },
  rateLimit: {
    headlines: [
      "Biraz yavaşla.",
      "Çok fazla istek.",
      "Bize bir saniye ver.",
    ],
    body: [
      "Sunucularımızdan daha hızlı hareket ediyorsun. Bir an bekle ve tekrar dene.",
      "Aynı anda çok fazla istek aldık. Bir nefes al ve birkaç saniye sonra tekrar dene.",
      "Sunucularımızın bir anlık nefes alması gerekiyor. 30 saniye sonra tekrar dene.",
    ],
    cta: "Bekle ve tekrar dene",
  },
} as const;

// ─── BOŞ DURUMLAR ────────────────────────────────────
export const empty = {
  noResults: {
    headlines: [
      "Henüz sonuç yok.",
      "Burada gösterecek bir şey yok.",
      "Sonuçların seni bekliyor.",
    ],
    body: [
      "Yapay Zeka Kariyer Risk Skorunu görmek için önce testi çöz.",
      "Kişiselleştirilmiş risk analizini almak için değerlendirmeyi tamamla.",
      "7 dakikalık testle başla. Skorun burada görünecek.",
    ],
    cta: "Testi çöz",
  },
  noSavedScores: {
    headlines: [
      "Kayıtlı skor yok.",
      "Skor geçmişin boş.",
      "Henüz takip edilen bir şey yok.",
    ],
    body: [
      "Testi çöz ve skorunu zaman içinde takip etmeye başlamak için e-postanı gir.",
      "Değerlendirmeyi tamamladığında, skor geçmişin burada görünecek.",
      "İlk skorunu görmek için testi tamamla.",
    ],
    cta: "İlk skorunu al",
  },
  noPremiumPlan: {
    headlines: [
      "Henüz detaylı rapor yok.",
      "Raporun seni bekliyor.",
      "Rapor üretilmedi.",
    ],
    body: [
      "Detaylı skor raporu, kişiselleştirilmiş öneriler ve PDF kariyer raporunu almak için AdaptAI Pro'ya yükselt.",
      "Ücretsiz skorun riski gösteriyor. Pro rapor çözüm yolunu gösteriyor.",
      "Detaylı raporunu aç ve bugün riskini azaltmaya başla.",
    ],
    cta: "Raporumu al",
  },
} as const;

// ─── FORM DOĞRULAMA ─────────────────────────────────
export const validation = {
  emailRequired: "Güncellemeleri göndermek için e-postana ihtiyacımız var.",
  emailInvalid: "Bu geçerli bir e-posta gibi görünmüyor.",
  questionRequired: "Devam etmek için birini seç.",
  quizIncomplete: "Cevaplanmamış soruların var. Bulmak için yukarı kaydır.",
  genericRequired: "Bu alan zorunlu.",
} as const;

// ─── NAVİGASYON & ARAYÜZ ETİKETLERİ ──────────────────────────
export const nav = {
  quizButton: "Testi Çöz",
  homeLink: "AdaptAI",
  backToResults: "Sonuçlarıma dön",
  nextQuestion: "İleri",
  previousQuestion: "Geri",
  submitQuiz: "Skorumu gör",
  skipForNow: "Şimdilik geç",
  learnMore: "Daha fazla bilgi",
  viewBreakdown: "Tam analizi gör",
  startOver: "Testi tekrar çöz",
} as const;

// ─── ERİŞİLEBİLİRLİK / EKRAN OKUYUCU METNİ ──────────────────
export const a11y = {
  scoreAnnouncement: (score: number) =>
    `Yapay Zeka Kariyer Risk Skorun 100 üzerinden ${score}.`,
  progressAnnouncement: (current: number, total: number) =>
    `${total} sorudan ${current}. soru.`,
  loadingAnnouncement: "Skorun hesaplanıyor. Lütfen bekle.",
  errorAnnouncement: "Bir hata oluştu. Lütfen ekrandaki mesajı kontrol et.",
  chartLabel: "Görev görev risk analizi grafiği",
  skillChartLabel: "Koruma değerine göre sıralanmış beceriler",
} as const;
