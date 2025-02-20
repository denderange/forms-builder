import type { Metadata } from 'next';
import { Container, Flex, mantineHtmlProps } from '@mantine/core';
import ThemeProvider from '@/providers/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/Footer/Footer';
import StoreProvider from '@/providers/StoreProvider';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './globals.css';

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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <NextIntlClientProvider messages={messages} locale={locale}>
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
                    flex={1}
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
