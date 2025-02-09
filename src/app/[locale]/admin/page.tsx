import { redirect } from 'next/navigation';
import { SearchUsers } from './SearchUsers';
import { clerkClient } from '@clerk/nextjs/server';
import { removeRole, setRole } from './_actions';
import { checkRole } from '../../../../utils/roles';
import { Box, Center, Group, Text } from '@mantine/core';

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole('admin')) {
    redirect('/');
  }

  const query = (await params.searchParams).search;
  const client = await clerkClient();
  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <Center>
      <Text>
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </Text>

      <SearchUsers />

      {users.map((user) => {
        return (
          <Group key={user.id}>
            <Box>
              {user.firstName} {user.lastName}
            </Box>

            <Box>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </Box>

            <Box>{user.publicMetadata.role as string}</Box>

            <form action={setRole}>
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="admin" name="role" />
              <button type="submit">Make Admin</button>
            </form>

            <form action={setRole}>
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="moderator" name="role" />
              <button type="submit">Make Moderator</button>
            </form>

            <form action={removeRole}>
              <input type="hidden" value={user.id} name="id" />
              <button type="submit">Remove Role</button>
            </form>
          </Group>
        );
      })}
    </Center>
  );
}
