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
    <Button variant="default" size="compact-md" onClick={toggleColorScheme}>
      {computedColorScheme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
