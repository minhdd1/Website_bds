import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getProperties, getJournalPosts, getAreas, getHomepage } from "@/lib/sanity";
import ConsultationForm from "@/components/ConsultationForm";
import { ArrowUpRight, BedDouble, Bath, Maximize2, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

// Helper parser to support styling in Hero Title loaded from Sanity
function parseHeroTitle(text: string) {
  const regex = /<(large|small)>(.*?)<\/\1>/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const type = match[1];
    const content = match[2];
    if (type === 'large') {
      parts.push(
        <span key={match.index} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal block">
          {content}
        </span>
      );
    } else if (type === 'small') {
      parts.push(
        <span key={match.index} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal block mt-1.5">
          {content}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Tải bản dịch tiếng Việt/Anh tương ứng từ tệp JSON (Dùng làm Fallback)
  const t = await getTranslations("Homepage");
  const commonT = await getTranslations("Common");

  // Tải dữ liệu song ngữ từ Sanity
  const properties = await getProperties();
  const journalPosts = await getJournalPosts();
  const areas = await getAreas();
  const hData = await getHomepage();

  const featuredProperties = properties.slice(0, 3);
  const featuredJournalPosts = journalPosts.slice(0, 2);

  const isEn = locale === 'en';

  // Helper helper lấy trường dịch thuật, fallback về giá trị mặc định
  const getVal = (field: any, fallback: any) => {
    if (field && field[locale]) {
      return field[locale];
    }
    return fallback;
  };

  // Render tiêu đề Hero
  const heroTitleEl = hData?.heroTitle?.[locale] ? (
    parseHeroTitle(hData.heroTitle[locale])
  ) : (
    t.rich("heroTitle", {
      large: (chunks) => <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal block">{chunks}</span>,
      small: (chunks) => <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal block mt-1.5">{chunks}</span>
    })
  );

  return (
    <div className="space-y-24 pb-24 animate-in fade-in duration-500">
      {/* 1. HERO SECTION (Phong cách Biên tập Báo chí - Side-by-Side) */}
      <section className="relative bg-linen border-b border-stone/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 lg:py-24 items-center">
            {/* Cột trái */}
            <div className="lg:col-span-5 space-y-6">
              <h1 className="text-charcoal leading-[1.1] flex flex-col">
                {heroTitleEl}
              </h1>
              <p className="text-base text-charcoal/70 leading-relaxed font-sans max-w-lg">
                {getVal(hData?.heroSubtitle, t("heroSubtitle"))}
              </p>
              <div className="pt-4">
                <Link
                  href="/properties"
                  className="inline-flex items-center space-x-2 bg-charcoal hover:bg-clay-accent text-ivory text-xs uppercase tracking-widest font-semibold py-4 px-8 transition-editorial"
                >
                  <span>{t("viewAllProperties")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Cột phải */}
            <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[550px] w-full overflow-hidden shadow-sm">
              <Image
                src="/home_hero.png"
                alt="Minimalist Living Space"
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-editorial hover:scale-[1.02]"
              />
              <div className="absolute bottom-6 right-6 bg-ivory/90 backdrop-blur-sm px-4 py-2 border border-stone/40 text-[10px] tracking-widest uppercase font-semibold text-charcoal">
                {isEn ? "Thao Dien, Dist.2 • Ivory Apartment" : "Thảo Điền, Q.2 • Ivory Apartment"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SPACES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
            {getVal(hData?.featuredTitle, t("featuredTitle"))}
          </h2>
          <p className="text-sm text-charcoal/60 max-w-2xl mx-auto">
            {getVal(hData?.featuredSubtitle, t("featuredSubtitle"))}
          </p>
          <div className="w-12 h-[1px] bg-clay mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <div
              key={prop.slug}
              className="group flex flex-col border border-stone/30 bg-ivory overflow-hidden transition-editorial hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden border-b border-stone/30">
                <Image
                  src={prop.image}
                  alt={prop.title[locale as 'vi' | 'en']}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-editorial group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-ivory/95 px-3 py-1 border border-stone/30 text-[10px] tracking-wider uppercase font-bold text-charcoal">
                  {prop.type === "apartment" ? commonT("apartment") : commonT("office")}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-charcoal/50 font-medium">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-clay-accent" />
                    <span>{prop.location[locale as 'vi' | 'en']}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal line-clamp-1 group-hover:text-clay-accent transition-editorial">
                    <Link href={prop.type === "apartment" ? `/properties/${prop.slug}` : `/offices/${prop.slug}`}>
                      {prop.title[locale as 'vi' | 'en']}
                    </Link>
                  </h3>
                  <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed">
                    {prop.excerpt[locale as 'vi' | 'en']}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-y border-stone/20 py-3 text-center text-xs text-charcoal/70">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Maximize2 className="h-3.5 w-3.5 text-charcoal/40" />
                    <span>{prop.area}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-1 border-x border-stone/20">
                    <BedDouble className="h-3.5 w-3.5 text-charcoal/40" />
                    <span>
                      {prop.bedrooms ? `${prop.bedrooms} ${commonT("bedrooms")}` : commonT("notAvailable")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Bath className="h-3.5 w-3.5 text-charcoal/40" />
                    <span>
                      {prop.bathrooms ? `${prop.bathrooms} ${commonT("bathrooms")}` : commonT("notAvailable")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">
                      {commonT("price")}
                    </span>
                    <span className="text-sm font-semibold text-clay-accent">
                      {prop.price[locale as 'vi' | 'en']}
                    </span>
                  </div>
                  <Link
                    href={prop.type === "apartment" ? `/properties/${prop.slug}` : `/offices/${prop.slug}`}
                    className="text-xs uppercase tracking-wider font-bold text-charcoal group-hover:text-clay-accent transition-editorial flex items-center space-x-1"
                  >
                    <span>{commonT("viewDetails")}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIVING JOURNAL SECTION */}
      <section className="bg-linen py-20 border-y border-stone/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                {getVal(hData?.journalTitle, t("journalTitle"))}
              </h2>
              <p className="text-sm text-charcoal/60">
                {getVal(hData?.journalSubtitle, t("journalSubtitle"))}
              </p>
            </div>
            <Link
              href="/journal"
              className="mt-4 md:mt-0 text-xs uppercase tracking-wider font-bold text-charcoal hover:text-clay-accent transition-editorial flex items-center space-x-1 border-b border-charcoal/20 pb-0.5"
            >
              <span>{t("viewAllPosts")}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredJournalPosts.map((post) => (
              <article key={post.slug} className="group grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 relative h-48 w-full overflow-hidden border border-stone/30">
                  <Image
                    src={post.image}
                    alt={post.title[locale as 'vi' | 'en']}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover transition-editorial group-hover:scale-105"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] tracking-wider uppercase font-bold text-clay-accent">
                    <span>{post.categoryName[locale as 'vi' | 'en']}</span>
                    <span className="text-stone">•</span>
                    <span className="text-charcoal/40 font-normal">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-clay-accent transition-editorial">
                    <Link href={`/journal/${post.slug}`}>
                      {post.title[locale as 'vi' | 'en']}
                    </Link>
                  </h3>
                  <p className="text-xs text-charcoal/60 leading-relaxed line-clamp-3">
                    {post.excerpt[locale as 'vi' | 'en']}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AREA GUIDES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
            {getVal(hData?.areasTitle, t("areasTitle"))}
          </h2>
          <p className="text-sm text-charcoal/60 max-w-2xl mx-auto">
            {getVal(hData?.areasSubtitle, t("areasSubtitle"))}
          </p>
          <div className="w-12 h-[1px] bg-clay mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area) => (
            <div
              key={area.slug}
              className="relative group h-80 w-full overflow-hidden border border-stone/30 bg-charcoal"
            >
              <Image
                src={area.image}
                alt={area.title[locale as 'vi' | 'en']}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-60 transition-editorial group-hover:scale-[1.03] group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-ivory space-y-2">
                <h3 className="font-serif text-2xl">
                  {area.title[locale as 'vi' | 'en']}
                </h3>
                <p className="text-xs text-ivory/80 italic font-serif">
                  {area.tagline[locale as 'vi' | 'en']}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/areas/${area.slug}`}
                    className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-ivory hover:text-clay-accent transition-editorial"
                  >
                    <span>{t("exploreArea")}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ABOUT KAYLA SECTION (Giao diện Kính & Ánh sáng tự nhiên) */}
      <section className="bg-linen/40 py-20 border-y border-stone/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Chân dung */}
            <div className="lg:col-span-5 relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden border border-stone/40 shadow-sm bg-linen">
              <Image
                src="/kayla_portrait.png"
                alt="Kayla Nguyen Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
            {/* Câu chuyện cá nhân */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
                {getVal(hData?.aboutTag, t("aboutTag"))}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                {getVal(hData?.aboutTitle, t("aboutTitle"))}
              </h2>
              <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed font-sans">
                <p>{getVal(hData?.aboutText1, t("aboutText1"))}</p>
                <p>{getVal(hData?.aboutText2, t("aboutText2"))}</p>
              </div>
              {/* Kayla Note đặc trưng dạng chữ viết tay */}
              <div className="border-l-2 border-clay pl-6 py-1 italic font-serif text-lg text-charcoal/80 bg-linen/20 rounded-r">
                "{getVal(hData?.aboutQuote, t("aboutQuote"))}"
                <p className="text-xs uppercase tracking-widest font-bold text-charcoal/60 mt-2 not-italic font-sans">
                  — Kayla Nguyen
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs uppercase tracking-wider font-bold text-charcoal hover:text-clay-accent border-b border-charcoal/20 pb-0.5 transition-editorial inline-flex items-center space-x-1"
                >
                  <span>{t("readMoreAbout")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION SECTION */}
      <section id="consultation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
              {getVal(hData?.connectTag, t("connectTag"))}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
              {getVal(hData?.connectTitle, t("connectTitle"))}
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans">
              {getVal(hData?.connectText, t("connectText"))}
            </p>
            <div className="space-y-3 text-xs text-charcoal/50 font-sans">
              <p>{getVal(hData?.officeLocation, t("officeLocation"))}</p>
              <p>📞 +84 (0) 90 123 4567</p>
              <p>✉️ contact@kaylanguyen.vn</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
