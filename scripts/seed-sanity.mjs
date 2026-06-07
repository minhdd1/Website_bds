import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// 1. Đọc tệp cấu hình .env.local thủ công để lấy biến môi trường
try {
  const envPath = path.resolve('.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key.trim()] = value.trim();
        }
      }
    });
    console.log('✅ Đã tải cấu hình từ .env.local');
  }
} catch (e) {
  console.warn('⚠️ Không tìm thấy hoặc lỗi khi đọc .env.local:', e.message);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6kx2x66j';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('\n❌ LỖI: Vui lòng cấu hình SANITY_WRITE_TOKEN trong tệp .env.local để chạy script seed.');
  console.error('Bạn có thể lấy token ghi (Write Token) từ: https://sanity.io/manage\n');
  process.exit(1);
}

// Khởi tạo client Sanity với quyền Ghi (Write)
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
});

async function runSeed() {
  console.log('🚀 Bắt đầu quá trình seed dữ liệu lên Sanity...');
  console.log(`Dự án: ${projectId} | Dataset: ${dataset}`);

  // 2. Upload hình ảnh lên Sanity làm tài nguyên (Assets)
  let heroImageAssetId = '';
  let portraitImageAssetId = '';

  try {
    const heroImgPath = path.resolve('public/home_hero.png');
    if (fs.existsSync(heroImgPath)) {
      console.log('Uploading home_hero.png...');
      const heroAsset = await client.assets.upload('image', fs.createReadStream(heroImgPath), {
        filename: 'home_hero.png'
      });
      heroImageAssetId = heroAsset._id;
      console.log(`✅ Uploaded home_hero.png thành công. ID: ${heroImageAssetId}`);
    } else {
      console.warn('⚠️ Không tìm thấy file public/home_hero.png');
    }

    const portraitImgPath = path.resolve('public/kayla_portrait.png');
    if (fs.existsSync(portraitImgPath)) {
      console.log('Uploading kayla_portrait.png...');
      const portraitAsset = await client.assets.upload('image', fs.createReadStream(portraitImgPath), {
        filename: 'kayla_portrait.png'
      });
      portraitImageAssetId = portraitAsset._id;
      console.log(`✅ Uploaded kayla_portrait.png thành công. ID: ${portraitImageAssetId}`);
    } else {
      console.warn('⚠️ Không tìm thấy file public/kayla_portrait.png');
    }
  } catch (error) {
    console.error('❌ Upload ảnh thất bại:', error);
    process.exit(1);
  }

  // 3. Chuẩn bị ảnh tham chiếu
  const heroImageRef = heroImageAssetId ? {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: heroImageAssetId
    }
  } : undefined;

  const portraitImageRef = portraitImageAssetId ? {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: portraitImageAssetId
    }
  } : undefined;

  // 4. Seed Cấu hình Trang chủ (Homepage Config)
  console.log('\nSeeding cấu hình Trang chủ...');
  const homepageDoc = {
    _type: 'homepage',
    _id: 'homepage',
    name: 'Cấu hình Trang chủ Mặc định',
    heroTitle: {
      vi: '<large>Không gian</large> <small>phản chiếu</small> <large>phong cách sống</large>',
      en: '<large>Space</large> <small>reflecting</small> <large>lifestyle</large>',
    },
    heroSubtitle: {
      vi: 'Tuyển tập những căn hộ và văn phòng chọn lọc mang đậm tính duy mỹ và bình yên.',
      en: 'A curated selection of aesthetic and peaceful apartments and offices.',
    },
    featuredTitle: {
      vi: 'Không gian nổi bật',
      en: 'Featured Spaces',
    },
    featuredSubtitle: {
      vi: 'Những căn hộ và văn phòng có thiết kế vượt thời gian, đầy đủ tiện ích và vị trí đắc địa.',
      en: 'Apartments and offices with timeless design, full amenities, and prime locations.',
    },
    journalTitle: {
      vi: 'Nhật ký sống',
      en: 'Living Journal',
    },
    journalSubtitle: {
      vi: 'Chia sẻ những câu chuyện về không gian sống, ghi chép khu phố và góc nhìn nơi làm việc.',
      en: 'Sharing stories of living spaces, neighborhood notes, and workplace insights.',
    },
    areasTitle: {
      vi: 'Cẩm nang khu vực',
      en: 'Area Guides',
    },
    areasSubtitle: {
      vi: 'Khám phá nhịp sống và bầu không khí đặc trưng tại các khu phố nổi bật ở Sài Gòn.',
      en: 'Discover the distinct lifestyle and atmosphere of prominent neighborhoods in Saigon.',
    },
    aboutTag: {
      vi: 'Triết lý tư vấn',
      en: 'Consultancy Philosophy',
    },
    aboutTitle: {
      vi: 'Kể chuyện về không gian sống cùng Kayla Nguyen',
      en: 'Storytelling Living Spaces with Kayla Nguyen',
    },
    aboutText1: {
      vi: 'Chào bạn, tôi là Kayla Nguyen. Tôi không xem bất động sản đơn thuần là những giao dịch mua bán hay những khối bê tông vô hồn. Đối với tôi, mỗi căn hộ, mỗi văn phòng đều là một thực thể sống có câu chuyện riêng, phản chiếu phong cách sống và năng lượng của người sở hữu.',
      en: 'Hello, I am Kayla Nguyen. I do not view real estate merely as sales transactions or lifeless concrete blocks. For me, every apartment and office is a living entity with its own story, reflecting the owner\'s lifestyle and energy.',
    },
    aboutText2: {
      vi: 'Bằng lăng kính duy mỹ, điềm tĩnh và quan sát tinh tế, tôi mong muốn giúp bạn khám phá những không gian sống và làm việc thực sự kết nối với tâm hồn của bạn. Hãy cùng tôi viết nên những không gian sống đầy cảm xúc và bền vững theo thời gian.',
      en: 'Through an aesthetic, calm, and observant lens, I wish to help you discover living and working spaces that truly connect with your soul. Join me in writing emotional and timeless spaces.',
    },
    aboutQuote: {
      vi: 'Tôi tin rằng không gian sống tuyệt vời nhất là nơi mang lại cho bạn sự điềm tĩnh và tự do trong tâm hồn sau những xô bồ ngoài kia.',
      en: 'I believe the greatest living space is one that brings you calm and inner freedom after the hustle outside.',
    },
    connectTag: {
      vi: 'Kết nối',
      en: 'Connect',
    },
    connectTitle: {
      vi: 'Tìm kiếm một không gian sống thuộc về riêng bạn?',
      en: 'Looking for a living space of your own?',
    },
    connectText: {
      vi: 'Mỗi căn nhà hay văn phòng đều có câu chuyện phát triển riêng biệt. Hãy chia sẻ với Kayla những mong muốn và lối sống của bạn, chúng ta sẽ cùng nhau tìm kiếm một không gian thực sự đồng điệu.',
      en: 'Each house or office has its own developmental story. Share your desires and lifestyle with Kayla, and we will find a truly resonant space.',
    },
    officeLocation: {
      vi: '📍 Thảo Điền, Quận 2, TP. Hồ Chí Minh',
      en: '📍 Thao Dien, District 2, Ho Chi Minh City',
    },
  };

  await client.createOrReplace(homepageDoc);
  console.log('✅ Cấu hình Trang chủ đã được lưu.');

  // 5. Seed Câu chuyện thương hiệu (Brand Story / About Page)
  console.log('\nSeeding Câu chuyện thương hiệu (About)...');
  const brandStoryDoc = {
    _type: 'brandStory',
    _id: 'brandStory',
    name: 'Câu chuyện thương hiệu',
    title: {
      vi: 'Về Kayla Nguyen',
      en: 'About Kayla Nguyen',
    },
    intro: {
      vi: 'Tôi tin rằng một ngôi nhà không chỉ là những bức tường ngăn cách vật lý, mà là một nơi chứa đựng năng lượng và cảm xúc, định hình nên con người chúng ta.',
      en: 'I believe that a home is not just a layout of walls, but a container of energy and emotions that shapes who we are.',
    },
    storyTitle: {
      vi: 'Triết lý của tôi',
      en: 'My Philosophy',
    },
    storyText1: {
      vi: 'Nhiều năm làm việc trong thị trường bất động sản cao cấp tại TP. Hồ Chí Minh, tôi nhận thấy phần lớn khách hàng đang bị choáng ngợp bởi những lời chào mời mua bán dồn dập, những thiết kế giả kim xa hoa hay những con số tài chính phức tạp làm mất đi phần nhân văn của hành trình tìm kiếm tổ ấm.',
      en: 'For many years, I have worked in Ho Chi Minh City\'s high-end property market. I noticed that most buyers and renters are overwhelmed by aggressive sales pitches, luxury gold mockups, and complex financial talk that strip away the human side of finding a home.',
    },
    storyText2: {
      vi: 'Đó là lý do tôi xây dựng mô hình \'Bất động sản Biên tập\'. Bằng lăng kính duy mỹ, điềm tĩnh và quan sát tinh tế, tôi xem mỗi căn hộ hay văn phòng như một tác phẩm nghệ thuật có câu chuyện riêng. Mục tiêu của tôi là lắng nghe sâu sắc về phong cách sống của bạn và tìm kiếm một không gian thực sự đồng điệu.',
      en: 'That is why I created \'Editorial Real Estate\'. By applying an artistic, calm, and observant lens, I treat every property like an artwork with its own story. My goal is to listen deeply to your lifestyle requirements and match you with a space that reflects who you truly are.',
    },
    quote: {
      vi: 'Một không gian đẹp không định nghĩa bằng những vòi nước mạ vàng, mà bằng sự bình yên nó đem lại khi bạn khép cánh cửa lại.',
      en: 'A beautiful space is not defined by its gold faucets, but by the peace it brings when you close the door.',
    },
    valuesTitle: {
      vi: 'Giá trị cốt lõi',
      en: 'Core Values',
    },
    image: portraitImageRef,
    values: [
      {
        icon: 'Eye',
        title: { vi: 'Quan sát tinh tế', en: 'Observant' },
        desc: {
          vi: 'Chú ý đến từng chi tiết nhỏ nhặt, hướng đón nắng gió tự nhiên và năng lượng của không gian.',
          en: 'Paying attention to small details, natural light, and the subtle energy of each space.'
        }
      },
      {
        icon: 'Compass',
        title: { vi: 'Duy mỹ & Nghệ thuật', en: 'Artistic & Aesthetic' },
        desc: {
          vi: 'Tuyển lựa các không gian có kiến trúc vượt thời gian, chất liệu ấm cúng và bố cục thanh lịch.',
          en: 'Choosing properties with timeless architecture, warm textures, and elegant layouts.'
        }
      },
      {
        icon: 'ShieldCheck',
        title: { vi: 'Chân thành & Tin cậy', en: 'Trust & Integrity' },
        desc: {
          vi: 'Xây dựng mối quan hệ bền chặt thông qua sự tư vấn trung thực và minh bạch tuyệt đối.',
          en: 'Building long-term relationships through honest advice and absolute transparency.'
        }
      },
      {
        icon: 'Heart',
        title: { vi: 'Lấy con người làm gốc', en: 'Human-centric' },
        desc: {
          vi: 'Đặt sự bình yên trong tâm trí, sự thoải mái và lối sống của bạn lên trên hết.',
          en: 'Prioritizing your mental peace, comfort, and lifestyle alignment above any transaction.'
        }
      }
    ]
  };

  await client.createOrReplace(brandStoryDoc);
  console.log('✅ Câu chuyện thương hiệu đã được lưu.');

  // 6. Seed Bất động sản (Properties)
  console.log('\nSeeding Bất động sản (Properties)...');
  const properties = [
    {
      _type: 'property',
      _id: 'property-masteri-thao-dien-2pn',
      slug: { _type: 'slug', current: 'masteri-thao-dien-2pn' },
      type: 'apartment',
      title: { vi: 'Căn hộ 2PN ấm cúng tại Masteri Thảo Điền', en: 'Cozy 2-Bedroom Apartment at Masteri Thao Dien' },
      price: { vi: '4.9 tỷ VND', en: '4.9 billion VND' },
      area: '68m²',
      bedrooms: 2,
      bathrooms: 2,
      furnishing: { vi: 'Nội thất đầy đủ (Phong cách Scandinavian)', en: 'Fully Furnished (Scandinavian Style)' },
      location: { vi: 'Thảo Điền, Quận 2', en: 'Thao Dien, District 2' },
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
      image: heroImageRef
    },
    {
      _type: 'property',
      _id: 'property-lim-tower-van-phong-hang-a',
      slug: { _type: 'slug', current: 'lim-tower-van-phong-hang-a' },
      type: 'office',
      title: { vi: 'Văn phòng Hạng A chuyên nghiệp tại Lim Tower', en: 'Grade A Office Space at Lim Tower' },
      price: { vi: '120 triệu VND/tháng', en: '120 million VND/month' },
      area: '150m²',
      bedrooms: null,
      bathrooms: null,
      furnishing: { vi: 'Hoàn thiện cơ bản, có vách kính ngăn', en: 'Partially Fitted, glass partitions included' },
      location: { vi: 'Phường Bến Nghé, Quận 1', en: 'Ben Nghe Ward, District 1' },
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
      image: heroImageRef
    },
    {
      _type: 'property',
      _id: 'property-cove-residences-empire-city-3pn',
      slug: { _type: 'slug', current: 'cove-residences-empire-city-3pn' },
      type: 'apartment',
      title: { vi: 'Siêu căn hộ 3PN sang trọng tại Cove Residences', en: 'Luxury 3-Bedroom Apartment at Cove Residences' },
      price: { vi: '22 tỷ VND', en: '22 billion VND' },
      area: '155m²',
      bedrooms: 3,
      bathrooms: 3,
      furnishing: { vi: 'Nội thất nhập khẩu cao cấp', en: 'Premium Imported Furnishings' },
      location: { vi: 'Thủ Thiêm, Quận 2', en: 'Thu Thiem, District 2' },
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
      image: heroImageRef
    }
  ];

  for (const prop of properties) {
    await client.createOrReplace(prop);
    console.log(`✅ Đã seed Bất động sản: ${prop.title.vi}`);
  }

  // 7. Seed Nhật ký (Journal Posts)
  console.log('\nSeeding Nhật ký sống (Journal)...');
  const journalPosts = [
    {
      _type: 'journal',
      _id: 'journal-mot-buoi-sang-o-thao-dien',
      slug: { _type: 'slug', current: 'mot-buoi-sang-o-thao-dien' },
      category: 'neighborhood',
      categoryName: { vi: 'Ghi chép khu phố', en: 'Neighborhood Notes' },
      title: { vi: 'Một buổi sáng bình yên ở Thảo Điền', en: 'A Peaceful Morning in Thao Dien' },
      date: '2026-05-15',
      excerpt: {
        vi: 'Trải nghiệm những góc nhỏ bình yên, những quán cà phê ẩn mình dưới bóng cây xanh mát tại Thảo Điền.',
        en: 'Experience quiet corners and cafes hidden under lush green canopies in Thao Dien.'
      },
      content: {
        vi: 'Thảo Điền luôn có hai gương mặt. Một ồn ào náo nhiệt với những quán bar, nhà hàng thời thượng vào buổi tối, và một vô cùng bình yên vào sớm mai. Đi bộ dọc theo những con đường rợp bóng cây, dừng chân tại một quán cà phê nhỏ ẩn mình trong hẻm sâu, bạn sẽ cảm nhận được nhịp sống chậm rãi và cộng đồng đa văn hóa rất riêng nơi đây. Những ngôi biệt thự cổ kính bên cạnh những căn hộ hiện đại tạo nên một bức tranh kiến trúc đối thoại đầy nghệ thuật.',
        en: 'Thao Dien always has two faces. A lively one with trendy bars and restaurants in the evening, and an incredibly peaceful one in the early morning. Walking along the tree-lined streets, stopping at a small cafe hidden deep in an alley, you will feel the slow pace of life and a unique multicultural community. Ancient villas next to modern apartments create an artistic architectural dialogue.'
      },
      image: heroImageRef
    },
    {
      _type: 'journal',
      _id: 'journal-khong-gian-lam-viec-toi-gian',
      slug: { _type: 'slug', current: 'khong-gian-lam-viec-toi-gian' },
      category: 'workplace',
      categoryName: { vi: 'Góc nhìn nơi làm việc', en: 'Workplace Insights' },
      title: { vi: 'Không gian làm việc tối giản và tư duy sáng tạo', en: 'Minimalist Workspaces and Creative Thinking' },
      date: '2026-05-28',
      excerpt: {
        vi: 'Thiết kế văn phòng tối giản giúp giảm bớt xao nhãng và thúc đẩy tư duy đột phá cho doanh nghiệp trẻ.',
        en: 'Minimalist office design reduces distractions and fosters breakthrough thinking for young businesses.'
      },
      content: {
        vi: 'Một văn phòng làm việc không chỉ là nơi đặt bàn ghế, nó là hiện thân cho tư duy của doanh nghiệp. Phong cách thiết kế tối giản (minimalism) loại bỏ những chi tiết trang trí rườm rà, tập trung vào ánh sáng tự nhiên và chất liệu mộc mạc như bê tông trần, gỗ và kính. Sự thoáng đãng trong không gian vật lý giúp tâm trí con người ít bị xao nhãng hơn, từ đó nâng cao hiệu suất làm việc và mở ra không gian cho những ý tưởng đột phá.',
        en: 'An office is not just a place for desks and chairs; it is the embodiment of a company\'s mindset. Minimalism removes redundant decorations, focusing on natural light and raw materials like fair-faced concrete, wood, and glass. Openness in physical space helps the human mind become less distracted, thereby increasing productivity and opening room for breakthrough ideas.'
      },
      image: heroImageRef
    }
  ];

  for (const post of journalPosts) {
    await client.createOrReplace(post);
    console.log(`✅ Đã seed Bài viết Nhật ký: ${post.title.vi}`);
  }

  // 8. Seed Khu vực (Areas)
  console.log('\nSeeding Hướng dẫn khu vực (Area Guides)...');
  const areas = [
    {
      _type: 'areaGuide',
      _id: 'area-thao-dien',
      slug: { _type: 'slug', current: 'thao-dien' },
      title: { vi: 'Thảo Điền - Bán đảo xanh ven sông', en: 'Thao Dien - Green Riverside Peninsula' },
      tagline: { vi: 'Cộng đồng đa văn hóa giữa mảng xanh tươi mát.', en: 'A multicultural community amidst lush greenery.' },
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
      image: heroImageRef
    },
    {
      _type: 'areaGuide',
      _id: 'area-quan-1',
      slug: { _type: 'slug', current: 'quan-1' },
      title: { vi: 'Quận 1 - Trái tim tài chính lịch sử', en: 'District 1 - The Historic Financial Heart' },
      tagline: { vi: 'Nơi di sản kiến trúc giao thoa nhịp đập kinh tế hiện đại.', en: 'Where architectural heritage meets the beat of modern economics.' },
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
      image: heroImageRef
    }
  ];

  for (const area of areas) {
    await client.createOrReplace(area);
    console.log(`✅ Đã seed Khu vực: ${area.title.vi}`);
  }

  console.log('\n🎉 Quá trình seed dữ liệu lên Sanity đã HOÀN THÀNH CÔNG tốt đẹp!');
}

runSeed().catch(err => {
  console.error('\n❌ Quá trình seed dữ liệu thất bại:', err);
  process.exit(1);
});
