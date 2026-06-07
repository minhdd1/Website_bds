'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const params = useParams();

  const handleLanguageChange = (nextLocale: 'vi' | 'en') => {
    router.replace(
      // @ts-ignore
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider">
      <button
        onClick={() => handleLanguageChange('vi')}
        className={`px-2 py-1 rounded transition-editorial ${
          currentLocale === 'vi'
            ? 'text-charcoal border-b-2 border-clay'
            : 'text-charcoal/40 hover:text-charcoal'
        }`}
        aria-label="Tiếng Việt"
      >
        VI
      </button>
      <span className="text-stone">/</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded transition-editorial ${
          currentLocale === 'en'
            ? 'text-charcoal border-b-2 border-clay'
            : 'text-charcoal/40 hover:text-charcoal'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
