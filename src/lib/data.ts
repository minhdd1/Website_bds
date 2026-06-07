export interface LocalizedString {
  vi: string;
  en: string;
}

export interface LocalizedArray {
  vi: string[];
  en: string[];
}

export interface Property {
  slug: string;
  type: 'apartment' | 'office';
  title: LocalizedString;
  price: LocalizedString;
  area: string;
  bedrooms: number | null;
  bathrooms: number | null;
  furnishing: LocalizedString;
  location: LocalizedString;
  excerpt: LocalizedString;
  description: LocalizedString;
  kaylaNote: LocalizedString;
  lifestyleMatch: LocalizedArray;
  amenities: LocalizedArray;
  image: string;
}

export interface JournalPost {
  slug: string;
  category: 'space' | 'neighborhood' | 'workplace';
  categoryName: LocalizedString;
  title: LocalizedString;
  date: string;
  excerpt: LocalizedString;
  content: LocalizedString;
  image: string;
}

export interface Area {
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  overview: LocalizedString;
  atmosphere: LocalizedString;
  whoIsItFor: LocalizedString;
  image: string;
}

// Bất động sản nổi bật (Căn hộ & Văn phòng)
export const propertiesData: Property[] = [
  {
    slug: 'masteri-thao-dien-2pn',
    type: 'apartment',
    title: {
      vi: 'Căn hộ 2PN ấm cúng tại Masteri Thảo Điền',
      en: 'Cozy 2-Bedroom Apartment at Masteri Thao Dien'
    },
    price: {
      vi: '4.9 tỷ VND',
      en: '4.9 billion VND'
    },
    area: '68m²',
    bedrooms: 2,
    bathrooms: 2,
    furnishing: {
      vi: 'Nội thất đầy đủ (Phong cách Scandinavian)',
      en: 'Fully Furnished (Scandinavian Style)'
    },
    location: {
      vi: 'Thảo Điền, Quận 2',
      en: 'Thao Dien, District 2'
    },
    excerpt: {
      vi: 'Căn hộ ngập tràn ánh sáng tự nhiên với tầm nhìn bao trọn bán đảo Thanh Đa xanh mát.',
      en: 'An apartment flooded with natural light and a panoramic view of the lush Thanh Da peninsula.'
    },
    description: {
      vi: 'Nằm tại tháp T3 của dự án Masteri Thảo Điền, căn hộ này được thiết kế lại theo phong cách tối giản Bắc Âu, tối ưu hóa không gian sinh hoạt chung và đón gió tự nhiên. Ban công hướng Bắc mát mẻ, lý tưởng để nhâm nhi tách cà phê sáng và ngắm nhìn dòng sông Sài Gòn xa xa.',
      en: 'Located in Tower T3 of the Masteri Thao Dien project, this apartment has been redesigned in a minimalist Nordic style, optimizing common living spaces and welcoming natural breezes. The cool north-facing balcony is ideal for sipping a morning coffee and looking out at the Saigon River in the distance.'
    },
    kaylaNote: {
      vi: 'Tôi đặc biệt thích cách chủ nhà chọn tông màu gỗ sồi ấm áp kết hợp với rèm vải lanh. Khi ánh chiều buông xuống, căn phòng tỏa ra một năng lượng vô cùng điềm tĩnh, tách biệt hoàn toàn khỏi sự ồn ào bên ngoài.',
      en: 'I especially love how the owner chose warm oak tones combined with linen curtains. When the afternoon sun sets, the room radiates a very calm energy, completely separated from the noise outside.'
    },
    lifestyleMatch: {
      vi: [
        'Người yêu thích không gian sống yên tĩnh và nhiều ánh sáng.',
        'Các cặp đôi trẻ tìm kiếm một tổ ấm tinh tế, hiện đại.',
        'Người muốn sống trong cộng đồng văn minh, nhiều mảng xanh tại Thảo Điền.'
      ],
      en: [
        'Lovers of quiet, bright living spaces.',
        'Young couples seeking a refined, modern home.',
        'People wishing to live in a civilized, green community in Thao Dien.'
      ]
    },
    amenities: {
      vi: ['Hồ bơi vô cực', 'Phòng Gym hiện đại', 'Công viên nội khu', 'Khu BBQ', 'An ninh 24/7'],
      en: ['Infinity Pool', 'Modern Gym', 'Central Park', 'BBQ Area', '24/7 Security']
    },
    image: '/home_hero.png'
  },
  {
    slug: 'lim-tower-van-phong-hang-a',
    type: 'office',
    title: {
      vi: 'Văn phòng Hạng A chuyên nghiệp tại Lim Tower',
      en: 'Grade A Office Space at Lim Tower'
    },
    price: {
      vi: '120 triệu VND/tháng',
      en: '120 million VND/month'
    },
    area: '150m²',
    bedrooms: null,
    bathrooms: null,
    furnishing: {
      vi: 'Hoàn thiện cơ bản, có vách kính ngăn',
      en: 'Partially Fitted, glass partitions included'
    },
    location: {
      vi: 'Phường Bến Nghé, Quận 1',
      en: 'Ben Nghe Ward, District 1'
    },
    excerpt: {
      vi: 'Không gian làm việc đẳng cấp ngay tại trung tâm tài chính Quận 1 với tầm nhìn panorama thành phố.',
      en: 'Premium workspace located in the heart of District 1 financial center with panoramic city views.'
    },
    description: {
      vi: 'Văn phòng nằm tại tầng cao của Lim Tower, sở hữu tầm nhìn rộng mở hướng về phía sông Sài Gòn và trung tâm thành phố. Mặt bằng vuông vức, chiều cao trần tối ưu, đã được bố trí sẵn các đường dây kỹ thuật âm tường và hệ thống điều hòa trung tâm hiện đại.',
      en: 'The office is located on a high floor of Lim Tower, owning open views towards the Saigon River and the city center. Rectangular layout, optimal ceiling height, pre-arranged wall cables, and modern central air conditioning system.'
    },
    kaylaNote: {
      vi: 'Đây là không gian lý tưởng cho các doanh nghiệp sáng tạo hoặc văn phòng đại diện nước ngoài. Thiết kế kính bao quanh mang lại ánh sáng tự nhiên ngập tràn suốt cả ngày, kích thích sự tập trung và tư duy sáng tạo của đội ngũ.',
      en: 'This is an ideal space for creative businesses or foreign representative offices. The wraparound glass design brings in natural light throughout the day, stimulating focus and creative thinking.'
    },
    lifestyleMatch: {
      vi: [
        'Doanh nghiệp tìm kiếm vị thế uy tín ngay trung tâm Quận 1.',
        'Các công ty coi trọng không gian làm việc chuyên nghiệp, ngập tràn ánh sáng.',
        'Đội ngũ cần di chuyển thuận tiện tới các cơ quan hành chính và đối tác.'
      ],
      en: [
        'Businesses seeking a prestigious location in the center of District 1.',
        'Companies that value a professional, sunlit working environment.',
        'Teams needing easy access to administrative offices and partners.'
      ]
    },
    amenities: {
      vi: ['Lễ tân tòa nhà chuyên nghiệp', 'Thang máy tốc độ cao', 'Hệ thống PCCC tiêu chuẩn', 'Hầm gửi xe rộng rãi', 'Điện dự phòng 100%'],
      en: ['Professional Reception', 'High-speed Elevators', 'Standard Fire Fighting System', 'Spacious Basement Parking', '100% Backup Power']
    },
    image: '/home_hero.png'
  },
  {
    slug: 'cove-residences-empire-city-3pn',
    type: 'apartment',
    title: {
      vi: 'Siêu căn hộ 3PN sang trọng tại Cove Residences',
      en: 'Luxury 3-Bedroom Apartment at Cove Residences'
    },
    price: {
      vi: '22 tỷ VND',
      en: '22 billion VND'
    },
    area: '155m²',
    bedrooms: 3,
    bathrooms: 3,
    furnishing: {
      vi: 'Nội thất nhập khẩu cao cấp',
      en: 'Premium Imported Furnishings'
    },
    location: {
      vi: 'Thủ Thiêm, Quận 2',
      en: 'Thu Thiem, District 2'
    },
    excerpt: {
      vi: 'Căn hộ mặt trước trực diện sông Sài Gòn thuộc phân khu sang trọng nhất Empire City.',
      en: 'Frontline apartment with direct views of the Saigon River, located in the most luxurious zone of Empire City.'
    },
    description: {
      vi: 'Cove Residences là viên ngọc quý trên vương miện Empire City Thủ Thiêm. Căn hộ 3 phòng ngủ này sở hữu thang máy riêng dẫn trực tiếp vào sảnh căn hộ, trần cao 3.2m và toàn bộ ban công kính rộng lớn nhìn thẳng ra sông Sài Gòn và bến cảng Nhà Rồng lịch sử.',
      en: 'Cove Residences is the jewel in the crown of Empire City Thu Thiem. This 3-bedroom apartment features a private elevator leading directly into the unit foyer, 3.2m ceilings, and a large glass balcony looking straight at the Saigon River and historic Nha Rong Harbor.'
    },
    kaylaNote: {
      vi: 'Vị trí trực diện sông của Cove Residences đem lại cảm giác tựa như một dinh thự trên không. Mỗi phòng ngủ đều được thiết kế tỉ mỉ để tối đa tầm nhìn sông nước. Sự riêng tư ở đây là tuyệt đối.',
      en: 'Cove Residences\' direct riverfront location gives it the feel of a mansion in the sky. Each bedroom is meticulously designed to maximize river views. Privacy here is absolute.'
    },
    lifestyleMatch: {
      vi: [
        'Giới thượng lưu tìm kiếm sự riêng tư và đẳng cấp thượng hạng.',
        'Những ai yêu thích cuộc sống yên bình bên sông nhưng chỉ cách Quận 1 vài phút đi xe.',
        'Gia đình mong muốn không gian sống rộng rãi với dịch vụ concierge 5 sao.'
      ],
      en: [
        'Elite clients seeking ultimate privacy and top-tier luxury.',
        'Those who love peaceful riverfront living just minutes from District 1.',
        'Families desiring a spacious home with 5-star concierge services.'
      ]
    },
    amenities: {
      vi: ['Thang máy riêng biệt', 'Hồ bơi nước mặn 50m', 'Phòng gym chuẩn quốc tế', 'Phòng xông hơi & Spa', 'Dịch vụ Concierge hỗ trợ 24/7'],
      en: ['Private Elevator Access', '50m Saltwater Pool', 'International Standard Gym', 'Sauna & Spa Room', '24/7 Concierge Support']
    },
    image: '/home_hero.png'
  }
];

