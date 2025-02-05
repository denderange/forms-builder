import { Box, Title, Text } from '@mantine/core';
import React from 'react';

type TemplateCardProps = {
  title: string;
  description: string;
  author: string;
};

const TemplateCard = ({ title, description, author }: TemplateCardProps) => {
  return (
    <Box
      p={'sm'}
      bd={'1px solid red.6'}
      style={{ borderRadius: '8px' }}
      // className="p-4 border rounded-lg shadow"
    >
      {/* <h3 className="text-lg font-bold">{title}</h3> */}
      {/* <p className="text-sm text-gray-600">{description}</p> */}
      {/* <p className="text-xs text-gray-400 mt-2">Автор: {author}</p> */}
      <Title order={3}>{title}</Title>
      <Text size="md">{description}</Text>
      <Text size="md">Автор: {author}</Text>
    </Box>
  );
};

export default TemplateCard;
