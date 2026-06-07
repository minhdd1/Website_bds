import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getJournalPostBySlug } from "@/lib/sanity";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function JournalDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const journalT = await getTranslations("Journal");
  const post = await getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-500">
      {/* Nút quay lại */}
      <div>
        <Link
          href="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-charcoal/60 hover:text-clay-accent transition-editorial"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{journalT("backToList")}</span>
        </Link>
      </div>

      {/* Thông tin biên tập & Tiêu đề */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-4 text-xs uppercase tracking-wider font-semibold text-clay-accent">
          <span className="flex items-center">
            <Tag className="h-3.5 w-3.5 mr-1" />
            {post.categoryName[locale as 'vi' | 'en']}
          </span>
          <span className="text-stone">|</span>
          <span className="flex items-center text-charcoal/50 font-normal">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {post.date}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal leading-tight">
          {post.title[locale as 'vi' | 'en']}
        </h1>
        <p className="text-base text-charcoal/60 italic font-serif max-w-2xl mx-auto leading-relaxed pt-2">
          {post.excerpt[locale as 'vi' | 'en']}
        </p>
      </div>

      {/* Ảnh bài viết */}
      <div className="relative h-[250px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden border border-stone/30 bg-linen">
        <Image
          src={post.image}
          alt={post.title[locale as 'vi' | 'en']}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-editorial hover:scale-[1.01]"
        />
      </div>

      {/* Nội dung bài viết */}
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-base text-charcoal/80 leading-loose font-sans whitespace-pre-line first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-clay-accent">
          {post.content[locale as 'vi' | 'en']}
        </p>
      </div>

      {/* Footer bài viết */}
      <div className="max-w-2xl mx-auto pt-8 border-t border-stone/20 text-center">
        <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold">
          {locale === 'en' ? "Kayla Nguyen Living Journal" : "Nhật ký sống Kayla Nguyen"}
        </p>
      </div>
    </article>
  );
}
