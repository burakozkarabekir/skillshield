/**
 * Quiz Sayfası Metinleri — AdaptAI
 *
 * Duygusal hedef: Katılım + artan yatırım
 * Sorular kişiselleştirilmiş ve içgörülü hissettirmeli, bürokratik değil.
 *
 * 32 soru, her birinde 4–5 cevap seçeneği.
 * Sorular kolay/rahat → daha araştırıcı/düşündürücü şeklinde ilerler.
 */

// ─── QUIZ GİRİŞ ──────────────────────────────────────────
export const quizIntro = {
  headlines: [
    "Gerçek riskini öğrenelim.",
    "32 soru. Sadece dürüst cevaplar.",
    "Gerçeği öğrenmeye hazır mısın?",
  ],
  subheads: [
    "Her cevap gerçek bir yapay zeka yetenek ölçütüyle eşleşiyor. Boş soru yok.",
    "Detaylı cevapla. Ne kadar dürüst olursan, skorun o kadar işe yarar.",
    "Bu yaklaşık 7 dakika sürer. Kariyer netliğin çok daha uzun sürer.",
  ],
} as const;

// ─── İLERLEME GÖSTERGELERİ ─────────────────────────────────
export const progress = {
  labels: [
    (current: number, total: number) => `${current} / ${total}`,
    (current: number, total: number) =>
      `Soru ${current}/${total}`,
    (current: number, total: number) =>
      `%${Math.round((current / total) * 100)} tamamlandı`,
  ],
  encouragement: {
    quarter: "İyi başlangıç. Devam et.",
    halfway: "Yarıya geldin. İlginçleşiyor.",
    threeQuarter: "Neredeyse bitti. Asıl güzel kısmı şimdi geliyor.",
    final: "Son soru. En dürüst cevabını ver.",
  },
} as const;

