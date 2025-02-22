import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('body', body);
    console.log('Questions:', body.questions);

    if (!body.formTitle || !body.authorId) {
      return NextResponse.json(
        { error: 'Form title and author ID are required' },
        { status: 400 }
      );
    }

    if (
      !body.questions.length ||
      body.questions.every((q: any) => !q.questionTitle.trim())
    ) {
      return NextResponse.json(
        { error: 'At least one question must be filled in' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { clerkId: body.authorId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    // console.log('user in db: ', user);

    const existingTemplate = await db.formTemplate.findFirst({
      where: {
        formTitle: body.formTitle,
        author: {
          clerkId: body.authorId,
        },
      },
    });

    if (existingTemplate) {
      return NextResponse.json(
        { error: 'A form with this title already exists' },
        { status: 400 }
      );
    }

    const formTemplate = await db.formTemplate.create({
      data: {
        formTitle: body.formTitle,
        formDescription: body.formDescription,
        authorClerkId: body.authorId,
        accessType: body.accessType,
        allowedUsers: body.allowedUsers,
        templateTags: body.templateTags,
      },
    });

    await Promise.all(
      body.questions.map((q: any, index: number) => {
        return db.question.create({
          data: {
            id: q.id,
            questionTitle: q.questionTitle,
            type: q.type,
            imageUrl: q.imageUrl,
            isRequired: q.isRequired,
            position: index,
            formTemplateId: formTemplate.id,
            options: {
              create: q.options.map((option: any) => ({
                id: option.id,
                text: option.text,
              })),
            },
          },
        });
      })
    );

    return NextResponse.json({
      formTemplate,
    });
  } catch (error) {
    console.log('error', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
  }
}
