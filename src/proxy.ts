import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Hỗ trợ hai ngôn ngữ tiếng Việt (mặc định) và tiếng Anh
  locales: ['vi', 'en'],

  // Ngôn ngữ mặc định khi không trùng khớp ngôn ngữ nào
  defaultLocale: 'vi',

  // Luôn hiển thị tiền tố locale trong URL (ví dụ: /vi/properties hoặc /en/properties)
  localePrefix: 'always'
});

export const config = {
  // Chỉ áp dụng middleware cho các đường dẫn cần dịch thuật, bỏ qua API, tài nguyên tĩnh, etc.
  matcher: [
    // Khớp đường dẫn gốc
    '/',
    // Khớp các đường dẫn có tiền tố locale
    '/(vi|en)/:path*',
    // Bỏ qua các thư mục hệ thống Next.js, tệp tĩnh, API và Studio
    '/((?!api|studio|_next|_vercel|.*\\..*).*)'
  ]
};
