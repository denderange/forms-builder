import { Metadata } from 'next';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'Dashboard page',
};
export default function DashboardPageLayout({
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
