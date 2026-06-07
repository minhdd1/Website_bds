import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { 
  getMockProperties, 
  getMockPropertyBySlug, 
  getMockJournalPosts, 
  getMockJournalPostBySlug, 
  getMockAreas, 
  getMockAreaBySlug,
  Property,
  JournalPost,
  Area
} from './data';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6kx2x66j',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Hàm lấy tất cả bất động sản
export async function getProperties(): Promise<Property[]> {
  try {
    const query = `*[_type == "property"] {
      "slug": slug.current,
      type,
      title,
      price,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      location,
      excerpt,
      description,
      kaylaNote,
      lifestyleMatch,
      amenities,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query);
    if (data && data.length > 0) {
      console.log("=== [SANITY] ĐÃ LẤY DANH SÁCH BẤT ĐỘNG SẢN TỪ SANITY ===");
      return data;
    }
  } catch (error) {
    console.warn('Sanity fetch failed for properties, using mock data:', error);
  }
  console.log("=== [FALLBACK] DÙNG MOCK DATA CHO DANH SÁCH BẤT ĐỘNG SẢN ===");
  return getMockProperties();
}

// Hàm lấy chi tiết một bất động sản
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const query = `*[_type == "property" && slug.current == $slug][0] {
      "slug": slug.current,
      type,
      title,
      price,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      location,
      excerpt,
      description,
      kaylaNote,
      lifestyleMatch,
      amenities,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query, { slug });
    if (data) {
      console.log(`=== [SANITY] ĐÃ LẤY CHI TIẾT BẤT ĐỘNG SẢN (${slug}) TỪ SANITY ===`);
      return data;
    }
  } catch (error) {
    console.warn(`Sanity fetch failed for property slug ${slug}, using mock data:`, error);
  }
  console.log(`=== [FALLBACK] DÙNG MOCK DATA CHO CHI TIẾT BẤT ĐỘNG SẢN (${slug}) ===`);
  return getMockPropertyBySlug(slug) || null;
}

// Hàm lấy tất cả bài viết Journal
export async function getJournalPosts(): Promise<JournalPost[]> {
  try {
    const query = `*[_type == "journal"] {
      "slug": slug.current,
      category,
      categoryName,
      title,
      date,
      excerpt,
      content,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query);
    if (data && data.length > 0) {
      console.log("=== [SANITY] ĐÃ LẤY DANH SÁCH BÀI VIẾT JOURNAL TỪ SANITY ===");
      return data;
    }
  } catch (error) {
    console.warn('Sanity fetch failed for journal posts, using mock data:', error);
  }
  console.log("=== [FALLBACK] DÙNG MOCK DATA CHO DANH SÁCH BÀI VIẾT JOURNAL ===");
  return getMockJournalPosts();
}

// Hàm lấy chi tiết bài viết Journal
export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  try {
    const query = `*[_type == "journal" && slug.current == $slug][0] {
      "slug": slug.current,
      category,
      categoryName,
      title,
      date,
      excerpt,
      content,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query, { slug });
    if (data) {
      console.log(`=== [SANITY] ĐÃ LẤY CHI TIẾT BÀI VIẾT JOURNAL (${slug}) TỪ SANITY ===`);
      return data;
    }
  } catch (error) {
    console.warn(`Sanity fetch failed for journal post slug ${slug}, using mock data:`, error);
  }
  console.log(`=== [FALLBACK] DÙNG MOCK DATA CHO CHI TIẾT BÀI VIẾT JOURNAL (${slug}) ===`);
  return getMockJournalPostBySlug(slug) || null;
}

// Hàm lấy tất cả hướng dẫn khu vực
export async function getAreas(): Promise<Area[]> {
  try {
    const query = `*[_type == "areaGuide"] {
      "slug": slug.current,
      title,
      tagline,
      overview,
      atmosphere,
      whoIsItFor,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query);
    if (data && data.length > 0) {
      console.log("=== [SANITY] ĐÃ LẤY DANH SÁCH KHU VỰC TỪ SANITY ===");
      return data;
    }
  } catch (error) {
    console.warn('Sanity fetch failed for area guides, using mock data:', error);
  }
  console.log("=== [FALLBACK] DÙNG MOCK DATA CHO DANH SÁCH KHU VỰC ===");
  return getMockAreas();
}

// Hàm lấy chi tiết hướng dẫn khu vực
export async function getAreaBySlug(slug: string): Promise<Area | null> {
  try {
    const query = `*[_type == "areaGuide" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      tagline,
      overview,
      atmosphere,
      whoIsItFor,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query, { slug });
    if (data) {
      console.log(`=== [SANITY] ĐÃ LẤY CHI TIẾT KHU VỰC (${slug}) TỪ SANITY ===`);
      return data;
    }
  } catch (error) {
    console.warn(`Sanity fetch failed for area guide slug ${slug}, using mock data:`, error);
  }
  console.log(`=== [FALLBACK] DÙNG MOCK DATA CHO CHI TIẾT KHU VỰC (${slug}) ===`);
  return getMockAreaBySlug(slug) || null;
}

// Hàm lấy cấu hình trang chủ
export async function getHomepage(): Promise<any | null> {
  try {
    const query = `*[_type == "homepage"][0] {
      heroTitle,
      heroSubtitle,
      featuredTitle,
      featuredSubtitle,
      journalTitle,
      journalSubtitle,
      areasTitle,
      areasSubtitle,
      aboutTag,
      aboutTitle,
      aboutText1,
      aboutText2,
      aboutQuote,
      connectTag,
      connectTitle,
      connectText,
      officeLocation
    }`;
    const data = await client.fetch(query);
    if (data) {
      console.log("=== [SANITY] ĐÃ LẤY CẤU HÌNH TRANG CHỦ TỪ SANITY ===");
      return data;
    }
  } catch (error) {
    console.warn('Sanity fetch failed for homepage config:', error);
  }
  return null;
}

// Hàm lấy câu chuyện thương hiệu (About Page)
export async function getBrandStory(): Promise<any | null> {
  try {
    const query = `*[_type == "brandStory"][0] {
      title,
      intro,
      storyTitle,
      storyText1,
      storyText2,
      quote,
      valuesTitle,
      values,
      "image": image.asset->url
    }`;
    const data = await client.fetch(query);
    if (data) {
      console.log("=== [SANITY] ĐÃ LẤY CÂU CHUYỆN THƯƠNG HIỆU TỪ SANITY ===");
      return data;
    }
  } catch (error) {
    console.warn('Sanity fetch failed for brand story:', error);
  }
  return null;
}
