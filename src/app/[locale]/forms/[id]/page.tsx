import {
  Box,
  Title,
  Text,
  TextInput,
  Radio,
  Checkbox,
  Button,
  Container,
  Stack,
  Group,
  List,
  Badge,
  Divider,
  ListItem,
  RadioGroup,
} from '@mantine/core';
import { getFormTemplate } from '@/lib/getFormTemplate';
import { Asterisk } from 'lucide-react';

const FormPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const template = await getFormTemplate(id);

  if (!template) {
    return <Text c="red">Form not found</Text>;
  }

  return (
    <Box>
      <Title order={2}>{template.formTitle}</Title>
      <Text dangerouslySetInnerHTML={{ __html: template.formDescription }} />

      <Box mt="md" p="md" style={{ border: '1px solid #dedede' }}>
        <Text size="sm" c="gray">
          Author: {template.author?.name || 'Unknown'}
        </Text>

        {template.allowedUsers.length > 0 && (
          <>
            <Text mt="xs" c="gray" size="xs">
              Allowed users:
            </Text>
            <List withPadding c="gray" size="xs">
              {template.allowedUsers.map((user: any) => (
                <ListItem key={user}>{user}</ListItem>
              ))}
            </List>
          </>
        )}

        {template.templateTags.length > 0 && (
          <Group>
            <Text c="gray" size="xs" mt="xs">
              Tags:
            </Text>
            <Group>
              {template.templateTags.map((tag: any) => (
                <Badge key={tag} variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Group>
        )}

        <Text c="gray" size="xs" mt="xs">
          Created at:
          {new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(new Date(template.createdAt))}
        </Text>
      </Box>

      <Container size="sm" mt="lg">
        <form>
          {template.questions.map((question: any) => (
            <Box
              key={question.id}
              mb="md"
              p="md"
              style={{ border: '1px solid #dedede', borderRadius: '10px' }}
            >
              <Group gap={0} align="top" mb="md">
                <Text fw={500}>{question.questionTitle}</Text>
                {question.isRequired && (
                  <Asterisk strokeWidth={3} size={16} color="#e64980" />
                )}
              </Group>

              {question.type === 'text' && (
                <TextInput
                  required={question.isRequired}
                  placeholder="Your answer"
                  mb="md"
                />
              )}

              {question.type === 'radio' && question.options.length > 0 && (
                <Stack gap="sm">
                  {question.options.map((option: any) => (
                    <Group key={option.id}>
                      <Radio value={option.value} label={option.value} />
                      <Text>{option.text}</Text>
                    </Group>
                  ))}
                </Stack>
              )}

              {question.type === 'checkbox' && question.options.length > 0 && (
                <Stack gap="sm">
                  {question.options.map((option: any) => (
                    <Group key={option.id}>
                      <Checkbox value={option.value} label={option.value} />
                      <Text>{option.text}</Text>
                    </Group>
                  ))}
                </Stack>
              )}

              {question.imageUrl && (
                <img
                  src={question.imageUrl}
                  alt="question image"
                  width="100%"
                />
              )}
            </Box>
          ))}

          <Button type="submit" mt="lg">
            Submit form
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default FormPage;
