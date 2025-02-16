import { uploadImage } from '@/lib/uploadImage';
import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

export const UploadQuestionImage = () => {
  const { colorScheme } = useMantineColorScheme();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      setImageUrl(url);
      console.log('Uploaded image URL:', url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: 200 }} />}
    </div>
    // <Tooltip label="Вставить изображение">
    //   <ActionIcon
    //     variant="outline"
    //     bg={colorScheme === 'dark' ? 'dark.6' : 'white'}
    //     aria-label="Add image"
    //     // onClick={() => dispatch(removeQuestion(id))}
    //   >
    //     <ImagePlus size={16} />
    //   </ActionIcon>
    // </Tooltip>
  );
};
