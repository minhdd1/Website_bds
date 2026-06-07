import { localeString, localeText, localePortableText } from './localeObjects';

// Định nghĩa mảng chuỗi dịch thuật (phù hợp cho Tiện ích, Lifestyle Match)
export const localeStringArray = {
  title: 'Localized String Array',
  name: 'localeStringArray',
  type: 'object',
  fields: [
    {
      title: 'Tiếng Việt',
      name: 'vi',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Tiếng Anh',
      name: 'en',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

// 1. Schema Bất động sản (Căn hộ & Văn phòng)
export const property = {
  title: 'Bất động sản',
  name: 'property',
  type: 'document',
  fields: [
    {
      title: 'Tiêu đề',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Đường dẫn (Slug)',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.vi',
        maxLength: 96,
      },
    },
    {
      title: 'Phân loại',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Căn hộ chung cư', value: 'apartment' },
          { title: 'Văn phòng làm việc', value: 'office' },
        ],
        layout: 'radio',
      },
    },
    {
      title: 'Giá cả',
      name: 'price',
      type: 'localeString',
    },
    {
      title: 'Diện tích (VD: 68m²)',
      name: 'area',
      type: 'string',
    },
    {
      title: 'Số phòng ngủ',
      name: 'bedrooms',
      type: 'number',
    },
    {
      title: 'Số phòng tắm',
      name: 'bathrooms',
      type: 'number',
    },
    {
      title: 'Tình trạng bàn giao / Nội thất',
      name: 'furnishing',
      type: 'localeString',
    },
    {
      title: 'Địa điểm / Khu vực',
      name: 'location',
      type: 'localeString',
    },
    {
      title: 'Mô tả ngắn (Excerpt)',
      name: 'excerpt',
      type: 'localeText',
    },
    {
      title: 'Mô tả chi tiết',
      name: 'description',
      type: 'localeText',
    },
    {
      title: 'Ghi chú của Kayla (Kayla Note)',
      name: 'kaylaNote',
      type: 'localeText',
    },
    {
      title: 'Lifestyle Match (Mức độ phù hợp lối sống)',
      name: 'lifestyleMatch',
      type: 'localeStringArray',
    },
    {
      title: 'Tiện ích (Amenities)',
      name: 'amenities',
      type: 'localeStringArray',
    },
    {
      title: 'Hình ảnh đại diện',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

// 2. Schema Hướng dẫn khu vực (Area Guide)
export const areaGuide = {
  title: 'Hướng dẫn khu vực',
  name: 'areaGuide',
  type: 'document',
  fields: [
    {
      title: 'Tên khu vực',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Đường dẫn (Slug)',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.vi',
      },
    },
    {
      title: 'Khẩu hiệu / Slogan ngắn',
      name: 'tagline',
      type: 'localeString',
    },
    {
      title: 'Tổng quan (Overview)',
      name: 'overview',
      type: 'localeText',
    },
    {
      title: 'Bầu không khí & Lối sống (Atmosphere)',
      name: 'atmosphere',
      type: 'localeText',
    },
    {
      title: 'Khu phố này dành cho ai? (Who is it for)',
      name: 'whoIsItFor',
      type: 'localeText',
    },
    {
      title: 'Hình ảnh đại diện',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

// 3. Schema bài viết Living Journal
export const journal = {
  title: 'Nhật ký sống (Journal)',
  name: 'journal',
  type: 'document',
  fields: [
    {
      title: 'Tiêu đề bài viết',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Đường dẫn (Slug)',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.vi',
      },
    },
    {
      title: 'Phân loại chủ đề',
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Ghi chép khu phố (Neighborhood Notes)', value: 'neighborhood' },
          { title: 'Câu chuyện không gian (Space Stories)', value: 'space' },
          { title: 'Góc nhìn nơi làm việc (Workplace Insights)', value: 'workplace' },
        ],
      },
    },
    {
      title: 'Tên danh mục hiển thị',
      name: 'categoryName',
      type: 'localeString',
    },
    {
      title: 'Ngày đăng',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Tóm tắt nội dung bài viết',
      name: 'excerpt',
      type: 'localeText',
    },
    {
      title: 'Nội dung chi tiết',
      name: 'content',
      type: 'localeText',
    },
    {
      title: 'Hình ảnh bài viết',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

// 4. Schema Trang chủ (Cấu hình linh hoạt các phần trên trang chủ từ CMS)
export const homepage = {
  title: 'Cấu hình Trang chủ',
  name: 'homepage',
  type: 'document',
  fields: [
    {
      title: 'Tên cấu hình',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Tiêu đề Hero',
      name: 'heroTitle',
      type: 'localeString',
    },
    {
      title: 'Mô tả phụ Hero',
      name: 'heroSubtitle',
      type: 'localeText',
    },
    {
      title: 'Tiêu đề phần Bất động sản nổi bật',
      name: 'featuredTitle',
      type: 'localeString',
    },
    {
      title: 'Mô tả phần Bất động sản nổi bật',
      name: 'featuredSubtitle',
      type: 'localeText',
    },
    {
      title: 'Tiêu đề phần Nhật ký sống',
      name: 'journalTitle',
      type: 'localeString',
    },
    {
      title: 'Mô tả phần Nhật ký sống',
      name: 'journalSubtitle',
      type: 'localeText',
    },
    {
      title: 'Tiêu đề phần Cẩm nang khu vực',
      name: 'areasTitle',
      type: 'localeString',
    },
    {
      title: 'Mô tả phần Cẩm nang khu vực',
      name: 'areasSubtitle',
      type: 'localeText',
    },
    {
      title: 'Thẻ nhãn giới thiệu (Triết lý)',
      name: 'aboutTag',
      type: 'localeString',
    },
    {
      title: 'Tiêu đề giới thiệu',
      name: 'aboutTitle',
      type: 'localeString',
    },
    {
      title: 'Đoạn văn bản giới thiệu 1',
      name: 'aboutText1',
      type: 'localeText',
    },
    {
      title: 'Đoạn văn bản giới thiệu 2',
      name: 'aboutText2',
      type: 'localeText',
    },
    {
      title: 'Trích dẫn của Kayla (Quote)',
      name: 'aboutQuote',
      type: 'localeText',
    },
    {
      title: 'Thẻ nhãn kết nối',
      name: 'connectTag',
      type: 'localeString',
    },
    {
      title: 'Tiêu đề kết nối',
      name: 'connectTitle',
      type: 'localeString',
    },
    {
      title: 'Mô tả kết nối',
      name: 'connectText',
      type: 'localeText',
    },
    {
      title: 'Địa chỉ văn phòng',
      name: 'officeLocation',
      type: 'localeString',
    },
  ],
};

// 5. Schema Câu chuyện thương hiệu (About Page)
export const brandStory = {
  title: 'Câu chuyện thương hiệu (About)',
  name: 'brandStory',
  type: 'document',
  fields: [
    {
      title: 'Tên cấu hình',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Tiêu đề trang',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Mô tả phụ / Slogan (Intro)',
      name: 'intro',
      type: 'localeText',
    },
    {
      title: 'Tiêu đề triết lý (Story Title)',
      name: 'storyTitle',
      type: 'localeString',
    },
    {
      title: 'Nội dung câu chuyện 1',
      name: 'storyText1',
      type: 'localeText',
    },
    {
      title: 'Nội dung câu chuyện 2',
      name: 'storyText2',
      type: 'localeText',
    },
    {
      title: 'Ghi chú nổi bật (Quote)',
      name: 'quote',
      type: 'localeText',
    },
    {
      title: 'Tiêu đề giá trị cốt lõi',
      name: 'valuesTitle',
      type: 'localeString',
    },
    {
      title: 'Danh sách giá trị cốt lõi',
      name: 'values',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueItem',
          title: 'Giá trị cốt lõi',
          fields: [
            { title: 'Biểu tượng (lucide-react name, VD: Eye, Compass, ShieldCheck, Heart)', name: 'icon', type: 'string' },
            { title: 'Tiêu đề', name: 'title', type: 'localeString' },
            { title: 'Mô tả ngắn', name: 'desc', type: 'localeText' },
          ]
        }
      ]
    },
    {
      title: 'Hình ảnh đại diện / Chân dung',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

export const schemaTypes = [
  localeString,
  localeText,
  localePortableText,
  localeStringArray,
  property,
  areaGuide,
  journal,
  homepage,
  brandStory,
];
