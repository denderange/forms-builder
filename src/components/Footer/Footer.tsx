import { Center, Text } from '@mantine/core';
import React from 'react';

const Footer = () => {
  return (
    <Center className="bg-gray-800 text-white p-4 text-center">
      <Text size="xs" c="dimmed">
        &copy; 2025 DD FormApp. Dennis Polukaroff.
      </Text>
    </Center>
  );
};

export default Footer;
