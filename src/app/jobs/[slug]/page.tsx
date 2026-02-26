import Link from "next/link";
import { jobCategories } from "@/data/job-categories";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// SEO landing pages for "[job title] AI risk"
// These pages target organic search traffic and funnel to the quiz

const JOB_SEO_DATA: Record<string, {
  title: string;
  risk: number;
  category: string;
  description: string;
  keyTasks: string[];
  aiThreats: string[];
  safeAspects: string[];
  timeline: string;
  reskillingSuggestions: string[];
}> = {
  "software-engineer": {
    title: "Yazılım Mühendisi",
    risk: 35,
    category: "moderate",
    description: "Yazılım mühendisliği orta düzeyde yapay zeka etkisiyle karşı karşıya. Yapay zeka kodlama asistanları kodun yazılma şeklini dönüştürürken, yaratıcı problem çözme, sistem tasarımı ve paydaş iletişimi yönleri belirgin şekilde insana özgü kalmaya devam ediyor.",
    keyTasks: ["Kod yazma", "Sistem tasarımı", "Kod inceleme", "Hata ayıklama", "Gereksinim toplama"],
    aiThreats: ["Yapay zeka kod üretimi (Copilot, Claude)", "Otomatik test", "No-code/low-code platformları", "Yapay zeka destekli hata ayıklama"],
    safeAspects: ["Karmaşık sistem mimarisi", "Ekipler arası işbirliği", "Belirsiz problem çözme", "Stratejik teknik kararlar"],
    timeline: "Önemli rol dönüşümüne 5-8 yıl",
    reskillingSuggestions: ["Yapay zeka destekli geliştirmede ustalaş", "Sistem tasarımı ve mimariye odaklan", "Liderlik ve mentorluk becerileri geliştir", "Yapay zeka/makine öğrenimi temellerini öğren"],
  },
  "copywriter": {
    title: "Metin Yazarı",
    risk: 72,
    category: "high",
    description: "Metin yazarlığı önemli bir yapay zeka etkisiyle karşı karşıya. Yapay zeka artık pazarlama metinleri, blog yazıları ve sosyal medya içeriklerini ölçekli olarak üretebiliyor. Ancak marka stratejisi, duygusal hikaye anlatımı ve kitle içgörüsü insana özgü güçlü yönler olmaya devam ediyor.",
    keyTasks: ["Pazarlama metni yazma", "Blog içeriği", "Sosyal medya paylaşımları", "E-posta kampanyaları", "Marka sesi geliştirme"],
    aiThreats: ["Yapay zeka içerik üretimi", "Otomatik A/B metin testi", "Yapay zeka çeviri ve yerelleştirme", "Ölçekli şablon tabanlı içerik"],
    safeAspects: ["Marka stratejisi", "Duygusal hikaye anlatımı", "Kitle araştırması", "Yaratıcı yönetim"],
    timeline: "Önemli rol dönüşümüne 2-4 yıl",
    reskillingSuggestions: ["Yapay zeka destekli içerik stratejisti ol", "İçerik için prompt mühendisliğinde ustalaş", "Marka stratejisi uzmanlığı geliştir", "Video/multimedya becerileri edin"],
  },
  "data-analyst": {
    title: "Veri Analisti",
    risk: 68,
    category: "high",
    description: "Veri analizi yüksek yapay zeka etki riskiyle karşı karşıya. Yapay zeka artık verileri insanlardan daha hızlı işleyebiliyor, görselleştirebiliyor ve yorumlayabiliyor. Ancak doğru soruları sormak, paydaşlara içgörüleri iletmek ve bağlamsal iş anlayışı otomatikleştirmesi daha zor.",
    keyTasks: ["Veri temizleme", "Dashboard oluşturma", "SQL sorguları yazma", "İstatistiksel analiz", "İçgörü sunumu"],
    aiThreats: ["Yapay zeka destekli analitik platformları", "Doğal dil veri sorgulama", "Otomatik raporlama", "Yapay zeka örüntü tanıma"],
    safeAspects: ["İş bağlamı yorumlama", "Paydaş iletişimi", "Stratejik soru çerçeveleme", "Fonksiyonlar arası işbirliği"],
    timeline: "Önemli rol dönüşümüne 3-5 yıl",
    reskillingSuggestions: ["Yapay zeka/makine öğrenimi model oluşturmayı öğren", "İş stratejisi becerileri geliştir", "Veri hikaye anlatımında ustalaş", "Ürün analitiği uzmanlığı edin"],
  },
  "graphic-designer": {
    title: "Grafik Tasarımcı",
    risk: 65,
    category: "high",
    description: "Grafik tasarım, yapay zeka görsel üretim araçlarından önemli bir etki yaşıyor. Yapay zeka etkileyici görseller oluşturabilirken, insan tasarımcılar marka tutarlılığı, yaratıcı yönetim ve nüanslı müşteri ihtiyaçlarını anlama konusunda öne çıkıyor.",
    keyTasks: ["Görsel varlık oluşturma", "Marka kimliği tasarımı", "UI/UX tasarımı", "Düzen ve tipografi", "Müşteri sunumları"],
    aiThreats: ["Yapay zeka görsel üretimi (Midjourney, DALL-E)", "Otomatik düzen araçları", "Yapay zeka logo oluşturucular", "Şablon tabanlı tasarım platformları"],
    safeAspects: ["Marka stratejisi ve tutarlılığı", "Yaratıcı yönetim", "Müşteri ilişkileri yönetimi", "UX araştırması ve stratejisi"],
    timeline: "Önemli rol dönüşümüne 3-5 yıl",
    reskillingSuggestions: ["Yapay zeka tasarım araçlarında ustalaş", "UX/ürün tasarımına yönel", "Marka stratejisi becerileri geliştir", "Hareket tasarımı yetenekleri edin"],
  },
  "accountant": {
    title: "Muhasebeci",
    risk: 75,
    category: "critical",
    description: "Muhasebe yüksek otomasyon riskiyle karşı karşıya. Rutin defter tutma, vergi hazırlığı ve finansal raporlama giderek daha fazla yapay zeka tarafından yürütülüyor. Danışmanlık, stratejik planlama ve karmaşık mevzuat yönetimi insana özgü kalmaya devam ediyor.",
    keyTasks: ["Defter tutma", "Vergi hazırlığı", "Finansal raporlama", "Denetim", "Uyumluluk"],
    aiThreats: ["Otomatik defter tutma yazılımları", "Yapay zeka vergi hazırlığı", "Gerçek zamanlı finansal raporlama", "Yapay zeka denetim araçları"],
    safeAspects: ["Stratejik finansal danışmanlık", "Karmaşık vergi planlaması", "Mevzuat yönetimi", "Müşteri ilişkileri yönetimi"],
    timeline: "Önemli rol dönüşümüne 3-5 yıl",
    reskillingSuggestions: ["Finansal danışmanlığa yönel", "Karmaşık vergi stratejisinde uzmanlaş", "Veri analitiği öğren", "Müşteri danışmanlığı becerileri geliştir"],
  },
  "marketing-manager": {
    title: "Pazarlama Müdürü",
    risk: 45,
    category: "moderate",
    description: "Pazarlama yönetimi orta düzeyde etkiyle karşı karşıya. Yapay zeka içerik üretimi, reklam optimizasyonu ve analitiği otomatikleştirirken, stratejik düşünme, marka inşası ve fonksiyonlar arası liderlik yönlerinin yerini almak daha zor.",
    keyTasks: ["Kampanya stratejisi", "Ekip yönetimi", "Bütçe dağılımı", "Marka geliştirme", "Performans analizi"],
    aiThreats: ["Yapay zeka içerik üretimi", "Otomatik reklam optimizasyonu", "Yapay zeka destekli analitik", "Programatik pazarlama"],
    safeAspects: ["Stratejik marka inşası", "Ekip liderliği", "Fonksiyonlar arası işbirliği", "Yaratıcı kampanya vizyonu"],
    timeline: "Önemli rol dönüşümüne 5-8 yıl",
    reskillingSuggestions: ["Yapay zeka pazarlama araçlarında ustalaş", "Marka stratejisine odaklan", "Liderlik becerileri geliştir", "Veriye dayalı karar alma becerisi edin"],
  },
  "customer-service-rep": {
    title: "Müşteri Hizmetleri Temsilcisi",
    risk: 78,
    category: "critical",
    description: "Müşteri hizmetleri rolleri çok yüksek yapay zeka etkisiyle karşı karşıya. Yapay zeka sohbet botları ve sesli asistanlar giderek artan müşteri sorgularını karşılıyor. Karmaşık yönlendirmeler ve duygusal durumlar hâlâ insan dokunuşu gerektiriyor.",
    keyTasks: ["Müşteri sorularını yanıtlama", "Şikayetleri çözme", "İade işleme", "Üst satış", "Dokümantasyon"],
    aiThreats: ["Yapay zeka sohbet botları", "Sesli yapay zeka asistanları", "Otomatik talep yönlendirme", "Self-servis portallar"],
    safeAspects: ["Karmaşık duygusal durumlar", "Yüksek değerli müşteri ilişkileri", "Yaratıcı problem çözümü", "Yönlendirme yönetimi"],
    timeline: "Önemli rol dönüşümüne 2-4 yıl",
    reskillingSuggestions: ["Müşteri başarısı yönetimine geç", "Satış becerileri geliştir", "CRM ve veri analizi öğren", "Uzmanlaşmış ürün bilgisi edin"],
  },
  "product-manager": {
    title: "Ürün Yöneticisi",
    risk: 30,
    category: "moderate",
    description: "Ürün yönetimi görece düşük yapay zeka etki riskine sahip. Rol temelde insan yargısı, paydaş yönetimi ve stratejik karar verme üzerine kurulu — yapay zekanın desteklediği ama yerini alamadığı alanlar.",
    keyTasks: ["Ürün stratejisi", "Yol haritası planlaması", "Paydaş uyumu", "Kullanıcı araştırması", "Önceliklendirme"],
    aiThreats: ["Yapay zeka destekli kullanıcı analitiği", "Otomatik A/B testi", "Yapay zeka ürün önerileri", "Otomatik pazar araştırması"],
    safeAspects: ["Stratejik vizyon", "Fonksiyonlar arası liderlik", "Belirsiz karar verme", "Paydaş etkisi"],
    timeline: "Önemli rol dönüşümüne 8-10 yıl",
    reskillingSuggestions: ["Yapay zeka ürün özelliklerinde ustalaş", "Veri bilimi anlayışını derinleştir", "Yapay zeka strateji uzmanlığı edin", "Daha güçlü teknik beceriler geliştir"],
  },
};

