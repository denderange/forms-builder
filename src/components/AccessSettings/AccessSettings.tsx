'use client';
import {
  ActionIcon,
  Autocomplete,
  Badge,
  Group,
  Loader,
  Select,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
  accessType: 'PUBLIC' | 'RESTRICTED';
  setAccessType: (value: 'PUBLIC' | 'RESTRICTED') => void;
  allowedUsers: string[];
  setAllowedUsers: (users: string[]) => void;
}

export const AccessSettings = ({
  accessType,
  setAccessType,
  allowedUsers,
  setAllowedUsers,
}: Props) => {
  const t = useTranslations('AccessSettings');
  const { colorScheme } = useMantineColorScheme();
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [debouncedSearch] = useDebounce(userSearch, 300);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserSelect = (value: string) => {
    const selectedUser = users.find((user) => user.email === value);
    if (selectedUser && !allowedUsers.includes(selectedUser.email)) {
      setAllowedUsers([...allowedUsers, selectedUser.email]);
    }
    setTimeout(() => setUserSearch(''), 0);
  };

  const handleRemoveUser = (email: string) => {
    setAllowedUsers(allowedUsers.filter((user) => user !== email));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedSearch) {
        setUsers([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/search?q=${debouncedSearch}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch]);

  return (
    <>
      <Group>
        <Text
          size="xs"
          fw={500}
          flex={4}
          c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}
        >
          {t('Access settings')}
        </Text>
        <Select
          flex={8}
          size="xs"
          data={[
            { value: 'PUBLIC', label: t('Public') },
            {
              value: 'RESTRICTED',
              label: t('Limited'),
            },
          ]}
          value={accessType}
          onChange={(value) => setAccessType(value as 'PUBLIC' | 'RESTRICTED')}
        />
      </Group>

      {accessType === 'RESTRICTED' && (
        <Group>
          <Text
            size="xs"
            fw={500}
            flex={4}
            c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}
          >
            {t('Select users')}
          </Text>
          <Autocomplete
            key={allowedUsers.length}
            placeholder={t('Enter email')}
            size="xs"
            flex={8}
            data={users.map((user) => user.email)}
            value={userSearch}
            onChange={setUserSearch}
            onOptionSubmit={handleUserSelect}
            rightSectionPointerEvents="none"
            rightSection={
              isLoading ? (
                <Loader size="xs" color="cyan" type="dots" mr="md" />
              ) : null
            }
          />
        </Group>
      )}

      {allowedUsers.length > 0 && (
        <Group gap="xs" mt="xs">
          <Text
            size="xs"
            fw={500}
            c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}
          >
            {t('Have access to')}
          </Text>
          {allowedUsers.map((email) => (
            <Badge
              key={email}
              size="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              rightSection={
                <ActionIcon
                  onClick={() => handleRemoveUser(email)}
                  p={0}
                  bg="transparent"
                >
                  <X size={12} color="white" strokeWidth={3} />
                </ActionIcon>
              }
            >
              {email}
            </Badge>
          ))}
        </Group>
      )}
    </>
  );
};
