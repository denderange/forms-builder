'use client';
import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="default" px={'sm'} onClick={toggleColorScheme}>
      {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};
