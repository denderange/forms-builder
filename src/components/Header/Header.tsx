'use client';
import { Button, Group, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { SquarePen } from 'lucide-react';
import Logo from '../Logo/Logo';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import ClerkButtons from '../Buttons/ClerkButtons/ClerkButtons';

const Header = () => {
  const t = useTranslations('Header');

  return (
    <Group
      justify="space-between"
      py={'md'}
      gap={'xl'}
      component={'header'}
      align="center"
    >
      <Logo />
      <TextInput placeholder={t('Search')} flex={1} />
      <Group gap={'md'} style={{ margin: '0px auto' }}>
        <Link href={'/create'}>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            leftSection={<SquarePen size={14} />}
          >
            {t('Create form')}
          </Button>
        </Link>
        <ClerkButtons />
        <Group>
          <ThemeToggle />
          <LocaleSwitcher />
        </Group>
      </Group>
    </Group>
  );
};

export default Header;
