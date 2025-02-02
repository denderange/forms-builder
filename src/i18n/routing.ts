import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
