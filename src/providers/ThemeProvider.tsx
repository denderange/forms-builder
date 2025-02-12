'use client';

import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme={'light'}>{children}</MantineProvider>
  );
}
