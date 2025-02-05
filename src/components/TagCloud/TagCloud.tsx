import { Flex, Text } from '@mantine/core';
import React from 'react';

type TagCloudProps = {
  tags: string[];
};

const TagCloud = ({ tags }: TagCloudProps) => {
  return (
    <Flex
    // className="flex flex-wrap gap-2"
    >
      {tags.map((tag, index) => (
        <Text
          span
          key={index}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
        >
          {tag}
        </Text>
      ))}
    </Flex>
  );
};

export default TagCloud;
