'use client';
import { Box, Button, Flex, Group, TextInput, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import { SignInButton as SingButton, useAuth, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

const Header = () => {
  const { isSignedIn } = useAuth();
  const t = useTranslations('HomePage');

  return (
    <Group justify="space-between" py={'md'}>
      <Title order={1}>
        <Link href={'/'}>FormApp</Link>
      </Title>

      <Group gap={'sm'}>
        <TextInput placeholder="Поиск..." />
        <Button size="compact-md">Создать шаблон</Button>
        {/* <Button size="compact-md">Профиль</Button> */}
      </Group>
      <Group>
        {isSignedIn ? (
          <UserButton afterSwitchSessionUrl="/" />
        ) : (
          <div>
            <SingButton mode="modal">
              <Button size="compact-md">Войти</Button>
            </SingButton>
          </div>
        )}
      </Group>
      <Group>
        <h1>{t('title')}</h1>
        {/* <p>{t('about')}</p> */}
        <ThemeToggle />
        <LocaleSwitcher />
        {/* <div>
            <h2>{t('title')}</h2>
            <Link href="/about">{t('about')}</Link>
          </div> */}
      </Group>
    </Group>
    // <div>header</div>
  );
};

export default Header;
