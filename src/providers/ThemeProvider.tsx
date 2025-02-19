'use client';

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorSchemeScript
        nonce="8IBTHwOdqNKAWeKl7plt8g=="
        defaultColorScheme="light"
      />
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
    </>
  );
}
