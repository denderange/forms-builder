import Logo from '@/components/Logo/Logo';
import { SignIn } from '@clerk/nextjs';
import { Box, Center } from '@mantine/core';

export default async function Page() {
  return (
    <Box mx={'auto'} py={'lg'}>
      <Center my={'lg'} pb={'lg'}>
        <Logo />
      </Center>
      <Box my={'lg'}>
        <SignIn />
      </Box>
    </Box>
  );
}
