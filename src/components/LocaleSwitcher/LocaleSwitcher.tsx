'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { NativeSelect } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <NativeSelect
      defaultValue={locale}
      disabled={isPending}
      data={routing.locales.map((cur) => ({
        value: cur,
        label: t('locale', { locale: cur }),
      }))}
      onChange={onSelectChange}
    />
  );
}
