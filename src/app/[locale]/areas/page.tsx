import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getAreas } from "@/lib/sanity";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AreasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const areasT = await getTranslations("Areas");
  const areas = await getAreas();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Header trang */}
      <div className="space-y-4 max-w-xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {areasT("tagline")}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
          {t("areas")}
        </h1>
        <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
          {areasT("description")}
        </p>
      </div>

      <div className="w-full h-[1px] bg-stone/30"></div>

      {/* Lưới khu vực */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {areas.map((area) => (
          <div
            key={area.slug}
            className="group relative h-96 w-full overflow-hidden border border-stone/30 bg-charcoal"
          >
            <Image
              src={area.image}
              alt={area.title[locale as 'vi' | 'en']}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-60 transition-editorial group-hover:scale-[1.02] group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-ivory space-y-3">
              <h3 className="font-serif text-3xl">
                {area.title[locale as 'vi' | 'en']}
              </h3>
              <p className="text-sm text-ivory/80 italic font-serif leading-relaxed line-clamp-2">
                {area.tagline[locale as 'vi' | 'en']}
              </p>
              <div className="pt-2">
                <Link
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-ivory hover:text-clay-accent transition-editorial border-b border-ivory/20 pb-0.5"
                >
                  <span>{areasT("exploreArea")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
