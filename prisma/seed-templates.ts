const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const allowedTags = [
  'Education',
  'Courses',
  'Trainings',
  'Test',
  'Exam',
  'HR & Recruiting',
  'Feedback',
  'Research',
  'Surveys',
  'Social Polls',
  'Marketing',
  'Sales',
  'Events & Conferences',
  'Healthcare',
  'Finance',
  'IT & Technology',
  'Customer Service',
  'Psychology',
  'Legal',
  'Ecology',
  'Sports & Health',
];

async function main() {
  const user = await prisma.user.upsert({
    where: { clerkId: 'test-clerk-id' },
    update: {},
    create: {
      clerkId: 'test-clerk-id',
      name: 'Test User',
      email: 'testuser@example.com',
      role: 'ordinary',
    },
  });

  console.log('User created:', user);

  const formTemplatesData = [
    {
      formTitle: 'Employee Feedback Form',
      formDescription: '<p>Provide feedback on your workplace experience.</p>',
      accessType: 'PRIVATE',
      templateTags: ['HR & Recruiting', 'Feedback'],
      theme: 'corporate',
      questions: [
        {
          questionTitle: 'How satisfied are you with your work-life balance?',
          type: 'radio',
          isRequired: true,
          options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
        },
        {
          questionTitle: 'What improvements would you suggest?',
          type: 'text',
          isRequired: false,
        },
      ],
    },
    {
      formTitle: 'Online Course Feedback',
      formDescription: '<p>Help us improve our educational content.</p>',
      accessType: 'PUBLIC',
      templateTags: ['Education', 'Courses', 'Trainings'],
      theme: 'academic',
      questions: [
        {
          questionTitle: 'How would you rate the course content?',
          type: 'radio',
          isRequired: true,
          options: ['Excellent', 'Good', 'Average', 'Poor'],
        },
        {
          questionTitle: 'Would you recommend this course?',
          type: 'radio',
          isRequired: true,
          options: ['Yes', 'No'],
        },
      ],
    },
  ];

  for (const form of formTemplatesData) {
    const createdForm = await prisma.formTemplate.create({
      data: {
        formTitle: form.formTitle,
        formDescription: form.formDescription,
        authorClerkId: user.clerkId,
        accessType: form.accessType,
        allowedUsers: [],
        templateTags: form.templateTags.filter((tag) =>
          allowedTags.includes(tag)
        ),
        theme: form.theme,
        questions: {
          create: form.questions.map((q, index) => ({
            questionTitle: q.questionTitle,
            type: q.type,
            isRequired: q.isRequired,
            position: index,
            options: q.options
              ? { create: q.options.map((option) => ({ text: option })) }
              : undefined,
          })),
        },
      },
    });

    console.log(`Created Form: ${createdForm.formTitle}`);
  }
}

main()
  .catch((e) => {
    console.error('Error seeding forms:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
