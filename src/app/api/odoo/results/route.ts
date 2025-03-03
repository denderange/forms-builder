import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = await db.user.findUnique({ where: { apiToken: token } });

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const templates = await db.formTemplate.findMany({
    where: { authorClerkId: user.id },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  const aggregatedData = templates.map((template) => ({
    id: template.id,
    name: template.formTitle,
    questions: template.questions.map((question) => {
      const values = question.options.map((option) => option);
      return {
        text: question.questionTitle,
        type: question.type,
        response_count: values.length,
        values,
      };
    }),
  }));

  return NextResponse.json({ templates: aggregatedData });
}
