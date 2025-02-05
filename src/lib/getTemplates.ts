export type Template = {
  id: number;
  title: string;
  description: string;
  author: string;
};

export async function getTemplates(): Promise<Template[]> {
  // Здесь может быть реальный запрос к API или базе данных
  // const res = await fetch("https://api.example.com/templates", {
  //   next: { revalidate: 60 }, // ISR: обновление данных раз в 60 сек
  // });

  // if (!res.ok) throw new Error("Ошибка загрузки шаблонов");

  // return res.json();
  return [
    {
      id: 1,
      title: 'Опрос UX',
      description: 'Опрос о пользовательском опыте',
      author: 'Иван',
    },
    {
      id: 2,
      title: 'Анкета HR',
      description: 'Анкета для подбора персонала',
      author: 'Анна',
    },
    {
      id: 3,
      title: 'Голосование',
      description: 'Выберите лучший дизайн',
      author: 'Мария',
    },
  ];
}
