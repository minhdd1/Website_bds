import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');

  return (
    <footer className="w-full bg-linen border-t border-stone/40 py-16 text-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="font-serif text-2xl tracking-widest uppercase text-charcoal"
            >
              Kayla Nguyen
            </Link>
            <p className="font-serif text-lg italic text-charcoal/80 max-w-md">
              "{t('tagline')}"
            </p>
            <p className="text-xs text-charcoal/50 uppercase tracking-[0.2em] font-semibold mt-6">
              {t('editorialSubtitle')}
            </p>
          </div>

          {/* Site Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-charcoal/40">
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/properties" className="text-sm text-charcoal/70 hover:text-clay-accent transition-editorial">
                  {navT('properties')}
                </Link>
              </li>
              <li>
                <Link href="/offices" className="text-sm text-charcoal/70 hover:text-clay-accent transition-editorial">
                  {navT('offices')}
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-sm text-charcoal/70 hover:text-clay-accent transition-editorial">
                  {navT('areas')}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-sm text-charcoal/70 hover:text-clay-accent transition-editorial">
                  {navT('journal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-charcoal/40">
              {t('contactInfo')}
            </h4>
            <div className="space-y-2 text-sm text-charcoal/70 leading-relaxed">
              <p className="font-medium">{t('address')}</p>
              <p>Email: contact@kaylanguyen.vn</p>
              <p>Hotline: +84 (0) 90 123 4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone/20 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/50">
          <p>{t('copyright')}</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link href="/about" className="hover:text-clay-accent transition-editorial">
              {navT('about')}
            </Link>
            <Link href="/contact" className="hover:text-clay-accent transition-editorial">
              {navT('contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
