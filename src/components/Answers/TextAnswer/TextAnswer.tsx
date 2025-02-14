import { TextInput } from '@mantine/core';

export function TextAnswer({ id }: { id: string }) {
  return <TextInput placeholder="Здесь будет ответ пользователя" disabled />;
}
