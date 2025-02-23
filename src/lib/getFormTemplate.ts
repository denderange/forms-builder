import { NextResponse } from 'next/server';

export const getFormTemplate = async (id: string) => {
  console.log('getFormTemplate Received ID:', id);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`
    );

    console.log(
      'Request URL:',
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`
    );

    if (!res.ok) {
      console.log('Error: Template not found');
      return NextResponse.json(
        { error: 'Not Found Form Template' },
        { status: 404 }
      );
    }

    const data = await res.json();
    console.log('getFormTemplate Received data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching form template:', error);
    return null;
  }
};
