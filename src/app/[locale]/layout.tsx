import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@mantine/core/styles.css';
import {
  ColorSchemeScript,
  Container,
  Flex,
  mantineHtmlProps,
} from '@mantine/core';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/Footer/Footer';
import StoreProvider from '@/providers/StoreProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DD Forms',
  description: 'Forms builder',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} {...mantineHtmlProps}>
        <head>{/* <ColorSchemeScript /> */}</head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <StoreProvider>
                <Container
                  size={'xl'}
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Flex
                    direction={'column'}
                    style={{ flexGrow: '1' }}
                    component={'main'}
                    pb={'xl'}
                  >
                    {children}
                  </Flex>
                  <Footer />
                </Container>
              </StoreProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
