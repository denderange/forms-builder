import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user } = useUser();

  if (!user) return <p>Загрузка...</p>;

  const role = user.publicMetadata.role || 'user'; // Если роли нет, значит "user"

  return (
    <div>
      <h1>Панель управления</h1>
      <p>Ваша роль: {`${role}`}</p>
      {role === 'admin' && <button>Управление пользователями</button>}
    </div>
  );
}
