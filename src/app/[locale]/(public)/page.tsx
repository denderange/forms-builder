'use client';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Title,
} from '@mantine/core';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Header from '@/components/Header/Header';
import TemplateCard from '@/components/TemplateCard/TemplateCard';
import TagCloud from '@/components/TagCloud/TagCloud';
import Footer from '@/components/Footer/Footer';
import {
  getPopularTemplates,
  getTags,
  getTemplates,
} from '@/lib/templateService';
import { getTranslations } from 'next-intl/server';
import { useEffect, useState } from 'react';
import PopularTemplates from '@/components/PopularTemplates/PopularTemplates';
import Templates from '@/components/Tmplates/Tmplates';

export default function Home() {
  const t = useTranslations('HomePage');
  // const t = await getTranslations('HomePage');
  // const templates: Template[] = await getTemplates();

  return (
    <Container
      size={'xl'}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Flex direction={'column'} style={{ flexGrow: '1' }}>
        <Box component="main">
          <Title order={2}>Последние шаблоны</Title>
          <Templates />
        </Box>

        <Box mt={'md'}>
          <Title order={2}>Топ популярных шаблонов</Title>
          <PopularTemplates />
        </Box>

        <Box mt={'md'}>
          <Title order={2}>Облако тегов</Title>
          <TagCloud />
        </Box>
      </Flex>
      <Footer />
    </Container>
    // <div>main</div>
  );
}
