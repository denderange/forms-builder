'use client';
import { Button } from '@mantine/core';
import { UserRoundPen } from 'lucide-react';
import React from 'react';

const ButtonSignIn = () => {
  return (
    <Button
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      leftSection={<UserRoundPen size={14} />}
    >
      Sign In
    </Button>
  );
};

export default ButtonSignIn;
