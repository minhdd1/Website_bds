import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Nhận locale từ tham số hoặc mặc định
  let locale = await requestLocale;

  // Nếu không có locale (ví dụ ở các route tĩnh không được định vị), dùng mặc định 'vi'
  if (!locale || !['vi', 'en'].includes(locale)) {
    locale = 'vi';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
