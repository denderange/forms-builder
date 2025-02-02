'use client';
import { Button } from '@mantine/core';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('about')}</p>
      <ThemeToggle />
      <LocaleSwitcher />
      <div>
        <Button>Next link button</Button>
      </div>
      <div>
        <h2>{t('title')}</h2>
        <Link href="/about">{t('about')}</Link>
      </div>
    </div>
  );
}