// Nhật ký sống (Living Journal)
export const journalData: JournalPost[] = [
  {
    slug: 'mot-buoi-sang-o-thao-dien',
    category: 'neighborhood',
    categoryName: {
      vi: 'Ghi chép khu phố',
      en: 'Neighborhood Notes'
    },
    title: {
      vi: 'Một buổi sáng bình yên ở Thảo Điền',
      en: 'A Peaceful Morning in Thao Dien'
    },
    date: '2026-05-15',
    excerpt: {
      vi: 'Trải nghiệm những góc nhỏ bình yên, những quán cà phê ẩn mình dưới bóng cây xanh mát tại Thảo Điền.',
      en: 'Experience quiet corners and cafes hidden under lush green canopies in Thao Dien.'
    },
    content: {
      vi: 'Thảo Điền luôn có hai gương mặt. Một ồn ào náo nhiệt với những quán bar, nhà hàng thời thượng vào buổi tối, và một vô cùng bình yên vào sớm mai. Đi bộ dọc theo những con đường rợp bóng cây, dừng chân tại một quán cà phê nhỏ ẩn mình trong hẻm sâu, bạn sẽ cảm nhận được nhịp sống chậm rãi và cộng đồng đa văn hóa rất riêng nơi đây. Những ngôi biệt thự cổ kính bên cạnh những căn hộ hiện đại tạo nên một bức tranh kiến trúc đối thoại đầy nghệ thuật.',
      en: 'Thao Dien always has two faces. A lively one with trendy bars and restaurants in the evening, and an incredibly peaceful one in the early morning. Walking along the tree-lined streets, stopping at a small cafe hidden deep in an alley, you will feel the slow pace of life and a unique multicultural community. Ancient villas next to modern apartments create an artistic architectural dialogue.'
    },
    image: '/home_hero.png'
  },
  {
    slug: 'khong-gian-lam-viec-toi-gian',
    category: 'workplace',
    categoryName: {
      vi: 'Góc nhìn nơi làm việc',
      en: 'Workplace Insights'
    },
    title: {
      vi: 'Không gian làm việc tối giản và tư duy sáng tạo',
      en: 'Minimalist Workspaces and Creative Thinking'
    },
    date: '2026-05-28',
    excerpt: {
      vi: 'Thiết kế văn phòng tối giản giúp giảm bớt xao nhãng và thúc đẩy tư duy đột phá cho doanh nghiệp trẻ.',
      en: 'Minimalist office design reduces distractions and fosters breakthrough thinking for young businesses.'
    },
    content: {
      vi: 'Một văn phòng làm việc không chỉ là nơi đặt bàn ghế, nó là hiện thân cho tư duy của doanh nghiệp. Phong cách thiết kế tối giản (minimalism) loại bỏ những chi tiết trang trí rườm rà, tập trung vào ánh sáng tự nhiên và chất liệu mộc mạc như bê tông trần, gỗ và kính. Sự thoáng đãng trong không gian vật lý giúp tâm trí con người ít bị xao nhãng hơn, từ đó nâng cao hiệu suất làm việc và mở ra không gian cho những ý tưởng đột phá.',
      en: 'An office is not just a place for desks and chairs; it is the embodiment of a company\'s mindset. Minimalism removes redundant decorations, focusing on natural light and raw materials like fair-faced concrete, wood, and glass. Openness in physical space helps the human mind become less distracted, thereby increasing productivity and opening room for breakthrough ideas.'
    },
    image: '/home_hero.png'
  }
];

