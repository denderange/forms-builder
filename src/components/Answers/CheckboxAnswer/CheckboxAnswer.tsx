import {
  Group,
  CheckboxGroup,
  Checkbox,
  TextInput,
  CloseButton,
} from '@mantine/core';
import { X } from 'lucide-react';
import { ButtonAddOption } from '@/components/ButtonAddOption/ButtonAddOption';

type Props = {
  options: string[];
  addOption: () => void;
  updateOption: (index: number, text: string) => void;
  removeOption: (index: number) => void;
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
              <Checkbox value={option} />
              <TextInput
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
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
              icon={<X size={18} color="#be004f" />}
              onClick={() => removeOption(index)}
              size="xs"
            />
          </Group>
        ))}
      </CheckboxGroup>
      <ButtonAddOption onClick={addOption} />
    </>
  );
}
