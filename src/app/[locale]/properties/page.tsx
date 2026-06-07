import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getProperties } from "@/lib/sanity";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const commonT = await getTranslations("Common");
  const propT = await getTranslations("Properties");

  const allProperties = await getProperties();
  const apartments = allProperties.filter((p) => p.type === "apartment");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Header trang */}
      <div className="space-y-4 max-w-xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {propT("tagline")}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
          {t("properties")}
        </h1>
        <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
          {propT("description")}
        </p>
      </div>

      <div className="w-full h-[1px] bg-stone/30"></div>

      {/* Lưới căn hộ */}
      {apartments.length === 0 ? (
        <p className="text-sm text-charcoal/50 italic">{commonT("notAvailable")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((prop) => (
            <div
              key={prop.slug}
              className="group flex flex-col border border-stone/30 bg-ivory overflow-hidden transition-editorial hover:shadow-md"
            >
              {/* Ảnh */}
              <div className="relative h-64 w-full overflow-hidden border-b border-stone/30">
                <Image
                  src={prop.image}
                  alt={prop.title[locale as 'vi' | 'en']}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-editorial group-hover:scale-105"
                />
              </div>

              {/* Thông tin */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-charcoal/50 font-medium">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-clay-accent" />
                    <span>{prop.location[locale as 'vi' | 'en']}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal line-clamp-1 group-hover:text-clay-accent transition-editorial">
                    <Link href={`/properties/${prop.slug}`}>
                      {prop.title[locale as 'vi' | 'en']}
                    </Link>
                  </h3>
                  <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed">
                    {prop.excerpt[locale as 'vi' | 'en']}
                  </p>
                </div>

                {/* Facts */}
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

                {/* Giá & Xem thêm */}
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
                    href={`/properties/${prop.slug}`}
                    className="text-xs uppercase tracking-wider font-bold text-charcoal group-hover:text-clay-accent transition-editorial inline-flex items-center space-x-1"
                  >
                    <span>{commonT("viewDetails")}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
