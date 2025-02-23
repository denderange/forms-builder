import { Metadata } from 'next';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Fill out the form',
  description: 'Fill out the form',
};
export default function FormFillPageLayout({
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
