'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function ClerkButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button className={'btnSignIn'}>Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
