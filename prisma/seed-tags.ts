const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tags = [
  { name: 'Education' },
  { name: 'Courses' },
  { name: 'Trainings' },
  { name: 'Test' },
  { name: 'Exam' },
  { name: 'HR & Recruiting' },
  { name: 'Feedback' },
  { name: 'Research' },
  { name: 'Surveys' },
  { name: 'Social Polls' },
  { name: 'Marketing' },
  { name: 'Sales' },
  { name: 'Events & Conferences' },
  { name: 'Healthcare' },
  { name: 'Finance' },
  { name: 'IT & Technology' },
  { name: 'Customer Service' },
  { name: 'Psychology' },
  { name: 'Legal' },
  { name: 'Ecology' },
  { name: 'Sports & Health' },
];

async function main() {
  console.log('Start seeding...');

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }

  console.log('Seeded!');
}

main()
  .catch((e) => {
    console.error('Error seeding tags', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
