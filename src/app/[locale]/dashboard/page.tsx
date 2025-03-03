'use client';
import { UsersList } from '@/components/UsersList/UsersList';
import { Box, Button, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

interface UserDetails {
  id: string;
  clerkId: string;
  role: string;
  createdAt: string;
  name: string;
}

const DashboardPage = () => {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchToken() {
    const res = await fetch('/api/token');
    const data = await res.json();
    setApiToken(data.apiToken);
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user');
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error('Error fetching user', error);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <Box>
      <Group gap="xl" align="flex-start">
        <button onClick={fetchToken}>Получить API-токен</button>
        {apiToken && (
          <p>
            Ваш API-токен: <code>{apiToken}</code>
          </p>
        )}
        {/* <Text fw={500}>{user?.name}</Text> */}

        <UsersList />
      </Group>
    </Box>
  );
};

export default DashboardPage;
