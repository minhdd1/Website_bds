import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getAreaBySlug, getProperties } from "@/lib/sanity";
import { ArrowLeft, Compass, Users, Landmark, MapPin, ArrowUpRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function AreaDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const commonT = await getTranslations("Common");
  const areasT = await getTranslations("Areas");

  const area = await getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  // Lấy các bất động sản thuộc khu vực này
  const properties = await getProperties();
  const relatedProperties = properties.filter((p) => {
    const loc = p.location[locale as 'vi' | 'en'].toLowerCase();
    const areaTitle = area.title[locale as 'vi' | 'en'].toLowerCase();
    
    return loc.includes(slug) || 
           loc.includes(areaTitle) || 
           (slug === 'thao-dien' && loc.includes('thảo điền')) ||
           (slug === 'quan-1' && (loc.includes('quận 1') || loc.includes('district 1')));
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Nút quay lại */}
      <div>
        <Link
          href="/areas"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-charcoal/60 hover:text-clay-accent transition-editorial"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{areasT("backToList")}</span>
        </Link>
      </div>

      {/* Tiêu đề & Tagline */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {areasT("exploreTag")}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal leading-tight">
          {area.title[locale as 'vi' | 'en']}
        </h1>
        <p className="font-serif text-lg italic text-charcoal/80">
          "{area.tagline[locale as 'vi' | 'en']}"
        </p>
      </div>

      {/* Ảnh khu vực */}
      <div className="relative h-[300px] sm:h-[450px] lg:h-[550px] w-full overflow-hidden border border-stone/30 bg-linen">
        <Image
          src={area.image}
          alt={area.title[locale as 'vi' | 'en']}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-editorial hover:scale-[1.01]"
        />
      </div>

      {/* Bố cục nội dung */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Cột trái */}
        <div className="lg:col-span-8 space-y-12">
          {/* Tổng quan */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-charcoal flex items-center space-x-2 border-b border-stone/20 pb-3">
              <Landmark className="h-5 w-5 text-clay-accent" />
              <span>{areasT("overviewTitle")}</span>
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans whitespace-pre-line">
              {area.overview[locale as 'vi' | 'en']}
            </p>
          </div>

          {/* Bầu không khí */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-charcoal flex items-center space-x-2 border-b border-stone/20 pb-3">
              <Compass className="h-5 w-5 text-clay-accent" />
              <span>{areasT("atmosphereTitle")}</span>
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans whitespace-pre-line">
              {area.atmosphere[locale as 'vi' | 'en']}
            </p>
          </div>

          {/* Phù hợp với ai */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-charcoal flex items-center space-x-2 border-b border-stone/20 pb-3">
              <Users className="h-5 w-5 text-clay-accent" />
              <span>{areasT("whoIsItForTitle")}</span>
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans whitespace-pre-line">
              {area.whoIsItFor[locale as 'vi' | 'en']}
            </p>
          </div>
        </div>

        {/* Cột phải: Bất động sản nổi bật */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-serif text-xl text-charcoal border-b border-stone/20 pb-3">
            {areasT("relatedPropertiesTitle")}
          </h3>
          {relatedProperties.length === 0 ? (
            <p className="text-sm text-charcoal/50 italic">{areasT("noProperties")}</p>
          ) : (
            <div className="space-y-6">
              {relatedProperties.map((prop) => (
                <div
                  key={prop.slug}
                  className="group flex flex-col border border-stone/30 bg-ivory overflow-hidden transition-editorial hover:shadow-md"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title[locale as 'vi' | 'en']}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-editorial group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-clay-accent font-bold">
                      {prop.type === "apartment" ? commonT("apartment") : commonT("office")}
                    </span>
                    <h4 className="font-serif text-base text-charcoal line-clamp-1 group-hover:text-clay-accent transition-editorial">
                      {prop.title[locale as 'vi' | 'en']}
                    </h4>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-xs text-charcoal/60">{prop.area}</span>
                      <span className="text-sm font-semibold text-clay-accent">{prop.price[locale as 'vi' | 'en']}</span>
                    </div>
                    <div className="pt-2 border-t border-stone/10 flex justify-end">
                      <Link
                        href={prop.type === "apartment" ? `/properties/${prop.slug}` : `/offices/${prop.slug}`}
                        className="text-xs uppercase tracking-wider font-bold text-charcoal group-hover:text-clay-accent transition-editorial flex items-center space-x-1"
                      >
                        <span>{areasT("detailsLink")}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
