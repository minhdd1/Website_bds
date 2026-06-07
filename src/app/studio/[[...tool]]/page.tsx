'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-ivory">
      <NextStudio config={config} />
    </div>
  );
}
