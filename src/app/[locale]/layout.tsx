import { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

// Tải font chữ serif Cormorant Garamond cho các tiêu đề biên tập phong cách báo chí
const cormorant = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Tải font chữ sans-serif Inter cho các mô tả thông tin và văn bản thân
const inter = Inter({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Xác thực tiền tố ngôn ngữ có hợp lệ không
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Đăng ký locale cho các hàm server của next-intl
  setRequestLocale(locale);

  // Tải nội dung bản dịch từ messages/*.json
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full antialiasedScroll`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
