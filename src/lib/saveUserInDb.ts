import { db } from './db';

export const saveUserInDb = async (userId: string) => {
  if (!userId) return;

  try {
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      await db.user.create({
        data: { clerkId: userId },
      });

      console.log(`User with ID ${userId} has been saved in the database`);
    }
  } catch (error) {
    console.log('Error to save user in database: ', error);
  }
};
