import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      formTitle,
      formDescription,
      questions,
      accessType,
      allowedUsers,
      tags,
      authorId,
    } = await req.json();

    if (!formTitle || !formDescription || !questions || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newFormTemplateData: any = {
      formTitle,
      formDescription,
      accessType,
      allowedUsers,
      author: {
        connect: { id: authorId },
      },
      questions: {
        create: questions.map((question: any) => ({
          questionTitle: question.questionTitle,
          type: question.type,
          options: {
            create: question.options.map((option: any) => ({
              text: option.text,
            })),
          },
          imageUrl: question.imageUrl || null,
          isRequired: question.isRequired || false,
          position: question.position || 0,
        })),
      },
    };

    if (tags && tags.length > 0) {
      newFormTemplateData.tags = {
        create: tags.map((tag: { name: string }) => ({
          name: tag.name,
        })),
      };
    }

    const newFormTemplate = await db.formTemplate.create({
      data: newFormTemplateData,
    });

    return NextResponse.json(newFormTemplate, { status: 201 });
  } catch (error) {
    console.error('Error creating form template:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the form template' },
      { status: 500 }
    );
  }
}
