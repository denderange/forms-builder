export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ltma6zbn');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dfxyyxwqs/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
