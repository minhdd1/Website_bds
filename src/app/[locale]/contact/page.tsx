import { setRequestLocale } from "next-intl/server";
import ConsultationForm from "@/components/ConsultationForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-500">
      {/* Header Trang */}
      <div className="space-y-4 max-w-xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {isEn ? "Connect" : "Kết nối"}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
          {isEn ? "Contact & Consultation" : "Liên hệ & Tư vấn"}
        </h1>
        <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
          {isEn 
            ? "Start your journey to find the ideal home or workspace by contacting Kayla Nguyen directly."
            : "Hãy bắt đầu hành trình tìm kiếm tổ ấm hoặc không gian làm việc lý tưởng của bạn bằng việc liên hệ trực tiếp với Kayla Nguyen."}
        </p>
      </div>

      <div className="w-full h-[1px] bg-stone/30"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cột trái: Thông tin liên hệ */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-stone/30 bg-linen/20 p-8 space-y-6">
            <h3 className="font-serif text-xl text-charcoal uppercase tracking-wider border-b border-stone/20 pb-3">
              {isEn ? "Contact Information" : "Thông tin liên hệ"}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-clay-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-charcoal/70 uppercase text-xs tracking-wider mb-1">
                    {isEn ? "Office Location" : "Địa điểm văn phòng"}
                  </h4>
                  <p className="text-charcoal/80 leading-relaxed">
                    {isEn ? "Thao Dien Ward, District 2, Ho Chi Minh City" : "Phường Thảo Điền, Quận 2, TP. Hồ Chí Minh"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Phone className="h-5 w-5 text-clay-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-charcoal/70 uppercase text-xs tracking-wider mb-1">
                    {isEn ? "Phone / Hotline" : "Điện thoại / Hotline"}
                  </h4>
                  <p className="text-charcoal/80">+84 (0) 90 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-5 w-5 text-clay-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-charcoal/70 uppercase text-xs tracking-wider mb-1">
                    {isEn ? "Email Address" : "Thư điện tử"}
                  </h4>
                  <p className="text-charcoal/80">contact@kaylanguyen.vn</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Clock className="h-5 w-5 text-clay-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-charcoal/70 uppercase text-xs tracking-wider mb-1">
                    {isEn ? "Working Hours" : "Giờ làm việc"}
                  </h4>
                  <p className="text-charcoal/80">
                    {isEn ? "Mon - Sat: 9:00 AM - 6:00 PM" : "Thứ 2 - Thứ 7: 9:00 - 18:00"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bản đồ định vị giả lập */}
          <div className="border border-stone/30 relative h-64 w-full bg-linen flex items-center justify-center text-center p-6">
            <div className="absolute inset-0 bg-stone/10 mix-blend-multiply"></div>
            <div className="relative z-10 space-y-2">
              <MapPin className="h-8 w-8 text-clay-accent mx-auto" />
              <h4 className="font-serif text-lg text-charcoal">
                {isEn ? "Thao Dien, District 2" : "Thảo Điền, Quận 2"}
              </h4>
              <p className="text-xs text-charcoal/50 uppercase tracking-widest">Google Map Location</p>
            </div>
          </div>
        </div>

        {/* Cột phải: Biểu mẫu tư vấn */}
        <div className="lg:col-span-7">
          <ConsultationForm />
        </div>
      </div>
    </div>
  );
}
