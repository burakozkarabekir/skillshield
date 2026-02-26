/**
 * Meslek kategorisi bazli AI arac onerileri ve ucretsiz kaynaklar.
 *
 * Her 16 meslek kategorisi icin 4-6 arac onerisi + 3-4 ucretsiz kaynak.
 * Toplam ~70 arac, ~50 ucretsiz kaynak.
 */

export interface ToolRecommendation {
  name: string;
  category: "ai-assistant" | "productivity" | "learning" | "analytics" | "creative" | "communication";
  description: string;
  pricing: "ucretsiz" | "freemium" | "ucretli";
  monthlyPrice?: string;
  whyRelevant: string;
  url: string;
  priority: "zorunlu" | "onerilen" | "ileri-seviye";
}

export interface FreeResource {
  name: string;
  type: "kurs" | "youtube" | "blog" | "topluluk" | "dokumantasyon";
  url: string;
  description: string;
  estimatedHours: number;
}

export interface JobToolKit {
  jobCategoryId: string;
  tools: ToolRecommendation[];
  freeResources: FreeResource[];
}

// ─── Tool Kits by Job Category ──────────────────────────────────────────────

const toolKits: JobToolKit[] = [
  // ── admin-office ──────────────────────────────────────────────────────────
  {
    jobCategoryId: "admin-office",
    tools: [
      {
        name: "Microsoft Copilot",
        category: "ai-assistant",
        description: "Word, Excel, Outlook, Teams icinde yapay zeka destekli asistan. Dokuman olusturma, e-posta yazma ve toplanti ozetleri.",
        pricing: "ucretli",
        monthlyPrice: "$30/ay",
        whyRelevant: "Ofis islerinin %60'ini hizlandiran tek platform. Rutin gorevleri otomatiklestirerek stratejik islere zaman kazandirir.",
        url: "https://www.microsoft.com/copilot",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Not alma, proje yonetimi ve bilgi tabaninda yapay zeka destegi. Ozetleme, yazma ve organizasyon.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Dokuman yonetimi ve bilgi organizasyonunu yapilandirir. Ofis profesyonelleri icin ikinci beyin.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Toplanti kaydi, otomatik transkripsiyon ve ozet cikarma. Zoom, Teams, Meet entegrasyonu.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Toplanti notlari ve takip gorevlerini otomatiklestirir. Idari yukunun buyuk kismini azaltir.",
        url: "https://otter.ai",
        priority: "onerilen",
      },
      {
        name: "Zapier",
        category: "productivity",
        description: "5000+ uygulama arasinda otomatik is akislari olusturma. Kod bilmeden tekrarlayan gorevleri bagla.",
        pricing: "freemium",
        monthlyPrice: "$19.99/ay",
        whyRelevant: "Rutin veri aktarimi ve bildirim gorevlerini tamamen ortadan kaldirir. Ofis otomasyonunun temeli.",
        url: "https://zapier.com",
        priority: "onerilen",
      },
      {
        name: "ChatGPT",
        category: "ai-assistant",
        description: "Genel amacli yapay zeka asistani. Metin yazma, analiz, arastirma ve problem cozme.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "E-posta taslagi, rapor ozeti ve hizli arastirma icin vazgecilmez genel arac.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
    ],
    freeResources: [
      {
        name: "Google Dijital Garaj — Yapay Zeka Temelleri",
        type: "kurs",
        url: "https://learndigital.withgoogle.com/dijitalgaraj",
        description: "Google'in ucretsiz yapay zeka egitimi. Temel kavramlar ve is hayatinda kullanim.",
        estimatedHours: 8,
      },
      {
        name: "Microsoft 365 Copilot Egitim Merkezi",
        type: "dokumantasyon",
        url: "https://support.microsoft.com/copilot",
        description: "Microsoft Copilot'u etkili kullanma rehberi ve video egitimler.",
        estimatedHours: 4,
      },
      {
        name: "Notion Academy",
        type: "kurs",
        url: "https://www.notion.so/help",
        description: "Notion'i is akislarinda etkili kullanma. Sablonlar ve en iyi pratikler.",
        estimatedHours: 6,
      },
      {
        name: "Prompt Muhendisligi Rehberi — LearnPrompting",
        type: "dokumantasyon",
        url: "https://learnprompting.org",
        description: "Yapay zekaya etkili talimat vermeyi ogreten kapsamli ucretsiz rehber.",
        estimatedHours: 10,
      },
    ],
  },

  // ── finance-accounting ────────────────────────────────────────────────────
  {
    jobCategoryId: "finance-accounting",
    tools: [
      {
        name: "Microsoft Copilot (Excel)",
        category: "analytics",
        description: "Excel icinde yapay zeka destekli veri analizi, formul olusturma ve gorsellestime.",
        pricing: "ucretli",
        monthlyPrice: "$30/ay",
        whyRelevant: "Finansal modelleme ve raporlamayi kok degistirir. Karmasik formulleri dogal dil ile olustur.",
        url: "https://www.microsoft.com/copilot",
        priority: "zorunlu",
      },
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Finansal analiz, rapor yazimi ve muhasebe sorulari icin genel yapay zeka asistani.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Finansal raporlari ozetleme, vergi mevzuati arastirma ve musteri iletisimi icin.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Datarails",
        category: "analytics",
        description: "FP&A (Finansal Planlama ve Analiz) icin yapay zeka platformu. Excel entegreli.",
        pricing: "ucretli",
        monthlyPrice: "$150/ay",
        whyRelevant: "Finansal planlama ve butce yonetimini otomatiklestirir. CFO seviyesi icgoruler uretir.",
        url: "https://www.datarails.com",
        priority: "ileri-seviye",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Finansal dokumantasyon, prosedur yonetimi ve ekip bilgi tabani.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Muhasebe prosedurlerini ve musteri dosyalarini yapilandirir.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Kaynakli yapay zeka arastirma araci. Mevzuat ve standart degisikliklerini takip.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Vergi mevzuati, IFRS/TFRS degisiklikleri ve sektorel guncellemeleri kaynakli arastir.",
        url: "https://www.perplexity.ai",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Financial Markets (Yale)",
        type: "kurs",
        url: "https://www.coursera.org/learn/financial-markets-global",
        description: "Robert Shiller'in finansal piyasalar dersi. Strateji ve danismanlik becerisi.",
        estimatedHours: 33,
      },
      {
        name: "Khan Academy — Finans ve Sermaye Piyasalari",
        type: "kurs",
        url: "https://www.khanacademy.org/economics-finance-domain",
        description: "Ucretsiz finans egitimi. Temel kavramlardan ileri analize.",
        estimatedHours: 20,
      },
      {
        name: "Excel ile Finansal Modelleme — Corporate Finance Institute",
        type: "kurs",
        url: "https://corporatefinanceinstitute.com/resources/",
        description: "Ucretsiz finansal modelleme kaynaklari ve Excel sablonlari.",
        estimatedHours: 15,
      },
    ],
  },

  // ── legal ─────────────────────────────────────────────────────────────────
  {
    jobCategoryId: "legal",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Hukuki arastirma, sozlesme taslagi ve mevzuat analizi icin genel yapay zeka.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Hukuki arastirma suresini %70 azaltir. Ictihat ve mevzuat tarama icin guclu.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Kaynakli yapay zeka arastirma araci. Gercek zamanli mevzuat ve ictihat takibi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Hukuki arastirmada kaynak gostererek calisir. Mevzuat degisikliklerini aninda yakala.",
        url: "https://www.perplexity.ai",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Dava dosyalari, musteri bilgileri ve hukuki bilgi tabani yonetimi.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Dava yonetimi ve hukuki dokumantasyonu yapilandirir.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Grammarly Business",
        category: "communication",
        description: "Profesyonel yazi asistani. Hukuki metinlerde netlik ve tutarlilik kontrolu.",
        pricing: "ucretli",
        monthlyPrice: "$25/ay",
        whyRelevant: "Sozlesme ve dilekce yaziminda dil kalitesini arttirir.",
        url: "https://www.grammarly.com/business",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Successful Negotiation (Michigan)",
        type: "kurs",
        url: "https://www.coursera.org/learn/negotiation-skills",
        description: "Muzakere becerileri — yapay zekanin kopyalayamadigi insani beceri.",
        estimatedHours: 17,
      },
      {
        name: "Harvard PON — Negotiation Resources",
        type: "blog",
        url: "https://www.pon.harvard.edu/daily/",
        description: "Harvard muzakere programindan ucretsiz makaleler ve vaka calismalari.",
        estimatedHours: 10,
      },
      {
        name: "LearnPrompting — Hukuk icin Yapay Zeka",
        type: "dokumantasyon",
        url: "https://learnprompting.org",
        description: "Hukuki arastirma ve analiz icin etkili prompt yazma teknikleri.",
        estimatedHours: 8,
      },
    ],
  },

  // ── software-it ───────────────────────────────────────────────────────────
  {
    jobCategoryId: "software-it",
    tools: [
      {
        name: "GitHub Copilot",
        category: "ai-assistant",
        description: "Kod tamamlama, fonksiyon uretme ve kod aciklama. IDE icerisinde calisir.",
        pricing: "ucretli",
        monthlyPrice: "$19/ay",
        whyRelevant: "Yazilimcilarin %55'i daha hizli kod yaziyor. Rutin kodlama gorevlerini %40 azaltir.",
        url: "https://github.com/features/copilot",
        priority: "zorunlu",
      },
      {
        name: "Cursor",
        category: "ai-assistant",
        description: "Yapay zeka odakli kod editoru. Codebase anlama, refactoring ve chat destegi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Tum proje baglamini anlayan AI editoru. Karmasik refactoring ve hata ayiklama.",
        url: "https://cursor.sh",
        priority: "zorunlu",
      },
      {
        name: "v0 by Vercel",
        category: "creative",
        description: "Dogal dilden UI bilesenlerini olusturma. React/Next.js icin hizli prototipleme.",
        pricing: "freemium",
        whyRelevant: "Frontend gelistirmeyi hizlandirir. Tasarimdan koda gecisi otomatiklestirir.",
        url: "https://v0.dev",
        priority: "onerilen",
      },
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Mimari kararlar, debugging, dokumantasyon ve teknik arastirma icin.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Sistem tasarimi, API entegrasyonu ve karmasik bug cozumlerinde degerli.",
        url: "https://chat.openai.com",
        priority: "onerilen",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Teknik dokumantasyon arama ve guncel teknoloji arastirmasi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Kutuphanelerin son versiyonlarini ve API degisikliklerini kaynakli arastir.",
        url: "https://www.perplexity.ai",
        priority: "onerilen",
      },
      {
        name: "Linear",
        category: "productivity",
        description: "Yapay zeka destekli proje yonetimi. Issue tracking ve sprint planlama.",
        pricing: "freemium",
        monthlyPrice: "$8/ay",
        whyRelevant: "Gelistirme surecini yapilandirir. AI ile onceliklendirme ve is dagitimi.",
        url: "https://linear.app",
        priority: "ileri-seviye",
      },
    ],
    freeResources: [
      {
        name: "freeCodeCamp — Machine Learning with Python",
        type: "kurs",
        url: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
        description: "Ucretsiz makine ogrenimi kursu. Yapay zekayi anla, sadece kullanma.",
        estimatedHours: 40,
      },
      {
        name: "Fireship YouTube — AI Araclari",
        type: "youtube",
        url: "https://www.youtube.com/@Fireship",
        description: "Kisa ve oz teknoloji videolari. Yeni AI araclari ve trendleri.",
        estimatedHours: 5,
      },
      {
        name: "Coursera — AI For Everyone (Andrew Ng)",
        type: "kurs",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        description: "Yapay zeka temelleri — teknik olmayan bakis acisi da degerli.",
        estimatedHours: 12,
      },
      {
        name: "GitHub Skills",
        type: "dokumantasyon",
        url: "https://skills.github.com",
        description: "GitHub Copilot ve modern gelistirme pratiklerini ogrenme.",
        estimatedHours: 8,
      },
    ],
  },

  // ── marketing-content ─────────────────────────────────────────────────────
  {
    jobCategoryId: "marketing-content",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Icerik uretimi, strateji gelistirme ve hedef kitle analizi icin.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Icerik taslagi, baslik onerileri ve kampanya fikirleri icin temel arac.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Canva AI (Magic Studio)",
        category: "creative",
        description: "Yapay zeka destekli gorsel tasarim. Sosyal medya, sunum ve pazarlama materyalleri.",
        pricing: "freemium",
        monthlyPrice: "$13/ay",
        whyRelevant: "Gorsel icerik uretimini demokratiklestirir. Tasarimci olmadan profesyonel gorseller.",
        url: "https://www.canva.com",
        priority: "zorunlu",
      },
      {
        name: "Semrush",
        category: "analytics",
        description: "SEO, rekabet analizi ve icerik stratejisi platformu. AI yazma asistani dahil.",
        pricing: "ucretli",
        monthlyPrice: "$130/ay",
        whyRelevant: "Veri odakli pazarlama stratejisi. SEO ve rekabet analizinde vazgecilmez.",
        url: "https://www.semrush.com",
        priority: "onerilen",
      },
      {
        name: "Midjourney",
        category: "creative",
        description: "Yapay zeka ile yuksek kaliteli gorsel uretimi. Marka gorselleri ve kampanya materyalleri.",
        pricing: "ucretli",
        monthlyPrice: "$10/ay",
        whyRelevant: "Stok fotograf ihtiyacini azaltir. Benzersiz marka gorselleri uret.",
        url: "https://www.midjourney.com",
        priority: "onerilen",
      },
      {
        name: "Jasper AI",
        category: "ai-assistant",
        description: "Pazarlama odakli yapay zeka yazi araci. Marka sesi ve kampanya icerikleri.",
        pricing: "ucretli",
        monthlyPrice: "$49/ay",
        whyRelevant: "Marka tutarliligi olan icerik uretimi. Pazarlama ekiplerinin verimliligi icin tasarlanmis.",
        url: "https://www.jasper.ai",
        priority: "ileri-seviye",
      },
    ],
    freeResources: [
      {
        name: "HubSpot Academy — Inbound Marketing",
        type: "kurs",
        url: "https://academy.hubspot.com/courses/inbound-marketing",
        description: "Ucretsiz sertifikali pazarlama egitimi. Strateji ve icerik pazarlamasi.",
        estimatedHours: 12,
      },
      {
        name: "Google Dijital Garaj — Dijital Pazarlama",
        type: "kurs",
        url: "https://learndigital.withgoogle.com/dijitalgaraj",
        description: "Google'in ucretsiz dijital pazarlama ve AI egitimi.",
        estimatedHours: 40,
      },
      {
        name: "Ahrefs YouTube — SEO Egitimi",
        type: "youtube",
        url: "https://www.youtube.com/@AhrefsCom",
        description: "SEO ve icerik stratejisi videolari. Ucretsiz ve kapsamli.",
        estimatedHours: 10,
      },
    ],
  },

  // ── sales-bd ──────────────────────────────────────────────────────────────
  {
    jobCategoryId: "sales-bd",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Musteri arastirma, teklif yazimi ve satis stratejisi gelistirme.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Musteri profili analizi, teklif taslagi ve objection handling icin guclu.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Apollo.io",
        category: "analytics",
        description: "Yapay zeka destekli satis zekasi ve lead bulma platformu.",
        pricing: "freemium",
        monthlyPrice: "$49/ay",
        whyRelevant: "Dogru musterileri bulmak ve ilk iletisimi kisisellesirmek icin.",
        url: "https://www.apollo.io",
        priority: "onerilen",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Satis gorusmelerini kaydet, transkript olustur ve anahtar noktalari cikar.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Musteri gorusmelerinden icgoru cikar. Takip eylemlerini otomatik belirle.",
        url: "https://otter.ai",
        priority: "onerilen",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Satis pipeline, musteri notlari ve ekip bilgi tabani yonetimi.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Satis surecini yapilandirir. Musteri bilgilerini merkezi yonetir.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "HubSpot Academy — Sales Enablement",
        type: "kurs",
        url: "https://academy.hubspot.com/courses/inbound-sales",
        description: "Ucretsiz sertifikali satis egitimi. Modern satis teknikleri.",
        estimatedHours: 8,
      },
      {
        name: "Coursera — Successful Negotiation (Michigan)",
        type: "kurs",
        url: "https://www.coursera.org/learn/negotiation-skills",
        description: "Muzakere ve ikna becerileri — yapay zekanin kopyalayamadigi alan.",
        estimatedHours: 17,
      },
      {
        name: "Sales Hacker Community",
        type: "topluluk",
        url: "https://www.saleshacker.com",
        description: "Satis profesyonelleri toplulugu. Webinarlar ve kaynak paylasimi.",
        estimatedHours: 5,
      },
    ],
  },

  // ── healthcare-clinical ───────────────────────────────────────────────────
  {
    jobCategoryId: "healthcare-clinical",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Tibbi literatur tarama, hasta egitim materyali hazirlama ve klinik not yazimi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Arastirma ve dokumantasyon suresini azaltir. Hasta ile gecirilen zamani arttirir.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Kaynakli tibbi arastirma. Guncel literatur ve kilavuz degisikliklerini takip.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Tibbi arastirmalari kaynakli yapar. Kanita dayali tipta guclu.",
        url: "https://www.perplexity.ai",
        priority: "onerilen",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Klinik prosedurler, egitim materyalleri ve ekip bilgi tabani.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Tibbi bilgiyi yapilandirir ve ekiple paylasilabilir kılar.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Tibbi toplanti ve konferans kayitlari. Onemli noktalari otomatik cikarma.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Tibbi konferans ve toplanti notlarini otomatiklestirir.",
        url: "https://otter.ai",
        priority: "ileri-seviye",
      },
    ],
    freeResources: [
      {
        name: "Coursera — AI in Healthcare (Stanford)",
        type: "kurs",
        url: "https://www.coursera.org/learn/ai-in-healthcare",
        description: "Saglik sektorunde yapay zeka uygulamalari. Klinik karar destegi.",
        estimatedHours: 18,
      },
      {
        name: "WHO — Digital Health Resources",
        type: "dokumantasyon",
        url: "https://www.who.int/health-topics/digital-health",
        description: "Dunya Saglik Orgutu dijital saglik kaynaklari ve rehberleri.",
        estimatedHours: 8,
      },
      {
        name: "PubMed — Ucretsiz Tibbi Literatur",
        type: "dokumantasyon",
        url: "https://pubmed.ncbi.nlm.nih.gov",
        description: "Ucretsiz tibbi makale erisimi. AI ile arastirmayi birlestir.",
        estimatedHours: 0,
      },
    ],
  },

  // ── education-teaching ────────────────────────────────────────────────────
  {
    jobCategoryId: "education-teaching",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Ders plani, sinav sorusu uretimi, ogrenci geri bildirimi ve materyal hazirlama.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Ders hazirlama suresini %50 azaltir. Kisisellestirilmis egitim materyalleri olustur.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Canva AI (Magic Studio)",
        category: "creative",
        description: "Egitim materyalleri, sunumlar ve gorsel icerikler icin tasarim araci.",
        pricing: "freemium",
        monthlyPrice: "$13/ay",
        whyRelevant: "Profesyonel egitim materyalleri ve sunumlar olustur. Ogretmenler icin ucretsiz plan.",
        url: "https://www.canva.com",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Mufredat planlama, ogrenci takibi ve egitim bilgi tabani.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Ders planlari ve ogrenci ilerlemesini tek platformda yonet.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Gamma AI",
        category: "creative",
        description: "Yapay zeka ile sunum ve egitim materyali olusturma. Tek tikla profesyonel slaytlar.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Sunum hazirlama suresini dakikalara indirir. Etkilesimli icerikler olustur.",
        url: "https://gamma.app",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — AI For Everyone (Andrew Ng)",
        type: "kurs",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        description: "Yapay zeka temelleri — egitimciler icin kritik bir arka plan.",
        estimatedHours: 12,
      },
      {
        name: "ISTE — AI in Education Resources",
        type: "dokumantasyon",
        url: "https://www.iste.org/areas-of-focus/AI-in-education",
        description: "Egitimde yapay zeka kullanimi icin rehberler ve en iyi pratikler.",
        estimatedHours: 6,
      },
      {
        name: "Khan Academy — Khanmigo Demo",
        type: "youtube",
        url: "https://www.youtube.com/@khanacademy",
        description: "Yapay zeka destekli ogretmenlik ornekleri ve egitim videolari.",
        estimatedHours: 5,
      },
    ],
  },

  // ── creative-design ───────────────────────────────────────────────────────
  {
    jobCategoryId: "creative-design",
    tools: [
      {
        name: "Midjourney",
        category: "creative",
        description: "Yapay zeka ile yuksek kaliteli gorsel uretimi. Konsept, moodboard ve gorsel arastirma.",
        pricing: "ucretli",
        monthlyPrice: "$10/ay",
        whyRelevant: "Gorsel kesfif ve konsept gelistirme suresini dramatik olarak kisaltir.",
        url: "https://www.midjourney.com",
        priority: "zorunlu",
      },
      {
        name: "Figma AI",
        category: "creative",
        description: "Tasarim araci icinde yapay zeka destegi. Otomatik layout, ikon ve metin uretimi.",
        pricing: "freemium",
        monthlyPrice: "$15/ay",
        whyRelevant: "UI/UX tasarim surecini hizlandirir. Prototiplemeden uretime.",
        url: "https://www.figma.com",
        priority: "zorunlu",
      },
      {
        name: "Adobe Firefly",
        category: "creative",
        description: "Adobe ekosistemi icinde yapay zeka gorsel uretimi ve duzenleme.",
        pricing: "ucretli",
        monthlyPrice: "$23/ay",
        whyRelevant: "Mevcut Adobe is akisina entegre. Ticari kullanim icin guvenli.",
        url: "https://www.adobe.com/products/firefly.html",
        priority: "onerilen",
      },
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Yaratici brief, metin yazimi ve tasarim arastirmasi icin.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Yaratici konsept gelistirme ve musteri iletisimi icin.",
        url: "https://chat.openai.com",
        priority: "onerilen",
      },
      {
        name: "Runway ML",
        category: "creative",
        description: "Yapay zeka video duzenleme ve uretimi. Motion graphics ve efektler.",
        pricing: "freemium",
        monthlyPrice: "$15/ay",
        whyRelevant: "Video icerik uretimini demokratiklestirir. Hareket ve efekt otomasyonu.",
        url: "https://runwayml.com",
        priority: "ileri-seviye",
      },
    ],
    freeResources: [
      {
        name: "Coursera — UI/UX Design (Google)",
        type: "kurs",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        description: "Google UX tasarim sertifikasi. Stratejik tasarim dusuncesi.",
        estimatedHours: 60,
      },
      {
        name: "Figma Community Resources",
        type: "topluluk",
        url: "https://www.figma.com/community",
        description: "Ucretsiz sablonlar, pluginler ve tasarim kaynaklari.",
        estimatedHours: 5,
      },
      {
        name: "The Futur YouTube — Tasarim Stratejisi",
        type: "youtube",
        url: "https://www.youtube.com/@thefutur",
        description: "Tasarim stratejisi ve yaratici liderlik videolari.",
        estimatedHours: 8,
      },
    ],
  },

  // ── management-leadership ─────────────────────────────────────────────────
  {
    jobCategoryId: "management-leadership",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Strateji analizi, sunum hazirligi ve karar destegi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Stratejik planlama, SWOT analizi ve yonetici raporu hazirlamada guclu.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Ekip yonetimi, OKR takibi ve organizasyonel bilgi tabani.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Ekip performansini ve stratejik hedefleri tek platformda yonet.",
        url: "https://www.notion.so",
        priority: "zorunlu",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Yonetim toplantilari kaydi ve aksiyon maddesi cikartma.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Toplanti verimliligi. Kararlar ve aksiyonlar otomatik dokumante edilir.",
        url: "https://otter.ai",
        priority: "onerilen",
      },
      {
        name: "Gamma AI",
        category: "creative",
        description: "Yapay zeka ile yonetici sunumlari ve strateji dokumanlari olusturma.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Yonetim kurulu ve strateji sunumlarini dakikalar icinde hazirla.",
        url: "https://gamma.app",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Leading People and Teams (Michigan)",
        type: "kurs",
        url: "https://www.coursera.org/specializations/leading-teams",
        description: "Insan yonetimi ve takim liderligii. Yapay zekanin kopyalayamadigi beceriler.",
        estimatedHours: 20,
      },
      {
        name: "Harvard Business Review — AI Makaleleri",
        type: "blog",
        url: "https://hbr.org/topic/ai-and-machine-learning",
        description: "Yapay zekanin is dunyasina etkisi uzerine stratejik makaleler.",
        estimatedHours: 10,
      },
      {
        name: "McKinsey — AI Raporlari",
        type: "dokumantasyon",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights",
        description: "McKinsey'in yapay zeka ve gelecek is raporlari.",
        estimatedHours: 8,
      },
    ],
  },

  // ── trades-manufacturing ──────────────────────────────────────────────────
  {
    jobCategoryId: "trades-manufacturing",
    tools: [
      {
        name: "ChatGPT",
        category: "ai-assistant",
        description: "Teknik dokumantasyon, sorun giderme rehberleri ve egitim materyali hazırlama.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Teknik belgeleri hizla olustur. Sorun giderme adimlari ve egitim materyalleri.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Teknik standartlar, guvenlik yonetmelikleri ve ekipman dokumantasyonu arastirmasi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Guvenlik standartlari ve teknik spesifikasyonlari kaynakli arastir.",
        url: "https://www.perplexity.ai",
        priority: "onerilen",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Bakim takvimleri, kalite kontrol listeleri ve proje takibi.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Uretim sureclerini ve bakim planlarini dijitallestir.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Canva AI",
        category: "creative",
        description: "Is guvenligi posterleri, egitim materyalleri ve gorsel talimatlar.",
        pricing: "freemium",
        monthlyPrice: "$13/ay",
        whyRelevant: "Gorsel is talimatlari ve guvenlik materyalleri olustur.",
        url: "https://www.canva.com",
        priority: "ileri-seviye",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Supply Chain Management (Rutgers)",
        type: "kurs",
        url: "https://www.coursera.org/specializations/supply-chain-management",
        description: "Tedarik zinciri yonetimi. Stratejik dusunme becerisi.",
        estimatedHours: 24,
      },
      {
        name: "OSHA — Is Guvenligi Egitim Kaynaklari",
        type: "dokumantasyon",
        url: "https://www.osha.gov/training",
        description: "Ucretsiz is guvenligi egitimleri ve sertifikalar.",
        estimatedHours: 10,
      },
      {
        name: "Khan Academy — Muhendislik Temelleri",
        type: "kurs",
        url: "https://www.khanacademy.org/science/ap-physics-1",
        description: "Temel fizik ve muhendislik prensipleri. Teknik anlayisi derinlestir.",
        estimatedHours: 20,
      },
    ],
  },

  // ── customer-service ──────────────────────────────────────────────────────
  {
    jobCategoryId: "customer-service",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Musteri iletisimi, cozum onerileri ve bilgi tabani olusturma.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Musteri sorunlarina hizli cozum bulma. Iletisim kalitesini artirma.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Musteri bilgi tabani, SSS ve cozum dokumantasyonu.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Musteri hizmetleri bilgi tabanini yapilandirir ve guncel tutar.",
        url: "https://www.notion.so",
        priority: "zorunlu",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Musteri gorusmelerini kaydet ve analiz et. Kalite kontrol icin.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Gorusme kalitesini olcme ve iyilestirme. Egitim materyali cikarma.",
        url: "https://otter.ai",
        priority: "onerilen",
      },
      {
        name: "Grammarly",
        category: "communication",
        description: "Yazili musteri iletisiminde dil kalitesi ve ton kontrolu.",
        pricing: "freemium",
        monthlyPrice: "$25/ay",
        whyRelevant: "E-posta ve sohbet yanıtlarinda profesyonel ton ve netlik.",
        url: "https://www.grammarly.com",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Gainsight — Customer Success Resources",
        type: "dokumantasyon",
        url: "https://www.gainsight.com/resources/",
        description: "Musteri basarisi yonetimi kaynaklari. Reaktiften proaktife gecis.",
        estimatedHours: 10,
      },
      {
        name: "HubSpot Academy — Customer Service",
        type: "kurs",
        url: "https://academy.hubspot.com/courses/inbound-service-fundamentals",
        description: "Musteri hizmetleri sertifikasi. Ileri seviye sorun cozme.",
        estimatedHours: 8,
      },
      {
        name: "Coursera — Communication Skills (Colorado)",
        type: "kurs",
        url: "https://www.coursera.org/specializations/effective-business-communication",
        description: "Etkili iletisim becerileri. Yazili ve sozlu iletisim.",
        estimatedHours: 16,
      },
    ],
  },

  // ── research-science ──────────────────────────────────────────────────────
  {
    jobCategoryId: "research-science",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Literatur ozeti, hipotez gelistirme ve makale yazim destegi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Arastirma surecini hizlandirir. Literatur tarama ve ozet cikarma.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Akademik arastirma icin kaynakli yapay zeka araci. Gercek zamanli literatur takibi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Akademik makaleleri kaynakli arastir. Referans dogrulama icin guclu.",
        url: "https://www.perplexity.ai",
        priority: "zorunlu",
      },
      {
        name: "Elicit",
        category: "analytics",
        description: "Yapay zeka destekli akademik arastirma asistani. Makale bulma ve analiz.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Sistematik literatur taramayi otomatiklestirir. Arastirma kalitesini arttirir.",
        url: "https://elicit.com",
        priority: "onerilen",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Arastirma notlari, proje yonetimi ve akademik bilgi tabani.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Arastirma surecini yapilandirir. Notlar, kaynaklar ve bulgulari bagla.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Research Methods (London)",
        type: "kurs",
        url: "https://www.coursera.org/learn/research-methods",
        description: "Arastirma yontemleri. Deneysel tasarim ve analiz.",
        estimatedHours: 20,
      },
      {
        name: "Semantic Scholar",
        type: "dokumantasyon",
        url: "https://www.semanticscholar.org",
        description: "Yapay zeka destekli akademik arama motoru. Ucretsiz literatur erişimi.",
        estimatedHours: 0,
      },
      {
        name: "Nature — AI in Research",
        type: "blog",
        url: "https://www.nature.com/collections/artificial-intelligence",
        description: "Bilimde yapay zeka kullanimi uzerine makaleler ve perspektifler.",
        estimatedHours: 8,
      },
    ],
  },

  // ── hr-people ─────────────────────────────────────────────────────────────
  {
    jobCategoryId: "hr-people",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Is ilani yazimi, politika dokumani hazirlama ve calisan iletisimi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "IK dokumantasyonunu hizlandirir. Is ilanlari, politikalar ve egitim materyalleri.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "IK bilgi tabani, ise alim sureci ve calisan el kitabi yonetimi.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "IK sureclerini dijitallestir. Calisan deneyimini iyilestir.",
        url: "https://www.notion.so",
        priority: "zorunlu",
      },
      {
        name: "Grammarly Business",
        category: "communication",
        description: "Profesyonel IK iletisiminde dil ve ton kontrolu.",
        pricing: "ucretli",
        monthlyPrice: "$25/ay",
        whyRelevant: "Hassas calisan iletisimlerinde dogru ton ve netlik.",
        url: "https://www.grammarly.com/business",
        priority: "onerilen",
      },
      {
        name: "Otter.ai",
        category: "communication",
        description: "Mulakat ve toplanti kayitlari. Aday degerlendirme notlari.",
        pricing: "freemium",
        monthlyPrice: "$16.99/ay",
        whyRelevant: "Mulakat surecini belgeleme ve degerlendirme tutarliligi.",
        url: "https://otter.ai",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "SHRM — HR Resources",
        type: "dokumantasyon",
        url: "https://www.shrm.org/resources",
        description: "Insan kaynaklari profesyonelleri icin kaynak kutuphanesi.",
        estimatedHours: 10,
      },
      {
        name: "Coursera — People Analytics (Pennsylvania)",
        type: "kurs",
        url: "https://www.coursera.org/learn/wharton-people-analytics",
        description: "Veri odakli IK yonetimi. Insan analitigi becerileri.",
        estimatedHours: 12,
      },
      {
        name: "LinkedIn Learning — HR icin AI",
        type: "kurs",
        url: "https://www.linkedin.com/learning/topics/human-resources",
        description: "IK sureclerinde yapay zeka kullanimi (1 aylik ucretsiz deneme).",
        estimatedHours: 8,
      },
    ],
  },

  // ── logistics-ops ─────────────────────────────────────────────────────────
  {
    jobCategoryId: "logistics-ops",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Surec analizi, raporlama ve operasyonel dokumantasyon.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Operasyonel raporlar, surec dokumantasyonu ve analiz icin.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Operasyon yonetimi, SOP dokumantasyonu ve ekip koordinasyonu.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Standart isletme prosedurlerini ve operasyonel bilgiyi yapilandirir.",
        url: "https://www.notion.so",
        priority: "zorunlu",
      },
      {
        name: "Zapier",
        category: "productivity",
        description: "Sistemler arasi otomatik veri akisi. Envanter, siparis ve bildirim otomasyonu.",
        pricing: "freemium",
        monthlyPrice: "$19.99/ay",
        whyRelevant: "Tekrarlayan operasyonel gorevleri otomatiklestirir. Sistemleri baglar.",
        url: "https://zapier.com",
        priority: "onerilen",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Tedarik zinciri arastirmasi ve sektörel trend takibi.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Lojistik trendleri, mevzuat degisiklikleri ve tedarikci arastirmasi.",
        url: "https://www.perplexity.ai",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — Supply Chain Management (Rutgers)",
        type: "kurs",
        url: "https://www.coursera.org/specializations/supply-chain-management",
        description: "Tedarik zinciri yonetimi uzmanligi. Stratejik operasyon becerileri.",
        estimatedHours: 24,
      },
      {
        name: "APICS — Supply Chain Resources",
        type: "dokumantasyon",
        url: "https://www.ascm.org/learning-development/",
        description: "Tedarik zinciri ve operasyon yonetimi kaynaklari.",
        estimatedHours: 10,
      },
      {
        name: "MIT OpenCourseWare — Operations Management",
        type: "kurs",
        url: "https://ocw.mit.edu/courses/15-760b-operations-management-spring-2004/",
        description: "MIT'den ucretsiz operasyon yonetimi dersi.",
        estimatedHours: 30,
      },
    ],
  },

  // ── other ─────────────────────────────────────────────────────────────────
  {
    jobCategoryId: "other",
    tools: [
      {
        name: "ChatGPT (Plus)",
        category: "ai-assistant",
        description: "Genel amacli yapay zeka asistani. Her meslekte kullanilabilir temel arac.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Her meslekte uygulanabilir: arastirma, yazim, analiz ve problem cozme.",
        url: "https://chat.openai.com",
        priority: "zorunlu",
      },
      {
        name: "Perplexity AI",
        category: "ai-assistant",
        description: "Kaynakli yapay zeka arastirma araci. Guncel bilgiye hizli erisim.",
        pricing: "freemium",
        monthlyPrice: "$20/ay",
        whyRelevant: "Her sektorde guncel arastirma yapma. Kaynak dogrulama ile guvenilir bilgi.",
        url: "https://www.perplexity.ai",
        priority: "zorunlu",
      },
      {
        name: "Notion AI",
        category: "productivity",
        description: "Kisisel ve ekip uretkenlik platformu. Not alma, proje yonetimi.",
        pricing: "freemium",
        monthlyPrice: "$10/ay",
        whyRelevant: "Is ve kisisel uretkenligini yapilandir. Yapay zeka ile destekle.",
        url: "https://www.notion.so",
        priority: "onerilen",
      },
      {
        name: "Canva AI",
        category: "creative",
        description: "Her meslekte kullanilabilir gorsel tasarim araci. Sunumlar ve materyaller.",
        pricing: "freemium",
        monthlyPrice: "$13/ay",
        whyRelevant: "Profesyonel gorseller ve sunumlar olustur. Tasarim bilgisi gerektirmez.",
        url: "https://www.canva.com",
        priority: "onerilen",
      },
    ],
    freeResources: [
      {
        name: "Coursera — AI For Everyone (Andrew Ng)",
        type: "kurs",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        description: "Yapay zeka temelleri. Her meslekten profesyoneller icin.",
        estimatedHours: 12,
      },
      {
        name: "Google Dijital Garaj — Yapay Zeka Temelleri",
        type: "kurs",
        url: "https://learndigital.withgoogle.com/dijitalgaraj",
        description: "Google'in ucretsiz yapay zeka ve dijital beceriler egitimi.",
        estimatedHours: 8,
      },
      {
        name: "LearnPrompting — Prompt Muhendisligi",
        type: "dokumantasyon",
        url: "https://learnprompting.org",
        description: "Yapay zekaya etkili talimat verme sanati. Her meslek icin uygulanabilir.",
        estimatedHours: 10,
      },
      {
        name: "LinkedIn Learning — Yapay Zeka Becerileri",
        type: "kurs",
        url: "https://www.linkedin.com/learning/topics/artificial-intelligence",
        description: "Yapay zeka becerileri kurslari (1 aylik ucretsiz deneme).",
        estimatedHours: 15,
      },
    ],
  },
];

// ─── Lookup Functions ───────────────────────────────────────────────────────

/**
 * Returns the tool kit for a given job category ID.
 * Falls back to "other" if category is not found.
 */
export function getToolKitForJob(jobCategoryId: string): JobToolKit {
  return (
    toolKits.find((tk) => tk.jobCategoryId === jobCategoryId) ??
    toolKits.find((tk) => tk.jobCategoryId === "other")!
  );
}

export { toolKits };
