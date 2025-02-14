'use client';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorSchemeScript
        nonce="8IBTHwOdqNKAWeKl7plt8g=="
        defaultColorScheme="light"
      />
      <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
    </>
  );
}
