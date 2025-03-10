'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setFormTemplateDescription } from '@/store/slices/formTemplateSlice';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const TextEditor = () => {
  const t = useTranslations('TextEditor');
  const dispatch = useDispatch();
  const formDescription = useSelector(
    (state: RootState) => state.formTemplate.formTemplate.formDescription
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({ placeholder: t('Your text description here') }),
    ],
    content: formDescription,
    onUpdate: ({ editor }) => {
      dispatch(setFormTemplateDescription(editor.getHTML()));
    },
    immediatelyRender: false,
  });

  return (
    <Stack gap={0}>
      <Text size="sm" fw={500}>
        {t('Description')}
      </Text>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Blockquote />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
};
