'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { checkRole } from '../../../../utils/roles';

export async function setRole(formData: FormData): Promise<any> {
  const client = await clerkClient();

  if (!checkRole('admin')) {
    return { message: 'Not Authorized' };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        publicMetadata: { role: formData.get('role') },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData): Promise<any> {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        publicMetadata: { role: null },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
