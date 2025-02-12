import {
  Group,
  CheckboxGroup,
  Checkbox,
  TextInput,
  CloseButton,
} from '@mantine/core';
import { X } from 'lucide-react';
import { ButtonAddOption } from '@/components/Buttons/ButtonAddOption/ButtonAddOption';

type Option = { id: string; text: string };

type Props = {
  options: Option[];
  addOption: () => void;
  updateOption: (id: string, text: string) => void;
  removeOption: (id: string) => void;
};

export function CheckboxAnswer({
  options,
  addOption,
  updateOption,
  removeOption,
}: Props) {
  return (
    <>
      <CheckboxGroup>
        {options.map((option, index) => (
          <Group key={index} justify="space-between" my="md">
            <Group style={{ flex: '1' }}>
              <Checkbox value={option.text} />
              <TextInput
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder="Введите вариант"
                variant="unstyled"
                style={{
                  backgroundColor: 'white',
                  borderBottom: '1px solid #a5a5a5',
                  flex: '1',
                  marginTop: '-5px',
                }}
              />
            </Group>
            <CloseButton
              icon={<X size={18} color="#d6336c" />}
              onClick={() => removeOption(option.id)}
              size="xs"
            />
          </Group>
        ))}
      </CheckboxGroup>
      <ButtonAddOption onClick={addOption} />
    </>
  );
}
