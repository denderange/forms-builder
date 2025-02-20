import TagCloud from '@/components/TagCloud/TagCloud';
import PopularTemplates from '@/components/PopularTemplates/PopularTemplates';
import Templates from '@/components/Tmplates/Tmplates';
import Header from '@/components/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Templates />
      <PopularTemplates />
      <TagCloud />
    </>
  );
}
