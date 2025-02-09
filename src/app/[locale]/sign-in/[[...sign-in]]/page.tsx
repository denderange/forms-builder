import Logo from '@/components/Logo/Logo';
import { SignIn } from '@clerk/nextjs';
import { Box, Center, Group } from '@mantine/core';

export default function Page() {
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
