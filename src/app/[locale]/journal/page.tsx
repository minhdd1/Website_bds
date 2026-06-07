import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getJournalPosts } from "@/lib/sanity";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const journalT = await getTranslations("Journal");
  const posts = await getJournalPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Header trang */}
      <div className="space-y-4 max-w-xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {journalT("tagline")}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
          {t("journal")}
        </h1>
        <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
          {journalT("description")}
        </p>
      </div>

      <div className="w-full h-[1px] bg-stone/30"></div>

      {/* Danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col space-y-4 border border-stone/20 bg-ivory p-6 transition-editorial hover:shadow-md"
          >
            {/* Ảnh bài viết */}
            <div className="relative h-64 w-full overflow-hidden border border-stone/30 bg-linen">
              <Image
                src={post.image}
                alt={post.title[locale as 'vi' | 'en']}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-editorial group-hover:scale-105"
              />
            </div>

            {/* Thông tin bài viết */}
            <div className="space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] tracking-wider uppercase font-bold text-clay-accent">
                  <span>{post.categoryName[locale as 'vi' | 'en']}</span>
                  <span className="text-stone">•</span>
                  <span className="text-charcoal/40 font-normal">{post.date}</span>
                </div>
                <h2 className="font-serif text-2xl text-charcoal group-hover:text-clay-accent transition-editorial">
                  <Link href={`/journal/${post.slug}`}>
                    {post.title[locale as 'vi' | 'en']}
                  </Link>
                </h2>
                <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-3">
                  {post.excerpt[locale as 'vi' | 'en']}
                </p>
              </div>

              <div className="pt-4 border-t border-stone/10 flex justify-end">
                <Link
                  href={`/journal/${post.slug}`}
                  className="text-xs uppercase tracking-wider font-bold text-charcoal group-hover:text-clay-accent transition-editorial flex items-center space-x-1"
                >
                  <span>{journalT("readMore")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
