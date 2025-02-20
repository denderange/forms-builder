'use client';
import { uploadImage } from '@/lib/uploadImage';
import { updateQuestionImage } from '@/store/slices/formTemplateSlice';
import {
  ActionIcon,
  Box,
  Loader,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { ImagePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export const UploadQuestionImage = ({ questionId }: { questionId: string }) => {
  const t = useTranslations('UploadQuestionImage');
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        dispatch(updateQuestionImage({ id: questionId, imageUrl }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      {isLoading ? (
        <Loader color="gray" size="xs" type="bars" />
      ) : (
        <Tooltip label={t('Insert image')}>
          <ActionIcon
            variant="outline"
            bg={colorScheme === 'dark' ? 'dark.6' : 'white'}
            aria-label="Add image"
            onClick={handleClick}
          >
            <ImagePlus size={16} />
          </ActionIcon>
        </Tooltip>
      )}
    </Box>
  );
};
