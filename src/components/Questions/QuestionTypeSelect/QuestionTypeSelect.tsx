import { Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionOptions,
  updateQuestionType,
} from '@/store/slices/formTemplateSlice';
import { RootState } from '@/store/store';
import { questionTypeOptions } from '@/constants/questionTypeOptions';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

export const QuestionTypeSelect = ({ id }: { id: string }) => {
  const t = useTranslations('Questions');
  const dispatch = useDispatch();

  const question = useSelector((state: RootState) =>
    state.formTemplate.formTemplate.questions.find((q) => q.id === id)
  );

  if (!question) return null;

  const { type, options } = question;

  const handleChange = (newType: string | null) => {
    if (newType === null) return;

    dispatch(updateQuestionType({ id, type: newType }));

    if (
      (newType === 'radio' || newType === 'checkbox') &&
      options.length === 0
    ) {
      dispatch(
        updateQuestionOptions({ id, options: [{ id: uuidv4(), text: '' }] })
      );
    }

    if (newType === 'text') {
      dispatch(updateQuestionOptions({ id, options: [] }));
    }
  };

  return (
    <Select
      label={t('Response type')}
      placeholder={t('Select an option')}
      data={questionTypeOptions}
      onChange={handleChange}
      value={type}
      w="50%"
    />
  );
};
