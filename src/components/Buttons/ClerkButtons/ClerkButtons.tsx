'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function ClerkButtons() {
  const t = useTranslations('Buttons');

  return (
    <>
      <SignedOut>
        <SignInButton>
          <button className={'btnSignIn'}>{t('Sign In')}</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
