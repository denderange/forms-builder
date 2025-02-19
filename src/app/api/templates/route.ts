import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', JSON.stringify(body, null, 2));

    const {
      formId,
      formTitle,
      formDescription,
      questions,
      accessType,
      allowedUsers,
      tags,
      authorId,
    } = body.form;

    // Проверка наличия обязательных данных
    if (!authorId) {
      return NextResponse.json(
        { success: false, error: 'Author ID is required' },
        { status: 400 }
      );
    }

    if (!tags || tags.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one tag is required' },
        { status: 400 }
      );
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one question is required' },
        { status: 400 }
      );
    }

    // Подготовка данных для сохранения
    const templateData = {
      title: formTitle,
      description: formDescription,
      accessType,
      allowedUsers: allowedUsers || [],
      author: { connect: { id: authorId } },
      tags: {
        connectOrCreate: tags.map((tag: any) => ({
          where: { name: tag.name },
          create: { name: tag.name },
        })),
      },
      questions: {
        create: questions.map((q: any, index: number) => ({
          id: q.id,
          questionTitle: q.questionTitle,
          type: q.type.toUpperCase(),
          position: index,
          options: {
            create: q.options.map((opt: any) => ({
              text: opt.text,
            })),
          },
        })),
      },
    };

    console.log('templateData: ', templateData); // Для отладки

    let savedTemplate;
    if (formId) {
      savedTemplate = await db.template.update({
        where: { id: formId },
        data: templateData,
      });
      console.log('Ответ с сервера with ID:', savedTemplate);
    } else {
      savedTemplate = await db.template.create({
        data: templateData,
      });
      console.log('Ответ с сервера no ID:', savedTemplate);
    }

    return NextResponse.json({ success: true, template: savedTemplate });
  } catch (error) {
    console.error('Error saving template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save template', details: error },
      { status: 500 }
    );
  }
}
