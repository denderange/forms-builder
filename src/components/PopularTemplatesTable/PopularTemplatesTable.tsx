import React from 'react';

const PopularTemplatesTable = () => {
  const templates = [
    { id: 1, title: 'Опрос по UX', submissions: 120 },
    { id: 2, title: 'Анкета для HR', submissions: 95 },
  ];
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2">Название</th>
          <th className="text-left p-2">Заполнений</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.id}>
            <td className="p-2">{template.title}</td>
            <td className="p-2">{template.submissions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PopularTemplatesTable;
