'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ConsultationForm() {
  const t = useTranslations('Forms');
  const commonT = useTranslations('Common');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'apartment',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          propertyType: 'apartment',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="w-full bg-linen border border-stone/40 p-8 md:p-10 rounded-sm shadow-sm transition-editorial">
      <h3 className="font-serif text-2xl mb-2 text-charcoal">{commonT('consultation')}</h3>
      <p className="text-sm text-charcoal/60 mb-8">{commonT('consultationDesc')}</p>

      {status === 'success' && (
        <div className="p-4 mb-6 text-sm text-sage bg-sage/10 border border-sage/20 rounded">
          {commonT('submitSuccess')}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 mb-6 text-sm text-clay bg-clay/10 border border-clay/20 rounded">
          {commonT('submitError')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
            {t('fullName')} *
          </label>
          <input
            type="text"
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            suppressHydrationWarning
            className="w-full px-4 py-3 bg-ivory border border-stone/40 text-charcoal focus:outline-none focus:border-clay-accent text-sm rounded-none transition-editorial"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
              {t('phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              suppressHydrationWarning
              className="w-full px-4 py-3 bg-ivory border border-stone/40 text-charcoal focus:outline-none focus:border-clay-accent text-sm rounded-none transition-editorial"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
              {t('email')} *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              suppressHydrationWarning
              className="w-full px-4 py-3 bg-ivory border border-stone/40 text-charcoal focus:outline-none focus:border-clay-accent text-sm rounded-none transition-editorial"
            />
          </div>
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
            {t('propertyType')}
          </label>
          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            suppressHydrationWarning
            className="w-full px-4 py-3 bg-ivory border border-stone/40 text-charcoal focus:outline-none focus:border-clay-accent text-sm rounded-none transition-editorial appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%232F2A25\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          >
            <option value="apartment">{t('apartment')}</option>
            <option value="office">{t('office')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
            {t('message')}
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            suppressHydrationWarning
            className="w-full px-4 py-3 bg-ivory border border-stone/40 text-charcoal focus:outline-none focus:border-clay-accent text-sm rounded-none transition-editorial"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          suppressHydrationWarning
          className="w-full bg-charcoal hover:bg-clay-accent text-ivory text-xs uppercase tracking-widest font-semibold py-4 px-6 transition-editorial disabled:opacity-50"
        >
          {status === 'submitting' ? commonT('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}
