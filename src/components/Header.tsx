'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('properties'), path: '/properties' },
    { name: t('offices'), path: '/offices' },
    { name: t('areas'), path: '/areas' },
    { name: t('journal'), path: '/journal' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone/30 bg-ivory/80 backdrop-blur-md transition-editorial">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="font-serif text-xl font-medium tracking-widest text-charcoal uppercase hover:opacity-85 transition-editorial"
            >
              Kayla Nguyen
            </Link>
            <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-semibold mt-0.5">
              {t('editorialRealEstate')}
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium tracking-wide transition-editorial hover:text-clay-accent ${
                  isActive(item.path)
                    ? 'text-clay-accent border-b border-clay/30 pb-1'
                    : 'text-charcoal/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-charcoal hover:text-clay-accent transition-editorial"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone/30 bg-ivory py-4 px-4 transition-editorial animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium tracking-wide py-2 border-b border-stone/10 ${
                  isActive(item.path) ? 'text-clay-accent' : 'text-charcoal/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
