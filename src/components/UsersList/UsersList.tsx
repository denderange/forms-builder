'use client';

import { Box, Title, Text, List, ListItem, Button } from '@mantine/core';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function toggleRole(userId: string) {
    try {
      const res = await fetch(`/api/users/${userId}/role`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Error update role');

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users/getallusers');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Box>
      <Title order={6}>Users list:</Title>
      {loading ? (
        <Text size="xs" c="dimmed">
          Loading...
        </Text>
      ) : (
        <List type="ordered" mt="lg">
          {users.map((user) => (
            <ListItem key={user.id}>
              {user.name} — <b>{user.role}</b>
              <Button
                variant="default"
                size="compact-xs"
                c="gray"
                onClick={() => toggleRole(user.id)}
                ml="xl"
              >
                {user.role === 'admin' ? 'Make Ordinary' : 'Make Admin'}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