// Generate static paths for SEO
export async function generateStaticParams() {
  return Object.keys(JOB_SEO_DATA).map((slug) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = JOB_SEO_DATA[slug];
  if (!job) return {};

  return {
    title: `${job.title} Yapay Zeka Risk Skoru: ${job.risk}/100 — Yapay Zeka ${job.title} Mesleğinin Yerini Alacak mı? | SkillShield`,
    description: `${job.title} yapay zeka otomasyon riski ${job.risk}/100 (${job.category}). ${job.description.slice(0, 120)}... Kişiselleştirilmiş skorunu al.`,
    openGraph: {
      title: `${job.title} Yapay Zeka Riski: ${job.risk}/100 — Mesleğin Güvende mi?`,
      description: `${job.description.slice(0, 200)}...`,
    },
  };
}

export default async function JobSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOB_SEO_DATA[slug];

  if (!job) {
    notFound();
  }

  const categoryColor = job.category === "critical" ? "text-danger"
    : job.category === "high" ? "text-warning"
    : job.category === "moderate" ? "text-accent"
    : "text-success";

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </Link>
        <Link
          href="/quiz"
          className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
        >
          Skorunu Al
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm mb-4 border ${
            job.category === "critical" ? "bg-danger/10 border-danger/30 text-danger"
            : job.category === "high" ? "bg-warning/10 border-warning/30 text-warning"
            : job.category === "moderate" ? "bg-accent/10 border-accent/30 text-accent"
            : "bg-success/10 border-success/30 text-success"
          }`}>
            {job.category.toUpperCase()} RİSK
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Yapay Zeka {" "}
            <span className={categoryColor}>{job.title}</span> Mesleğinin Yerini Alacak mı?
          </h1>
          <p className="text-gray-400 text-lg">
            Yapay Zeka Kariyer Risk Skoru: <span className={`font-bold text-2xl ${categoryColor}`}>{job.risk}/100</span>
          </p>
        </div>

        {/* Description */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8">
          <p className="text-gray-300 leading-relaxed">{job.description}</p>
          <p className="text-sm text-gray-500 mt-4">{job.timeline}</p>
        </div>

        {/* Two columns: Threats vs Safe */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-card-bg border border-danger/30 rounded-2xl p-6">
            <h2 className="font-bold text-danger mb-4">Yapay Zeka Tehditleri</h2>
            <ul className="space-y-2">
              {job.aiThreats.map((threat, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-danger mt-0.5">!</span> {threat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card-bg border border-success/30 rounded-2xl p-6">
            <h2 className="font-bold text-success mb-4">Güvenli Yönler</h2>
            <ul className="space-y-2">
              {job.safeAspects.map((aspect, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-success mt-0.5">+</span> {aspect}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reskilling suggestions */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8">
          <h2 className="font-bold mb-4">Kariyerini Geleceğe Nasıl Hazırlarsın?</h2>
          <ol className="space-y-3">
            {job.reskillingSuggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {suggestion}
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            Bu ortalama {job.title} skoru.
            <br />
            Seninki kaç?
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Kişisel skorun, görevlerine, yapay zeka kullanımına ve kariyer yoluna bağlı.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Kişisel Skorunu Al →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Ücretsiz · 2 dakika · Kayıt gerekmez</p>
        </div>

        {/* Other jobs (internal linking for SEO) */}
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Diğer Mesleklerin Yapay Zeka Risk Skorları</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(JOB_SEO_DATA)
              .filter(([s]) => s !== slug)
              .slice(0, 8)
              .map(([s, j]) => (
                <Link
                  key={s}
                  href={`/jobs/${s}`}
                  className="bg-card-bg border border-card-border rounded-xl p-3 text-center hover:border-accent/50 transition-colors"
                >
                  <div className="text-sm font-semibold">{j.title}</div>
                  <div className={`text-lg font-bold ${
                    j.risk >= 75 ? "text-danger"
                    : j.risk >= 50 ? "text-warning"
                    : j.risk >= 30 ? "text-accent"
                    : "text-success"
                  }`}>
                    {j.risk}/100
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `Yapay Zeka ${job.title} Mesleğinin Yerini Alacak mı? Yapay Zeka Risk Skoru: ${job.risk}/100`,
              description: job.description,
              author: {
                "@type": "Organization",
                name: "SkillShield",
              },
            }),
          }}
        />

        {/* Browse all categories */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Analiz edilen tüm{" "}
            <span className="text-accent">{jobCategories.length}</span>{" "}
            meslek kategorisini gör
          </p>
        </div>
      </article>
    </main>
  );
}
