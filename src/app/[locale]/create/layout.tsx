import { Metadata } from 'next';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Create new form',
  description: 'Create form template',
};
export default function CreateTemplatePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
