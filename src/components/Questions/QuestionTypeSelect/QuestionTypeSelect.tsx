import { Select } from '@mantine/core';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function QuestionTypeSelect({ value, onChange }: Props) {
  return (
    <Select
      description="Тип ответа"
      placeholder="Выберите вариант"
      data={[
        { value: 'text', label: 'Текст' },
        { value: 'radio', label: 'Один вариант' },
        { value: 'checkbox', label: 'Несколько вариантов' },
      ]}
      value={value}
      onChange={(value) => onChange(value!)}
      w="50%"
      mt={'md'}
    />
  );
}
