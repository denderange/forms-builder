import { Group, Text } from '@mantine/core';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'} className={'logo'}>
      <Group
        gap={1}
        wrap="nowrap"
        style={{ maxWidth: 'max-content' }}
        maw={'wrap-content'}
      >
        <LayoutDashboard />
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 90 }}
        >
          DForms
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
