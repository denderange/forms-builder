import { db } from '@/lib/db';

export type Template = {
  id: string;
  title: string;
  description: string;
  authorId: string;
};

export async function getTemplates(): Promise<Template[]> {
  const templateResponse = await db.template.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return templateResponse.map((template) => ({
    id: template.id,
    title: template.title,
    description: template.description,
    authorId: template.authorId,
  }));
}

export async function getPopularTemplates(): Promise<Template[]> {
  const popularTemplateResponse = await db.template.findMany({
    take: 5,
    orderBy: { forms: { _count: 'desc' } },
  });

  return popularTemplateResponse.map((template) => ({
    id: template.id,
    title: template.title,
    description: template.description,
    authorId: template.authorId,
  }));
}

export async function getTags(): Promise<string[]> {
  const tagResponse = await db.tag.findMany();
  return tagResponse.map((tag) => tag.name);
}
