import { Link } from '@/i18n/routing';
// import { getTags } from '@/lib/templateService';
import { Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const TagCloud = () => {
  const [tags, setTags] = useState<string[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const tagData = await getTags();

  //       setTags(tagData);
  //     } catch (error) {
  //       console.error('Ошибка загрузки данных:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  return (
    <Box mt={'md'}>
      <Title order={2}>Облако тегов</Title>
      <Group my="md">
        <Title order={2}>Теги</Title>
        <Group>
          {tags.map((tag, index) => (
            <Link href={`/search?tag=${tag}`} key={index}>
              <Button>{tag}</Button>
            </Link>
          ))}
        </Group>
      </Group>
    </Box>
  );
};

export default TagCloud;
