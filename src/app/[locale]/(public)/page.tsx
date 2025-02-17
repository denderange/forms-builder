'use client';
import { useTranslations } from 'next-intl';
import TagCloud from '@/components/TagCloud/TagCloud';
import PopularTemplates from '@/components/PopularTemplates/PopularTemplates';
import Templates from '@/components/Tmplates/Tmplates';
import Header from '@/components/Header/Header';

export default function Home() {
  const t = useTranslations('HomePage');
  // const t = await getTranslations('HomePage');
  // const templates: Template[] = await getTemplates();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      console.log(data); // { message: "Hello from API!" }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Header />
      <Templates />
      <PopularTemplates />
      <TagCloud />
      <button onClick={fetchData}>Test Fetch API</button>
    </>
  );
}
