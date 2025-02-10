'use client';
import { Button, Group, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { SquarePen } from 'lucide-react';
import Logo from '../Logo/Logo';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { Link, usePathname } from '@/i18n/routing';
import ClerkButtons from '../ClerkButtons/ClerkButtons';

const Header = () => {
  const t = useTranslations('HomePage');

  return (
    <Group
      justify="space-between"
      py={'md'}
      gap={'xl'}
      component={'header'}
      align="center"
    >
      <Logo />
      {/* <Title variant="h5">{t('title')}</Title> */}
      <TextInput placeholder="Поиск..." style={{ flexGrow: '1' }} />
      <Group gap={'md'}>
        <Link href={'/create'}>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            leftSection={<SquarePen size={14} />}
          >
            Создать форму
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
