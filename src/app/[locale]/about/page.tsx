import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Sparkles, Heart, Eye, ShieldCheck, Compass } from "lucide-react";
import { getBrandStory } from "@/lib/sanity";

type Props = {
  params: Promise<{ locale: string }>;
};

// Map icon strings from Sanity to Lucide Components
function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'Eye':
      return <Eye className="h-6 w-6 text-clay-accent" />;
    case 'Compass':
      return <Compass className="h-6 w-6 text-clay-accent" />;
    case 'ShieldCheck':
      return <ShieldCheck className="h-6 w-6 text-clay-accent" />;
    case 'Heart':
      return <Heart className="h-6 w-6 text-clay-accent" />;
    default:
      return <Sparkles className="h-6 w-6 text-clay-accent" />;
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Tùy theo ngôn ngữ, chọn nội dung text phù hợp cho fallback
  const isEn = locale === 'en';

  const localFallbackContent = {
    title: isEn ? "About Kayla Nguyen" : "Về Kayla Nguyen",
    subtitle: isEn 
      ? "Editorial Real Estate Consultant & Living Space Storyteller" 
      : "Nhà tư vấn bất động sản biên tập & Kẻ kể chuyện không gian sống",
    intro: isEn
      ? "I believe that a home is not just a layout of walls, but a container of energy and emotions that shapes who we are."
      : "Tôi tin rằng một ngôi nhà không chỉ là những bức tường ngăn cách vật lý, mà là một nơi chứa đựng năng lượng và cảm xúc, định hình nên con người chúng ta.",
    storyTitle: isEn ? "My Philosophy" : "Triết lý của tôi",
    storyText1: isEn
      ? "For many years, I have worked in Ho Chi Minh City's high-end property market. I noticed that most buyers and renters are overwhelmed by aggressive sales pitches, luxury gold mockups, and complex financial talk that strip away the human side of finding a home."
      : "Nhiều năm làm việc trong thị trường bất động sản cao cấp tại TP. Hồ Chí Minh, tôi nhận thấy phần lớn khách hàng đang bị choáng ngợp bởi những lời chào mời mua bán dồn dập, những thiết kế giả kim xa hoa hay những con số tài chính phức tạp làm mất đi phần nhân văn của hành trình tìm kiếm tổ ấm.",
    storyText2: isEn
      ? "That is why I created 'Editorial Real Estate'. By applying an artistic, calm, and observant lens, I treat every property like an artwork with its own story. My goal is to listen deeply to your lifestyle requirements and match you with a space that reflects who you truly are."
      : "Đó là lý do tôi xây dựng mô hình 'Bất động sản Biên tập'. Bằng lăng kính duy mỹ, điềm tĩnh và quan sát tinh tế, tôi xem mỗi căn hộ hay văn phòng như một tác phẩm nghệ thuật có câu chuyện riêng. Mục tiêu của tôi là lắng nghe sâu sắc về phong cách sống của bạn và tìm kiếm một không gian thực sự đồng điệu.",
    valuesTitle: isEn ? "Core Values" : "Giá trị cốt lõi",
    values: [
      {
        icon: <Eye className="h-6 w-6 text-clay-accent" />,
        title: isEn ? "Observant" : "Quan sát tinh tế",
        desc: isEn 
          ? "Paying attention to small details, natural light, and the subtle energy of each space."
          : "Chú ý đến từng chi tiết nhỏ nhặt, hướng đón nắng gió tự nhiên và năng lượng của không gian."
      },
      {
        icon: <Compass className="h-6 w-6 text-clay-accent" />,
        title: isEn ? "Artistic & Aesthetic" : "Duy mỹ & Nghệ thuật",
        desc: isEn
          ? "Choosing properties with timeless architecture, warm textures, and elegant layouts."
          : "Tuyển lựa các không gian có kiến trúc vượt thời gian, chất liệu ấm cúng và bố cục thanh lịch."
      },
      {
        icon: <ShieldCheck className="h-6 w-6 text-clay-accent" />,
        title: isEn ? "Trust & Integrity" : "Chân thành & Tin cậy",
        desc: isEn
          ? "Building long-term relationships through honest advice and absolute transparency."
          : "Xây dựng mối quan hệ bền chặt thông qua sự tư vấn trung thực và minh bạch tuyệt đối."
      },
      {
        icon: <Heart className="h-6 w-6 text-clay-accent" />,
        title: isEn ? "Human-centric" : "Lấy con người làm gốc",
        desc: isEn
          ? "Prioritizing your mental peace, comfort, and lifestyle alignment above any transaction."
          : "Đặt sự bình yên trong tâm trí, sự thoải mái và lối sống của bạn lên trên hết."
      }
    ],
    quote: isEn 
      ? "A beautiful space is not defined by its gold faucets, but by the peace it brings when you close the door."
      : "Một không gian đẹp không định nghĩa bằng những vòi nước mạ vàng, mà bằng sự bình yên nó đem lại khi bạn khép cánh cửa lại.",
    image: "/kayla_portrait.png"
  };

  // Lấy dữ liệu từ Sanity
  const cmsData = await getBrandStory();

  // Helper helper lấy trường dịch thuật, fallback về giá trị mặc định
  const getVal = (field: any, fallbackStr: string) => {
    if (field && field[locale]) {
      return field[locale];
    }
    return fallbackStr;
  };

  // Xử lý dữ liệu động hoặc fallback
  const content = {
    title: getVal(cmsData?.title, localFallbackContent.title),
    subtitle: getVal(cmsData?.subtitle, localFallbackContent.subtitle),
    intro: getVal(cmsData?.intro, localFallbackContent.intro),
    storyTitle: getVal(cmsData?.storyTitle, localFallbackContent.storyTitle),
    storyText1: getVal(cmsData?.storyText1, localFallbackContent.storyText1),
    storyText2: getVal(cmsData?.storyText2, localFallbackContent.storyText2),
    quote: getVal(cmsData?.quote, localFallbackContent.quote),
    valuesTitle: getVal(cmsData?.valuesTitle, localFallbackContent.valuesTitle),
    image: cmsData?.image || localFallbackContent.image,
    values: cmsData?.values && cmsData.values.length > 0 
      ? cmsData.values.map((v: any) => ({
          icon: getIconComponent(v.icon),
          title: v.title?.[locale] || "",
          desc: v.desc?.[locale] || ""
        }))
      : localFallbackContent.values
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-500">
      {/* 1. Header Trang */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-clay-accent">
          {isEn ? "Introduction" : "Giới thiệu"}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">
          {content.title}
        </h1>
        <p className="text-base text-charcoal/60 leading-relaxed font-serif italic">
          "{content.intro}"
        </p>
      </div>

      <div className="w-full h-[1px] bg-stone/30"></div>

      {/* 2. Side-by-Side Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative aspect-[3/4] w-full max-w-sm mx-auto border border-stone/40 bg-linen">
          <Image
            src={content.image}
            alt="Kayla Nguyen Portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-3xl text-charcoal">
            {content.storyTitle}
          </h2>
          <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed font-sans">
            <p>{content.storyText1}</p>
            <p>{content.storyText2}</p>
          </div>
          <div className="border-l-2 border-clay pl-6 py-1 italic font-serif text-lg text-charcoal/80 bg-linen/20">
            {content.quote}
          </div>
        </div>
      </div>

      {/* 3. Core Values Grid */}
      <div className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl text-charcoal">{content.valuesTitle}</h2>
          <div className="w-12 h-[1px] bg-clay mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.values.map((v: any, i: number) => (
            <div key={i} className="border border-stone/30 bg-linen/10 p-6 space-y-4 rounded-sm">
              <div className="p-3 bg-linen w-fit border border-stone/20">{v.icon}</div>
              <h3 className="font-serif text-lg text-charcoal font-semibold">{v.title}</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed font-sans">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