// Cẩm nang hướng dẫn khu vực (Area Guides)
export const areasData: Area[] = [
  {
    slug: 'thao-dien',
    title: {
      vi: 'Thảo Điền - Bán đảo xanh ven sông',
      en: 'Thao Dien - Green Riverside Peninsula'
    },
    tagline: {
      vi: 'Cộng đồng đa văn hóa giữa mảng xanh tươi mát.',
      en: 'A multicultural community amidst lush greenery.'
    },
    overview: {
      vi: 'Thảo Điền từng là một vùng đất hoang sơ ven sông Sài Gòn, nay đã vươn mình trở thành một trong những khu vực đáng sống nhất thành phố. Nơi đây quy tụ cộng đồng cư dân nước ngoài đông đúc, các trường học quốc tế hàng đầu và hệ thống tiện ích ẩm thực đa quốc gia.',
      en: 'Thao Dien was once an untouched land along the Saigon River, now rising to become one of the city\'s most livable areas. It gathers a large expat community, leading international schools, and a diverse multinational culinary scene.'
    },
    atmosphere: {
      vi: 'Bầu không khí tại Thảo Điền mang đậm chất nghỉ dưỡng ven sông (resort feel). Trái ngược với sự hối hả của trung tâm thành phố, nhịp sống nơi đây chậm rãi, thư thái với nhiều mảng xanh cỏ cây và gió sông mát mẻ thổi vào quanh năm.',
      en: 'The atmosphere in Thao Dien carries a distinct riverside resort vibe. In contrast to the hustle of the city center, life here is slow and relaxed, with plenty of greenery and cool river breezes blowing year-round.'
    },
    whoIsItFor: {
      vi: 'Lý tưởng cho các gia đình có trẻ em cần môi trường học tập chuẩn quốc tế, các chuyên gia nước ngoài đang sinh sống tại Việt Nam và những ai tìm kiếm sự cân bằng giữa tiện ích hiện đại và cuộc sống gần gũi thiên nhiên.',
      en: 'Ideal for families with children needing international-standard education, foreign expats living in Vietnam, and anyone seeking a balance between modern amenities and proximity to nature.'
    },
    image: '/home_hero.png'
  },
  {
    slug: 'quan-1',
    title: {
      vi: 'Quận 1 - Trái tim tài chính lịch sử',
      en: 'District 1 - The Historic Financial Heart'
    },
    tagline: {
      vi: 'Nơi di sản kiến trúc giao thoa nhịp đập kinh tế hiện đại.',
      en: 'Where architectural heritage meets the beat of modern economics.'
    },
    overview: {
      vi: 'Quận 1 là trung tâm hành chính, văn hóa và kinh tế của TP. Hồ Chí Minh. Nơi tập trung các tòa nhà văn phòng hạng sang, các trung tâm thương mại lớn, đại lộ Nguyễn Huệ sầm uất và các công trình mang dấu ấn lịch sử.',
      en: 'District 1 is the administrative, cultural, and economic center of Ho Chi Minh City. It hosts luxury office buildings, major shopping malls, bustling Nguyen Hue Boulevard, and historic landmarks.'
    },
    atmosphere: {
      vi: 'Sôi động, tràn đầy năng lượng và chuyển động không ngừng nghỉ. Nơi đây mang nhịp thở của đô thị toàn cầu với những ánh đèn rực rỡ xuyên đêm, nhưng vẫn giữ được những khoảng lặng dưới hàng cây cổ thụ trăm tuổi bên dinh thự cũ.',
      en: 'Vibrant, energetic, and constantly in motion. It carries the pulse of a global metropolis with bright lights shining through the night, yet retains quiet moments under century-old trees beside old mansions.'
    },
    whoIsItFor: {
      vi: 'Phù hợp cho các doanh nghiệp lớn cần khẳng định vị thế thương hiệu, các bạn trẻ năng động thích trải nghiệm nhịp sống đô thị và du khách mong muốn khám phá tinh hoa văn hóa - ẩm thực.',
      en: 'Suitable for large enterprises looking to establish their brand prestige, dynamic individuals who love metropolitan life, and travelers wishing to explore cultural and culinary highlights.'
    },
    image: '/home_hero.png'
  }
];

// Hàm lấy dữ liệu giả lập (sử dụng khi Sanity chưa được cấu hình hoặc gặp lỗi)
export const getMockProperties = () => propertiesData;
export const getMockPropertyBySlug = (slug: string) => propertiesData.find(p => p.slug === slug);
export const getMockJournalPosts = () => journalData;
export const getMockJournalPostBySlug = (slug: string) => journalData.find(p => p.slug === slug);
export const getMockAreas = () => areasData;
export const getMockAreaBySlug = (slug: string) => areasData.find(a => a.slug === slug);
