import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getPropertyBySlug } from "@/lib/sanity";
import ConsultationForm from "@/components/ConsultationForm";
import { ArrowLeft, MapPin, Maximize2, Building, Check, Sparkles } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function OfficeDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const commonT = await getTranslations("Common");
  const officeT = await getTranslations("Offices");
  const propT = await getTranslations("Properties"); // Sử dụng cho nút backToList

  const prop = await getPropertyBySlug(slug);

  if (!prop || prop.type !== "office") {
    notFound();
  }

  const isEn = locale === 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Nút quay lại */}
      <div>
        <Link
          href="/offices"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-charcoal/60 hover:text-clay-accent transition-editorial"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{propT("backToList")}</span>
        </Link>
      </div>

      {/* Tiêu đề & Địa điểm */}
      <div className="space-y-4">
        <div className="flex items-center text-xs text-clay-accent uppercase tracking-[0.2em] font-semibold">
          <span>{commonT("office")}</span>
          <span className="mx-2 text-stone">•</span>
          <span className="text-charcoal/50">{prop.location[locale as 'vi' | 'en']}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal leading-tight max-w-4xl">
          {prop.title[locale as 'vi' | 'en']}
        </h1>
        <div className="flex items-center text-sm text-charcoal/50">
          <MapPin className="h-4 w-4 mr-1 text-clay-accent" />
          <span>{prop.location[locale as 'vi' | 'en']}</span>
        </div>
      </div>

      {/* Ảnh bìa lớn */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden border border-stone/30 bg-linen">
        <Image
          src={prop.image}
          alt={prop.title[locale as 'vi' | 'en']}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-editorial hover:scale-[1.01]"
        />
      </div>

      {/* Cấu trúc cột kép */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Cột trái */}
        <div className="lg:col-span-8 space-y-12">
          {/* Mô tả */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-charcoal border-b border-stone/20 pb-3">
              {officeT("detailsTitle")}
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans whitespace-pre-line">
              {prop.description[locale as 'vi' | 'en']}
            </p>
          </div>

          {/* Tiện ích tòa nhà */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-charcoal border-b border-stone/20 pb-3">
              {officeT("amenitiesTitle")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {prop.amenities[locale as 'vi' | 'en'].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-sm text-charcoal/80">
                  <Check className="h-4 w-4 text-sage" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phù hợp lối sống doanh nghiệp */}
          <div className="space-y-6 p-8 bg-linen/30 border border-stone/20">
            <h2 className="font-serif text-2xl text-charcoal flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-clay-accent" />
              <span>{officeT("lifestyleTitle")}</span>
            </h2>
            <div className="space-y-3">
              {prop.lifestyleMatch[locale as 'vi' | 'en'].map((item) => (
                <div key={item} className="flex items-start space-x-3 text-sm text-charcoal/70">
                  <span className="w-1.5 h-1.5 bg-clay rounded-full mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="lg:col-span-4 space-y-8">
          {/* Bảng thông số */}
          <div className="border border-stone/30 bg-linen/20 p-6 space-y-4">
            <h3 className="font-serif text-lg text-charcoal uppercase tracking-wider">
              {officeT("factsTitle")}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-stone/20 pb-2">
                <span className="text-charcoal/50">{isEn ? "Rent Fee" : "Phí thuê"}</span>
                <span className="font-semibold text-clay-accent">{prop.price[locale as 'vi' | 'en']}</span>
              </div>
              <div className="flex justify-between border-b border-stone/20 pb-2">
                <span className="text-charcoal/50">{commonT("area")}</span>
                <span className="font-medium">{prop.area}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-charcoal/50">{isEn ? "Handover" : "Bàn giao"}</span>
                <span className="text-right max-w-[180px] truncate" title={prop.furnishing[locale as 'vi' | 'en']}>
                  {prop.furnishing[locale as 'vi' | 'en']}
                </span>
              </div>
            </div>
          </div>

          {/* Ghi chú của Kayla */}
          <div className="border-l-4 border-clay bg-linen p-6 space-y-4 rounded-r shadow-sm">
            <h3 className="font-serif text-lg text-clay-accent font-semibold italic">
              <span>{commonT("kaylaNote")}</span>
            </h3>
            <p className="kayla-handwriting text-sm text-charcoal/80 leading-relaxed italic">
              "{prop.kaylaNote[locale as 'vi' | 'en']}"
            </p>
            <p className="text-xs uppercase tracking-wider text-charcoal/50 font-bold text-right pt-2 border-t border-stone/10">
              — Kayla Nguyen
            </p>
          </div>

          {/* CTA */}
          <a
            href="#consult-form"
            className="block w-full text-center bg-charcoal hover:bg-clay-accent text-ivory text-xs uppercase tracking-widest font-semibold py-4 transition-editorial"
          >
            {officeT("contactCTA")}
          </a>
        </div>
      </div>

      <div id="consult-form" className="pt-16 border-t border-stone/20 max-w-4xl mx-auto">
        <ConsultationForm />
      </div>
    </div>
  );
}
