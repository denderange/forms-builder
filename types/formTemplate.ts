export interface FormTemplate {
  formTitle: string;
  formDescription: string;
  author?: { name?: string };
  allowedUsers: string[];
  templateTags: string[];
  createdAt: string;
  questions: {
    id: string;
    questionTitle: string;
    isRequired: boolean;
    type: 'text' | 'radio' | 'checkbox';
    options?: { id: string; value: string; text: string }[];
    imageUrl?: string;
  }[];
}
