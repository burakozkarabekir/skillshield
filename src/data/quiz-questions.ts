import { QuizQuestion } from "@/lib/types";

/**
 * Quiz soruları puanlama boyutlarıyla eşleştirilmiş.
 * 15 soru — yaklaşık 3-4 dakika sürer.
 *
 * Puan anlamı: yüksek puan = yapay zeka otomasyonundan DAHA FAZLA risk altında.
 * Her cevabın puanı (0-100) o boyut için risk katkısını temsil eder.
 */
export const quizQuestions: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // BOYUT: taskComposition (ağırlık: 0.30)
  // Araştırma temeli: Frey & Osborne'un darboğaz çerçevesi — rutin bilişsel
  // görevler en çok otomatikleştirilebilir, ardından rutin manuel, sonra rutin olmayan.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tc1",
    dimension: "taskComposition",
    question: "İşte tipik bir günün nasıl geçiyor?",
    helpText: "En çok zaman harcadığın görevleri düşün.",
    answers: [
      {
        id: "tc1-a",
        text: "Çoğunlukla bilgi işleme — veri girişi, dosyalama, sıralama veya biçimlendirme",
        score: 90,
        reasoning:
          "Rutin bilgi işleme, yapay zekanın otomatikleştirdiği 1 numaralı kategori. LLM'ler ve RPA, veri girişi, sınıflandırma ve biçimlendirmeyi yüksek doğrulukla yapabiliyor.",
      },
      {
        id: "tc1-b",
        text: "Veri analiz etmek, rapor yazmak veya kurallara göre karar vermek",
        score: 70,
        reasoning:
          "Kural tabanlı analiz ve rapor üretimi giderek yapay zeka tarafından yapılıyor. GPT-4 gibi araçlar zaten rapor taslağı hazırlayıp karar ağaçları uygulayabiliyor.",
      },
      {
        id: "tc1-c",
        text: "Masa başı iş ile doğrudan insanlarla veya fiziksel görevlerle çalışmanın karışımı",
        score: 45,
        reasoning:
          "Hibrit roller kısmi otomasyon riski taşır. Masa başı kısım risk altında, ama yüz yüze bileşen bir miktar savunulabilirlik sağlıyor.",
      },
      {
        id: "tc1-d",
        text: "Çoğunlukla yaratıcı iş, strateji veya yeni problemler çözmek",
        score: 20,
        reasoning:
          "Yaratıcı ve stratejik iş yapay zeka için hâlâ zor. Yapay zeka yardımcı olabilir, ama özgün fikirlerin sentezi ve stratejik yargı hâlâ insan bilişi gerektiriyor.",
      },
    ],
  },
  {
    id: "tc2",
    dimension: "taskComposition",
    question:
      "İşini biri detaylı bir talimat kılavuzunu takip ederek ne sıklıkla yapabilir?",
    helpText:
      "İşin net adımları takip ediyorsa daha rutindir. Her gün farklıysa daha az rutindir.",
    answers: [
      {
        id: "tc2-a",
        text: "Neredeyse her zaman — işim net, tekrarlanabilir adımları takip ediyor",
        score: 90,
        reasoning:
          "Son derece prosedürel iş, otomasyon için birinci sınıf alan. Adım adım belgelenebiliyorsa, kodlanabilir veya yapay zekaya öğretilebilir.",
      },
      {
        id: "tc2-b",
        text: "Sıklıkla, ama yol boyunca yargı kararları vermem gerekiyor",
        score: 60,
        reasoning:
          "Yarı yapılandırılmış iş kısmen otomatikleştirilebilir. Yapay zeka rutin kısımları halledebilir, ama senin yargı kararların değer katıyor — şimdilik.",
      },
      {
        id: "tc2-c",
        text: "Bazen — her proje biraz farklı",
        score: 35,
        reasoning:
          "Benzersiz projelerle değişken iş otomatikleştirmesi daha zor. Yapay zeka kalıplar tekrarlandığında en iyi çalışır; yenilik bir savunma hattı oluşturur.",
      },
      {
        id: "tc2-d",
        text: "Nadiren — işim sürekli doğaçlama ve adaptasyon gerektiriyor",
        score: 10,
        reasoning:
          "Doğaçlama ve bağlamsal adaptasyon yapay zeka için en zor görevler arasında. Bu, Frey & Osborne'un 'rutin olmayan bilişsel' kategorisine giriyor.",
      },
    ],
  },
  {
    id: "tc3",
    dimension: "taskComposition",
    question: "Ürettiğin çıktının ne kadarı bir şablon veya algoritma ile oluşturulabilir?",
    helpText: "Raporlar, e-postalar, tasarımlar, kod — düzenli olarak ürettiğin her şeyi düşün.",
    answers: [
      {
        id: "tc3-a",
        text: "Büyük kısmı — çıktılarımın çoğu belirli kalıpları takip ediyor",
        score: 85,
        reasoning:
          "Şablona dayalı çıktılar yapay zeka için en kolay hedef. Kalıp tekrarlanıyorsa, yapay zeka bunu öğrenip hızla üretebilir.",
      },
      {
        id: "tc3-b",
        text: "Yarısına yakını — bazı işler kalıplı, bazıları özgün düşünce gerektiriyor",
        score: 55,
        reasoning:
          "Karışık çıktı profili orta düzey risk taşır. Kalıplı kısımlar otomatikleştirilebilir, özgün kısımlar savunulabilir.",
      },
      {
        id: "tc3-c",
        text: "Çok azı — çoğu iş duruma özel ve benzersiz",
        score: 25,
        reasoning:
          "Duruma özel çıktılar yapay zeka için zordur çünkü her seferinde farklı bağlam ve yaklaşım gerektirir.",
      },
      {
        id: "tc3-d",
        text: "Neredeyse hiçbiri — her ürettiğim şey sıfırdan ve tamamen özgün",
        score: 10,
        reasoning:
          "Tamamen özgün üretim yapay zekanın en çok zorlandığı alan. İnsan yaratıcılığı ve bağlam anlayışı hâlâ vazgeçilmez.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOYUT: skillReplaceability (ağırlık: 0.25)
  // Araştırma temeli: O*NET görev çözümlemeleri + gerçek dünya yapay zeka
  // yetenekleri değerlendirmesi.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "sr1",
    dimension: "skillReplaceability",
    question: "En önemli iş becerini hangisi en iyi tanımlıyor?",
    helpText:
      "İşten ayrılsan yerine konması en zor olacak tek beceriyi seç.",
    answers: [
      {
        id: "sr1-a",
        text: "Yazmak, özetlemek veya bilgiyi açık şekilde iletmek",
        score: 75,
        reasoning:
          "LLM'ler artık çoğu iş bağlamında insan kalitesinde yazı üretiyor. Özetleme, e-posta taslağı ve içerik oluşturma yapay zekanın güçlü yanları.",
      },
      {
        id: "sr1-b",
        text: "İlişki kurmak, müzakere etmek veya insanları ikna etmek",
        score: 20,
        reasoning:
          "Kişilerarası etki duygusal zeka, güven ve anlık sosyal kalibrasyon gerektirir. Yapay zeka gerçek iletişim kurma veya yüksek riskli ortamlarda müzakere yapma yeteneğine sahip değil.",
      },
      {
        id: "sr1-c",
        text: "Teknik uzmanlık — kodlama, mühendislik, özel ekipman kullanımı",
        score: 55,
        reasoning:
          "Yapay zeka kodlama asistanları hızla ilerliyor (Copilot, Cursor), ama karmaşık sistem tasarımı, yeni sorunların çözümü ve fiziksel ekipman kullanımı hâlâ insan gerektiriyor.",
      },
      {
        id: "sr1-d",
        text: "İnsan yönetimi, çatışma çözme veya takım koçluğu",
        score: 15,
        reasoning:
          "İnsan yönetimi derinden insani bir beceri. Takım dinamiklerini okumak, organizasyonel politikalarda yol almak ve koçluk yapmak empati ve bağlamsal anlayış gerektiriyor.",
      },
    ],
  },
  {
    id: "sr2",
    dimension: "skillReplaceability",
    question:
      "Bir yapay zeka aracı işinin bir bölümünün %80'ini yapabilse, hangi bölüm olurdu?",
    helpText:
      "Dürüst ol — bu, yapay zekanın işine en yakın olduğu noktayı belirlememize yardımcı olur.",
    answers: [
      {
        id: "sr2-a",
        text: "Bilgi araştırmak veya olgusal soruları yanıtlamak",
        score: 85,
        reasoning:
          "Yapay zeka araştırma ve olgusal soru-cevabı neredeyse insan seviyesinde hallediyor. RAG sistemleri ve arama destekli LLM'ler araştırma analisti görevlerinin yerini alıyor.",
      },
      {
        id: "sr2-b",
        text: "İlk taslaklar oluşturmak — belgeler, kod, tasarımlar veya planlar",
        score: 70,
        reasoning:
          "Yapay zeka metin, kod ve görsel tasarım genelinde ilk taslak üretiminde mükemmel. Değer, üretimden küratörlük ve iyileştirmeye kayıyor.",
      },
      {
        id: "sr2-c",
        text: "Zamanlama, koordinasyon veya lojistik organizasyonu",
        score: 65,
        reasoning:
          "Yapay zeka zamanlama ve koordinasyon araçları hızla olgunlaşıyor. Rutin lojistik otomatikleştirilebilir, ancak karmaşık çok paydaşlı koordinasyon hâlâ insan gerektiriyor.",
      },
      {
        id: "sr2-d",
        text: "Açıkçası hiçbiri — işim fiziksel olarak orada olmayı veya insanları okumayı gerektiriyor",
        score: 10,
        reasoning:
          "Fiziksel varlık ve anlık insan okuma yapay zekaya karşı en güçlü savunma hatları. Robotik, yazılım yapay zekasının onlarca yıl gerisinde.",
      },
    ],
  },
  {
    id: "sr3",
    dimension: "skillReplaceability",
    question: "Bir yapay zeka aracı en kritik günlük görevini ne kadar hızlı öğrenebilir?",
    helpText: "Günlük en çok vakit harcadığın ve en kritik olan görevi düşün.",
    answers: [
      {
        id: "sr3-a",
        text: "Hemen — zaten yapay zeka araçları bu görevi yapabiliyor",
        score: 90,
        reasoning:
          "Yapay zekanın zaten yapabildiği görevler en yüksek risk kategorisinde. Bu görev için insan avantajı neredeyse sıfır.",
      },
      {
        id: "sr3-b",
        text: "Birkaç ay içinde — yeterli veriyle öğrenebilir",
        score: 65,
        reasoning:
          "Veriyle öğrenilebilir görevler orta-yüksek risk taşır. Yapay zeka bu alanda hızla ilerliyor.",
      },
      {
        id: "sr3-c",
        text: "Yıllar sürer — çok fazla bağlam ve deneyim gerektirir",
        score: 30,
        reasoning:
          "Derin bağlam ve deneyim gerektiren görevler yapay zeka için hâlâ çok zor. Bu tür zımni bilgi güçlü bir savunma hattı.",
      },
      {
        id: "sr3-d",
        text: "Asla — görevim fiziksel beceri veya anlık insan yargısı gerektiriyor",
        score: 10,
        reasoning:
          "Fiziksel beceri ve anlık insan yargısı gerektiren görevler yapay zekanın en uzak olduğu alan. Bu güçlü bir kariyer kalkanı.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOYUT: industryVelocity (ağırlık: 0.20)
  // Araştırma temeli: McKinsey sektör benimseme eğrileri + Goldman Sachs
  // sektör düzeyinde otomasyon maruziyeti tahminleri.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "iv1",
    dimension: "industryVelocity",
    question: "Hangi sektörde çalışıyorsun?",
    helpText: "En yakın eşleşmeyi seç. Bu, yapay zekanın alanına ne kadar hızlı girdiğini etkiler.",
    answers: [
      {
        id: "iv1-a",
        text: "Teknoloji, finans veya profesyonel hizmetler (danışmanlık, hukuk, muhasebe)",
        score: 80,
        reasoning:
          "Bu sektörler yapay zekayı ilk benimseyen sektörler. Goldman Sachs, finans görevlerinin %46'sının ve hukuk görevlerinin %44'ünün otomasyona açık olduğunu tahmin ediyor.",
      },
      {
        id: "iv1-b",
        text: "Medya, pazarlama, perakende veya müşteri hizmetleri",
        score: 70,
        reasoning:
          "İçerik üretimi, reklam hedefleme ve müşteri hizmetleri hızla yapay zeka destekli hale geliyor. McKinsey, perakende operasyonlarında %50'den fazla görev otomasyon potansiyeli tahmin ediyor.",
      },
      {
        id: "iv1-c",
        text: "Sağlık, eğitim veya kamu sektörü",
        score: 40,
        reasoning:
          "Bu sektörler düzenleme, gizlilik endişeleri ve kurumsal atalet nedeniyle yapay zekayı yavaş benimsiyor. Maruziyet var ama zaman çizelgeleri daha uzun.",
      },
      {
        id: "iv1-d",
        text: "İnşaat, üretim, zanaat veya tarım",
        score: 30,
        reasoning:
          "Fiziksel sektörlerde kısa vadeli yapay zeka riski daha düşük. Robotik, yazılım yapay zekasının gerisinde. Ana maruziyet planlama/lojistikte, temel fiziksel işte değil.",
      },
    ],
  },
  {
    id: "iv2",
    dimension: "industryVelocity",
    question: "İş yerinde yapay zeka şu anda nasıl kullanılıyor?",
    helpText: "Şirketinin benimsediği veya pilot uyguladığı araçları düşün.",
    answers: [
      {
        id: "iv2-a",
        text: "Yapay zeka araçları zaten insanların yaptığı görevlerin yerini alıyor",
        score: 90,
        reasoning:
          "İş yerin zaten rolleri otomatikleştiriyorsa, yüksek hızlı bir ortamdasın. 'Pilot'tan 'üretim' yapay zekasına geçiş devam ediyor.",
      },
      {
        id: "iv2-b",
        text: "Yapay zeka araçlarını yardımcı olarak kullanıyoruz, ama asıl işi hâlâ insanlar yapıyor",
        score: 55,
        reasoning:
          "Yapay zeka destekli iş akışları ilerici şirketlerde mevcut norm. Bu bir geçiş aşaması — bugünün asistanı yarının basit görevler için ikamesi olur.",
      },
      {
        id: "iv2-c",
        text: "Yapay zeka hakkında konuşmalar var, ama henüz gerçekten bir şey benimsemedik",
        score: 35,
        reasoning:
          "Düşük mevcut benimseme düşük gelecek riski anlamına gelmiyor — sektörünüz henüz kırılma noktasına ulaşmamış olabilir. Ama yeniden beceri kazanmak için zaman kazandırır.",
      },
      {
        id: "iv2-d",
        text: "Yapay zeka yaptığımız işle gerçekten ilgili değil",
        score: 15,
        reasoning:
          "Bazı roller gerçekten düşük yapay zeka maruziyetine sahip. Ama dikkat: 2022'de ChatGPT manzarayı değiştirmeden önce birçok kişi işi hakkında bunu söylüyordu.",
      },
    ],
  },
  {
    id: "iv3",
    dimension: "industryVelocity",
    question: "Sektörünü hedefleyen kaç yapay zeka girişimi veya aracı var?",
    helpText: "LinkedIn, TechCrunch veya sektör haberlerinde gördüklerini düşün.",
    answers: [
      {
        id: "iv3-a",
        text: "Çok fazla — her gün yeni bir yapay zeka aracı çıkıyor sektörümüzde",
        score: 85,
        reasoning:
          "Yoğun yapay zeka girişim aktivitesi, sektörünün yatırımcılar tarafından otomasyona açık görüldüğünün güçlü bir sinyali.",
      },
      {
        id: "iv3-b",
        text: "Birkaç tane — belirli niş alanlarda yapay zeka çözümleri var",
        score: 55,
        reasoning:
          "Niş yapay zeka çözümleri sektörün belirli kısımlarının risk altında olduğunu gösterir. Tüm sektör değil ama belirli görevler hedefleniyor.",
      },
      {
        id: "iv3-c",
        text: "Çok az — sektörümüzde yapay zeka henüz yaygın değil",
        score: 30,
        reasoning:
          "Düşük yapay zeka girişim aktivitesi kısa vadede nefes alma alanı sağlar, ama sektörler arası yayılma hızlanıyor.",
      },
      {
        id: "iv3-d",
        text: "Bilmiyorum — bu konuyu takip etmiyorum",
        score: 50,
        reasoning:
          "Sektöründeki yapay zeka gelişmelerini takip etmemek başlı başına bir risk. Bilgi, en iyi savunma hattı.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOYUT: experienceMoat (ağırlık: 0.10)
  // Araştırma temeli: Brookings Institution analizi — deneyimin zımni bilgi
  // ve kurumsal bağlam yoluyla savunulabilirlik yarattığını gösteriyor.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "em1",
    dimension: "experienceMoat",
    question: "Yeni birini işini iyi yapacak şekilde eğitmek ne kadar sürer?",
    helpText:
      "Biriktirdiğin tüm bağlam, ilişkiler ve bilgi birikimini düşün.",
    answers: [
      {
        id: "em1-a",
        text: "Birkaç hafta — sistemleri öğrenince oldukça basit",
        score: 85,
        reasoning:
          "Düşük eğitim süresi = düşük değiştirme engeli, ister insan ister yapay zeka tarafından. Hızlı öğrenilebilen işler hızlı otomatikleştirilebilir.",
      },
      {
        id: "em1-b",
        text: "Birkaç ay — gerçek bir öğrenme eğrisi var",
        score: 55,
        reasoning:
          "Orta düzey karmaşıklık bir miktar savunulabilirlik yaratır. Öğrenme eğrisi, yapay zekanın kopyalamakta zorlandığı zımni bilgiyi işaret eder.",
      },
      {
        id: "em1-c",
        text: "Bir yıl veya daha fazla — derin uzmanlık ve ilişki kurma gerektirir",
        score: 25,
        reasoning:
          "Derin uzmanlık ve ilişki sermayesi güçlü savunma hatları. Bu düzeyde zımni bilgi ve kurumsal bağlamı otomatikleştirmek çok zor.",
      },
      {
        id: "em1-d",
        text: "Yıllar — rolüm nadir yetkinlikler, kapsamlı eğitim veya derin kurumsal bilgi gerektiriyor",
        score: 10,
        reasoning:
          "Nadir uzmanlık + yetkinlikler + derin kurumsal bilgi en güçlü savunma hattı. Yapay zeka yardımcı olsa bile, insan kısa vadede vazgeçilmez.",
      },
    ],
  },
  {
    id: "em2",
    dimension: "experienceMoat",
    question: "İşinin ne kadarı sadece yıllarca yaparak öğrenebileceğin şeylere bağlı?",
    helpText:
      "Zımni bilgi — Google'layamayacağın şeyler — senin rekabet avantajın.",
    answers: [
      {
        id: "em2-a",
        text: "Çok azı — ihtiyacım olan çoğu şey dokümantasyonda veya eğitim materyallerinde mevcut",
        score: 80,
        reasoning:
          "İş bilgin belgelenmişse, öğretilebilir — hem insanlar hem yapay zeka için. LLM'ler belgelenmiş prosedürlerden öğrenmekte mükemmel.",
      },
      {
        id: "em2-b",
        text: "Bir kısmı — yardımcı olan sezgiler geliştirdim, ama temeller öğretilebilir",
        score: 50,
        reasoning:
          "Deneyimden gelen sezgi kısmen savunulabilir. Yapay zeka kalıpları öğrenebilir ama deneyimin öğrettiği uç vakaları halletmekte zorlanır.",
      },
      {
        id: "em2-c",
        text: "Büyük kısmı — yıllar içinde oluşan yargı, kalıp tanıma ve ilişkilere çok bağımlıyım",
        score: 20,
        reasoning:
          "Derin zımni bilgi güçlü bir savunma hattı. Yılların deneyiminden gelen kalıp tanıma, özellikle ilişki sermayesiyle birleştiğinde, otomatikleştirmesi çok zor.",
      },
      {
        id: "em2-d",
        text: "Neredeyse her şey — değerim on yılların birikmiş uzmanlığından ve ağlarından geliyor",
        score: 5,
        reasoning:
          "On yılların alan uzmanlığı artı ağlar, otomasyon direnci için altın standart. Hiçbir mevcut yapay zeka bu derinlikteki kurumsal bilgiyi kopyalayamaz.",
      },
    ],
  },
  {
    id: "em3",
    dimension: "experienceMoat",
    question: "Değerinin ne kadarı profesyonel ağından ve ilişkilerinden geliyor?",
    helpText: "Tanıdığın insanlar, güvenilirliğin ve sektördeki itibarını düşün.",
    answers: [
      {
        id: "em3-a",
        text: "Çok azı — işim tamamen bireysel becerilerime bağlı",
        score: 75,
        reasoning:
          "Bireysel becerilere bağımlılık yapay zeka tarafından daha kolay ikame edilebilir. Ağ ve ilişkiler yapay zekanın kopyalayamadığı insani bir avantaj.",
      },
      {
        id: "em3-b",
        text: "Bir kısmı — tanıdıklarım işimi kolaylaştırıyor ama zorunlu değil",
        score: 50,
        reasoning:
          "Kısmi ağ bağımlılığı orta düzey savunulabilirlik sağlar. İlişkiler yardımcı ama olmasa da iş yapılabilir.",
      },
      {
        id: "em3-c",
        text: "Büyük kısmı — doğru insanları tanımak işimin temel parçası",
        score: 20,
        reasoning:
          "Güçlü profesyonel ağ yapay zekaya karşı çok savunulabilir. İlişki sermayesi dijital ortamda kopyalanamaz.",
      },
      {
        id: "em3-d",
        text: "Neredeyse tamamı — başarım tamamen ilişkilerime ve itibarıma bağlı",
        score: 5,
        reasoning:
          "İlişki ve itibar temelli kariyer yapay zekaya karşı en güçlü savunma. Güven ve kişisel marka otomatikleştirilemez.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOYUT: humanInteraction (ağırlık: 0.15)
  // Araştırma temeli: WEF Future of Jobs 2025 — empati, fiziksel varlık
  // veya ahlaki yargı gerektiren işler en az otomatikleştirilebilir.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hi1",
    dimension: "humanInteraction",
    question:
      "İşinin ne kadarı insanlarla yüz yüze olmayı gerektiriyor (veya uzaktan yapılsa zarar görür)?",
    helpText:
      "Fiziksel varlık, beden dili ve yüz yüze güven yapay zeka direnci yaratır.",
    answers: [
      {
        id: "hi1-a",
        text: "Neredeyse hiç — tüm işimi bir dizüstü bilgisayarla her yerden yapabilirim",
        score: 80,
        reasoning:
          "Tamamen uzaktan yapılabilen iş daha otomatikleştirilebilir çünkü zaten dijitalleşmiş. İşin bir ekran üzerinden akıyorsa, yapay zeka da aynı ekran üzerinden yapmayı öğrenebilir.",
      },
      {
        id: "hi1-b",
        text: "Biraz — bazı toplantılar veya aktiviteler yüz yüze olmaktan fayda görür",
        score: 50,
        reasoning:
          "Kısmi yüz yüze gereksinim orta düzey savunulabilirlik yaratır. Uzaktan yapılan kısımlar risk altında, ama yüz yüze unsurlar insani değer katıyor.",
      },
      {
        id: "hi1-c",
        text: "Çok — fiziksel olarak bir yerde olmam, malzeme kullanmam veya ellerimle çalışmam gerekiyor",
        score: 20,
        reasoning:
          "Fiziksel iş güçlü bir savunma hattı yaratır. Yapay zeka öncelikle yazılımda var; robotik çok daha az olgun ve dağıtılması çok daha pahalı.",
      },
      {
        id: "hi1-d",
        text: "Temelde tamamı — işim İNSAN etkileşiminin kendisi (terapi, öğretmenlik, bakım vb.)",
        score: 10,
        reasoning:
          "Saf insan etkileşimi rolleri yapay zekaya en dirençli olanlar. Yüksek riskli insan bağlamlarında empati, ahlaki yargı ve güven yapay zeka tarafından kopyalanamaz.",
      },
    ],
  },
  {
    id: "hi2",
    dimension: "humanInteraction",
    question:
      "İşin ne sıklıkla net bir doğru cevabın olmadığı kararlar almayı gerektiriyor?",
    helpText:
      "Etik ikilemler, eksik bilgiyle verilen yargı kararları veya çatışan çıkarları tartmak.",
    answers: [
      {
        id: "hi2-a",
        text: "Nadiren — çoğu kararın net kriterleri veya standart prosedürleri var",
        score: 80,
        reasoning:
          "Net kriterleri olan kararlar otomatikleştirilebilir. Yapay zeka kuralları tutarlı uygulamada mükemmel — iyi tanımlanmış karar çerçeveleri için çoğu zaman insanlardan bile daha iyi.",
      },
      {
        id: "hi2-b",
        text: "Bazen — yargı kararları veririm, ama yapılandırılmış bir çerçeve içinde",
        score: 50,
        reasoning:
          "Yapılandırılmış yargı kararları 'yapay zeka desteği' bölgesinde. Yapay zeka çerçeveye yardımcı olabilir, ama yargı kararının kendisi hâlâ değerli.",
      },
      {
        id: "hi2-c",
        text: "Sıklıkla — belirsizlik ve çatışan paydaş çıkarlarıyla düzenli olarak uğraşıyorum",
        score: 25,
        reasoning:
          "Belirsizlikte yol almak ve paydaş politikalarını yönetmek sosyal zeka ve bağlamsal yargı gerektiriyor — yapay zekanın sürekli zorlandığı alanlar.",
      },
      {
        id: "hi2-d",
        text: "Sürekli — tüm rolüm gri alanlar ve insan karmaşıklığında yol almakla ilgili",
        score: 5,
        reasoning:
          "Ahlaki muhakeme, etik yargı ve insan karmaşıklığıyla tanımlanan roller, otomatikleştirilecek son roller arasında — eğer olursa.",
      },
    ],
  },
  {
    id: "hi3",
    dimension: "humanInteraction",
    question: "İşte ne sıklıkla duyguları veya beden dilini okumanız gerekiyor?",
    helpText: "Toplantılarda, müşteri görüşmelerinde veya ekip çalışmasında düşün.",
    answers: [
      {
        id: "hi3-a",
        text: "Neredeyse hiç — işim çoğunlukla veri, sistemler veya süreçlerle ilgili",
        score: 80,
        reasoning:
          "Veri ve sistem odaklı iş duygusal okuma gerektirmediğinde yapay zeka için daha erişilebilir. Dijital görevler otomasyona daha açık.",
      },
      {
        id: "hi3-b",
        text: "Ara sıra — bazı durumlarda insanların ne hissettiğini anlamam önemli",
        score: 50,
        reasoning:
          "Kısmi duygusal okuma gereksinimi orta düzey savunulabilirlik sağlar. Bu beceri yapay zekanın zayıf olduğu bir alan.",
      },
      {
        id: "hi3-c",
        text: "Sıklıkla — müzakerelerde, satışta veya ekip yönetiminde sürekli okurum",
        score: 20,
        reasoning:
          "Sık duygusal okuma güçlü bir insani avantaj. Müzakere ve liderlik bağlamında bu beceri yapay zeka tarafından kopyalanamaz.",
      },
      {
        id: "hi3-d",
        text: "Sürekli — işim tamamen insanları anlamak ve duygusal destek vermekle ilgili",
        score: 5,
        reasoning:
          "Sürekli duygusal okuma ve destek en güçlü yapay zeka direnci. Terapi, koçluk ve bakım gibi roller en son otomatikleştirilecek.",
      },
    ],
  },
];
