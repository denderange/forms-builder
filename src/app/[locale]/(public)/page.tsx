// 'use client';
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
import PopularTemplatesTable from '@/components/PopularTemplatesTable/PopularTemplatesTable';
import TagCloud from '@/components/TagCloud/TagCloud';
import Footer from '@/components/Footer/Footer';
import { getTemplates, Template } from '@/lib/getTemplates';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  // const t = useTranslations('HomePage');
  const t = await getTranslations('HomePage');
  const templates: Template[] = await getTemplates();

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
          <Grid py={'lg'}>
            {templates.map((template) => (
              <GridCol span={{ base: 12, md: 6, lg: 3 }} key={template.id}>
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  author={template.description}
                />
              </GridCol>
            ))}
          </Grid>
        </Box>

        <Box mt={'md'}>
          <Title order={2}>Топ популярных шаблонов</Title>
          <PopularTemplatesTable />
        </Box>

        <Box mt={'md'}>
          <Title order={2}>Облако тегов</Title>
          <TagCloud tags={['Анкета', 'Опрос', 'Голосование']} />
        </Box>
      </Flex>
      <Footer />
    </Container>
    // <div>main</div>
  );
}