// ─── SORULAR ───────────────────────────────────────────
export const questions = [
  {
    id: "role-type",
    question: "İşini en iyi ne tanımlar?",
    context: "En yakın olanı seç — mükemmel olmasa da olur.",
    options: [
      { value: "knowledge", label: "Çoğunlukla bilgi analiz edip karar veriyorum" },
      { value: "creative", label: "Çoğunlukla özgün içerik veya tasarım üretiyorum" },
      { value: "technical", label: "Çoğunlukla bir şeyler inşa ediyorum, kodluyorum veya mühendislik yapıyorum" },
      { value: "interpersonal", label: "Çoğunlukla insanları veya müşteri ilişkilerini yönetiyorum" },
      { value: "physical", label: "Çoğunlukla uygulamalı veya fiziksel iş yapıyorum" },
    ],
  },
  {
    id: "daily-tasks",
    question: "Gününün ne kadarı tekrarlayan işlerle geçiyor?",
    context: "E-postalar, veri girişi, planlama, standart raporlar gibi düşün.",
    options: [
      { value: "most", label: "%75'ten fazla — günümün çoğu rutin" },
      { value: "half", label: "Yaklaşık %50 — rutin ve özgün iş karışımı" },
      { value: "some", label: "Yaklaşık %25 — çoğunlukla benzersiz problemler" },
      { value: "rarely", label: "%10'un altı — neredeyse her yaptığım farklı" },
    ],
  },
  {
    id: "data-work",
    question: "Ne sıklıkla veri veya tablolarla çalışıyorsun?",
    context: "Rapor çekmek, sayı analiz etmek, grafik yapmak.",
    options: [
      { value: "daily", label: "Her gün — işimin temelinde bu var" },
      { value: "weekly", label: "Haftada birkaç kez" },
      { value: "monthly", label: "Ara sıra, belki ayda bir" },
      { value: "rarely", label: "Neredeyse hiç" },
    ],
  },
  {
    id: "writing-output",
    question: "İşin ne kadar yazı yazmayı gerektiriyor?",
    context: "E-postalar, raporlar, teklifler, dokümantasyon, metin yazarlığı.",
    options: [
      { value: "heavy", label: "Yazmak benim ana çıktım" },
      { value: "significant", label: "Çok yazıyorum ama asıl işim bu değil" },
      { value: "moderate", label: "Biraz yazı, çoğunlukla kısa iletişimler" },
      { value: "minimal", label: "Çok az — nadiren ciddi bir şey yazarım" },
    ],
  },
  {
    id: "decision-making",
    question: "İşte ne tür kararlar veriyorsun?",
    context: "Geçen hafta verdiğin en zor kararı düşün.",
    options: [
      { value: "strategic", label: "Eksik bilgiyle verilen yüksek riskli kararlar" },
      { value: "judgment", label: "Deneyim ve ince yorum gerektiren kararlar" },
      { value: "rule-based", label: "Belirli politika veya prosedürlere göre verilen kararlar" },
      { value: "execution", label: "Çoğunlukla başkalarının aldığı kararları uyguluyorum" },
    ],
  },
  {
    id: "human-interaction",
    question: "Yüz yüze iletişim rolünde ne kadar kritik?",
    context: "İşin hiç kimseyle yüz yüze görüşmeden yapılabilir mi?",
    options: [
      { value: "essential", label: "Onsuz imkansız — bütün gün insanlarla çalışıyorum" },
      { value: "important", label: "Çok önemli ama her gün değil" },
      { value: "moderate", label: "Faydalı ama işimin çoğunu uzaktan yapabilirim" },
      { value: "minimal", label: "İşimin %95'ini kimseyi görmeden yapabilirim" },
    ],
  },
  {
    id: "tool-adoption",
    question: "İş yerin yeni teknolojiyi ne kadar hızlı benimsiyor?",
    context: "Son büyük araç veya sistem değişikliğini düşün.",
    options: [
      { value: "leading", label: "Genellikle erken benimseyenlerdeniz" },
      { value: "moderate", label: "Kanıtlandıktan sonra benimsiyoruz" },
      { value: "slow", label: "Gerideyiz — hâlâ eski araçlar kullanıyoruz" },
      { value: "resistant", label: "Sektörüm değişime direniyor" },
    ],
  },
  {
    id: "ai-exposure",
    question: "İşte zaten yapay zeka araçları kullanıyor musun?",
    context: "ChatGPT, Copilot, Midjourney veya herhangi bir yapay zeka aracı.",
    options: [
      { value: "daily", label: "Evet, her gün — iş akışımın bir parçası" },
      { value: "experimenting", label: "Birkaç araç denedim, deneme aşamasındayım" },
      { value: "aware", label: "Biliyorum ama işte kullanmadım" },
      { value: "no", label: "Hayır, ve kullanmayı düşünmüyorum" },
    ],
  },
  {
    id: "unique-value",
    question: "İşinin birine anlatması en zor kısmı ne?",
    context: "Genellikle yapay zekanın en çok zorlandığı kısım budur.",
    options: [
      { value: "relationships", label: "İlişki dinamikleri ve ofis politikaları" },
      { value: "intuition", label: "Yılların deneyimiyle oluşan sezgi" },
      { value: "creativity", label: "Yaratıcı sıçramalar ve özgün düşünce" },
      { value: "physical", label: "Gereken fiziksel beceri ve koordinasyon" },
      { value: "nothing", label: "Açıkçası çoğu oldukça basit" },
    ],
  },
  {
    id: "industry",
    question: "Hangi sektördesin?",
    context: "En yakın olanı seç. Bu risk profilini ciddi şekilde etkiler.",
    options: [
      { value: "tech", label: "Teknoloji / Yazılım" },
      { value: "finance", label: "Finans / Bankacılık / Sigortacılık" },
      { value: "healthcare", label: "Sağlık / Tıp" },
      { value: "education", label: "Eğitim / Öğretim" },
      { value: "other", label: "Diğer (perakende, üretim, kamu, vb.)" },
    ],
  },
  {
    id: "experience-level",
    question: "Kaç yıllık deneyimin var?",
    context: "Şu anki alanında, toplam çalışma yılın değil.",
    options: [
      { value: "junior", label: "0–2 yıl" },
      { value: "mid", label: "3–7 yıl" },
      { value: "senior", label: "8–15 yıl" },
      { value: "veteran", label: "15+ yıl" },
    ],
  },
  {
    id: "adaptability",
    question: "Rolün 12 ay içinde kökten değişse, ne kadar hazırsın?",
    context: "Dürüst ol — bu seninle skorun arasında.",
    options: [
      { value: "ready", label: "Buyur gelsin — hızlı uyum sağlarım" },
      { value: "somewhat", label: "Hallederim ama stresli olur" },
      { value: "worried", label: "Ciddi bir eğitim almadan zorlanırım" },
      { value: "stuck", label: "Açıkçası başka ne yapardım bilmiyorum" },
    ],
  },
  {
    id: "remote-work",
    question: "İşinin ne kadarı tamamen uzaktan yapılabilir?",
    context: "Fiziksel varlık gerektirmeyen, sadece bilgisayar başında yapılabilen işleri düşün.",
    options: [
      { value: "all", label: "Tamamı — bilgisayar ve internet yeterli" },
      { value: "most", label: "Büyük kısmı — ara sıra fiziksel ortam gerekiyor" },
      { value: "half", label: "Yaklaşık yarısı — bazı işler yerinde olmalı" },
      { value: "little", label: "Çok azı — işimin çoğu fiziksel ortamda" },
      { value: "none", label: "Hiçbiri — işim tamamen sahada veya yüz yüze" },
    ],
  },
  {
    id: "learning-speed",
    question: "İşin için ne sıklıkla tamamen yeni beceriler öğrenmen gerekiyor?",
    context: "Mevcut bilgini güncellemek değil, sıfırdan yeni bir şey öğrenmek.",
    options: [
      { value: "constantly", label: "Sürekli — her birkaç ayda yeni bir şey öğreniyorum" },
      { value: "often", label: "Sık sık — yılda birkaç kez yeni beceri gerekiyor" },
      { value: "sometimes", label: "Ara sıra — birkaç yılda bir ciddi bir şey öğrenirim" },
      { value: "rarely", label: "Nadiren — yıllar önce öğrendiklerimle idare ediyorum" },
    ],
  },
  {
    id: "ai-replacement",
    question: "Şirketin seni yarın yapay zekayla değiştirse, en çok neyi kaybeder?",
    context: "Gerçekten düşün — seni vazgeçilmez yapan şey ne?",
    options: [
      { value: "relationships", label: "İnsanlarla kurduğum güven ve ilişkileri" },
      { value: "crisis", label: "Beklenmedik sorunlarda sakin kalıp çözüm bulma yeteneğimi" },
      { value: "creativity", label: "Hiç düşünülmemiş fikirlere ve yaratıcı çözümlere ulaşmamı" },
      { value: "context", label: "Yıllardır biriken sektör bilgimi ve bağlam anlayışımı" },
      { value: "nothing", label: "Açıkçası çok da bir şey kaybetmezler" },
    ],
  },
] as const;

// ─── QUIZ TAMAMLANMA / SONUÇLARA GEÇİŞ ─────────────
export const quizComplete = {
  headlines: [
    "Tamam. Verilerini işliyoruz.",
    "Cevaplar kilitlendi. Skor yolda.",
    "Aldık. Riskini hesaplıyoruz.",
  ],
  subheads: [
    "Cevaplarını 1.200'den fazla meslek profiliyle karşılaştırıyoruz.",
    "Yanıtlarını en güncel yapay zeka araştırma verileriyle analiz ediyoruz.",
    "Profilini gerçek iş gücü piyasası verileriyle çapraz kontrol ediyoruz.",
  ],
} as const;
