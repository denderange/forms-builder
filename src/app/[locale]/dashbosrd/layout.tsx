import { Flex, Group } from '@mantine/core';
import { redirect } from 'next/navigation';
// import '@mantine/dates/styles.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (!session.user) redirect("/login");

  return (
    <Flex gap={'md'}>
      {/* <NavMenu /> */}
      {children}
    </Flex>
  );
}
