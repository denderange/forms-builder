'use client';
import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="default" px={'sm'} onClick={toggleColorScheme}>
      {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};
