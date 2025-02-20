'use client';

import { useEffect, useState } from 'react';
import {
  Group,
  Combobox,
  CheckIcon,
  Pill,
  PillsInput,
  useCombobox,
  Text,
  useMantineColorScheme,
  Stack,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTags } from '@/store/slices/formTemplateSlice';

interface Tag {
  id: string;
  name: string;
}

const TagsInput = () => {
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const selectedTags = useSelector(
    (state: RootState) => state.formTemplate.formTemplate.tags
  );
  const [tags, setAvailableTags] = useState<Tag[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const exactOptionMatch =
    Array.isArray(tags) &&
    tags.some((item) => item.name.toLowerCase() === search.toLowerCase());

  const handleValueSelect = (val: string) => {
    if (val === '$create') {
      fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: search }),
      })
        .then((response) => response.json())
        .then((createdTag) => {
          setAvailableTags((prev) => [...prev, createdTag]);
          setValue((current) => [...current, createdTag.id]);
          setSearch('');
          dispatch(setTags([...selectedTags, createdTag])); // Обновляем Redux
        })
        .catch((error) => console.error('Error creating new tag', error));
    } else {
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val]
      );

      const selected = tags.find((tag) => tag.id === val);
      if (selected) {
        dispatch(setTags([...selectedTags, selected]));
      }
    }
  };

  const handleValueRemove = (val: string) => {
    setValue((current) => current.filter((v) => v !== val));
  };

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {tags.find((tag) => tag.id === item)?.name}
    </Pill>
  ));

  const options = tags
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option
        value={item.id}
        key={item.id}
        active={value.includes(item.id)}
      >
        <Group gap="sm">
          {value.includes(item.id) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  useEffect(() => {
    fetch('/api/tags')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAvailableTags(data);
        } else {
          console.error('Invalid tags format:', data);
          setAvailableTags([]);
        }
      })
      .catch((error) => console.error('Error loading tags:', error));
  }, []);

  useEffect(() => {
    const selected = tags.filter((tag) => value.includes(tag.id));
    dispatch(setTags(selected));
  }, [value, tags, dispatch]);

  return (
    <Stack gap={0} mt="xs">
      <Text size="xs" fw={500} c={colorScheme === 'dark' ? 'gray.6' : 'gray.7'}>
        Tags:
      </Text>
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
      >
        <Combobox.DropdownTarget>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Search or add tags"
                  onChange={(event) => setSearch(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Combobox.Options>
              {options}

              {!exactOptionMatch && search.trim().length > 0 && (
                <Combobox.Option value="$create">
                  + Create "{search}"
                </Combobox.Option>
              )}

              {exactOptionMatch &&
                search.trim().length > 0 &&
                options.length === 0 && (
                  <Combobox.Empty>No matches found</Combobox.Empty>
                )}
            </Combobox.Options>
          </div>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
};

export default TagsInput;
