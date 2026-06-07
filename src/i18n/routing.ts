import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Danh sách các ngôn ngữ được hỗ trợ
  locales: ['vi', 'en'],

  // Ngôn ngữ mặc định
  defaultLocale: 'vi',

  // Luôn chèn tiền tố ngôn ngữ vào URL
  localePrefix: 'always'
});

// Trích xuất các hàm điều hướng song ngữ tiện ích
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
