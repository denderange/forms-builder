'use client';
import {
  Autocomplete,
  Group,
  Select,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';

interface Props {
  accessType: 'public' | 'restricted';
  setAccessType: (value: 'public' | 'restricted') => void;
  allowedUsers: string[];
  setAllowedUsers: (users: string[]) => void;
}

export const AccessSettings = ({
  accessType,
  setAccessType,
  allowedUsers,
  setAllowedUsers,
}: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const handleUserSelect = (value: string) => {
    const selectedUser = users.find((user) => user.email === value);
    if (selectedUser && !allowedUsers.includes(selectedUser.email)) {
      setAllowedUsers([...allowedUsers, selectedUser.email]);
    }
    setUserSearch('');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (userSearch) {
        const response = await fetch(`/api/users/search?q=${userSearch}`);
        const data = await response.json();
        setUsers(data);
      }
    };

    fetchUsers();
  }, [userSearch]);

  return (
    <Stack
      gap="xs"
      p="md"
      bg={colorScheme === 'dark' ? 'gray.8' : 'gray.2'}
      style={{ borderRadius: '10px 10px 0px 0px' }}
    >
      <Group>
        <Text
          size="xs"
          fw={500}
          flex={4}
          c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}
        >
          Настройки доступа
        </Text>
        <Select
          flex={8}
          size="xs"
          data={[
            { value: 'public', label: 'Публичный (для всех авторизованных)' },
            {
              value: 'restricted',
              label: 'Ограниченный (по списку пользователей)',
            },
          ]}
          value={accessType}
          onChange={(value) => setAccessType(value as 'public' | 'restricted')}
        />
      </Group>

      {accessType === 'restricted' && (
        <Group>
          <Text
            size="xs"
            fw={500}
            flex={4}
            c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}
          >
            Выберите пользователей
          </Text>
          <Autocomplete
            placeholder="Введите email или имя"
            size="xs"
            flex={8}
            data={users.map((user) => user.email)}
            value={userSearch}
            onChange={setUserSearch}
            onOptionSubmit={handleUserSelect}
          />
        </Group>
      )}
    </Stack>
  );
};
