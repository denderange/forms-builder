'use client';
import {
  Button,
  Group,
  Loader,
  Paper,
  ScrollArea,
  TextInput,
  Text,
  Stack,
  Badge,
  Autocomplete,
  ActionIcon,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { MonitorCog, SquarePen } from 'lucide-react';
import Logo from '../Logo/Logo';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import ClerkButtons from '../Buttons/ClerkButtons/ClerkButtons';
import { useDebounce } from 'use-debounce';
import { SignedIn } from '@clerk/nextjs';

const Header = () => {
  const t = useTranslations('Header');
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveResult = (id: string) => {
    setResults(results.filter((result: any) => result.id !== id));
  };

  useEffect(() => {
    const fetchForms = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${debouncedQuery}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching forms', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, [debouncedQuery]);

  return (
    <Group
      justify="space-between"
      py={'md'}
      gap={'xl'}
      component={'header'}
      align="center"
    >
      <Logo />

      <Autocomplete
        placeholder={t('Search')}
        size="md"
        flex={1}
        value={query}
        onChange={setQuery}
        rightSection={isLoading ? <Loader size="xs" color="cyan" /> : null}
        data={results.map((result: any) => result.formTitle)}
        onSubmit={(item: any) => setQuery(item)}
      />

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
        <SignedIn>
          <Link href={'/dashboard'}>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              leftSection={<MonitorCog size={14} />}
            >
              Dashboard
            </Button>
          </Link>
        </SignedIn>
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
