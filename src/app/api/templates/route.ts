import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', JSON.stringify(body, null, 2));

    const {
      title,
      description,
      questions,
      accessType,
      allowedUsers,
      tags,
      authorId,
    } = body;

    // Проверка обязательных данных
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
      title,
      description,
      accessType,
      isPublic: accessType === 'PUBLIC', // ✅ Добавлено
      allowedUsers: allowedUsers || [],
      author: { connect: { id: authorId } },
      tags: {
        connect: tags.map((tag: any) => ({ id: tag.id })), // ✅ Подключаем теги
        create: tags
          .filter((tag: any) => !tag.id) // ✅ Создаём новые
          .map((tag: any) => ({ name: tag.name })),
      },
      questions: {
        create: questions.map((q: any, index: number) => ({
          id: q.id,
          title: q.questionTitle, // ✅ Исправлено
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

    console.log('templateData: ', templateData);

    let savedTemplate;
    if (body.id) {
      // ✅ Теперь обновляется только если есть `id`
      savedTemplate = await db.template.update({
        where: { id: body.id },
        data: templateData,
      });
      console.log('Обновленный шаблон:', savedTemplate);
    } else {
      savedTemplate = await db.template.create({
        data: templateData,
      });
      console.log('Создан новый шаблон:', savedTemplate);
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
