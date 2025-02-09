import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Box, Button } from '@mantine/core';
import { UserRoundPen } from 'lucide-react';

const ClerkButtons = () => {
  return (
    <Box>
      <SignedOut>
        <SignInButton>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            leftSection={<UserRoundPen size={14} />}
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Box>
  );
};

export default ClerkButtons;
