'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Box } from '@mantine/core';
import ButtonSignIn from '../ButtonSignIn/ButtonSignIn';

export default function ClerkButtons() {
  return (
    <Box>
      <SignedOut>
        <SignInButton>
          {/* <ButtonSignIn /> */}
          <button>-=Sign in=-</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Box>
  );
}
