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

    // Создаем запись шаблона формы
    const newFormTemplate = await db.formTemplate.create({
      data: {
        formTitle,
        formDescription,
        accessType,
        allowedUsers,
        author: {
          connect: { id: authorId },
        },
        tags: {
          create: tags.map((tag: any) => ({ name: tag.name })),
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
            imageUrl: question.imageUrl,
            isRequired: question.isRequired,
            position: question.position,
          })),
        },
      },
    });

    return NextResponse.json(newFormTemplate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Произошла ошибка при создании шаблона формы' },
      { status: 500 }
    );
  }
}
