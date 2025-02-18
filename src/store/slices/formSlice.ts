import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  questionTitle: string;
  type: string;
  options: Option[];
  imageUrl?: string | null;
  isRequired: boolean;
}

interface Tag {
  id: string;
  name: string;
}

interface FormState {
  formId: string;
  formTitle: string;
  formDescription: string;
  questions: Question[];
  accessType: 'public' | 'restricted';
  allowedUsers: string[];
  tags: Tag[];
}

interface FormSliceState {
  form: FormState;
  activeQuestionId: string | null;
  loading: boolean;
}

const initialState: FormSliceState = {
  form: {
    formId: '',
    formTitle: '',
    formDescription: '',
    questions: [],
    accessType: 'public',
    allowedUsers: [],
    tags: [],
  },
  activeQuestionId: null,
  loading: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormTitle: (state, action: PayloadAction<string>) => {
      state.form.formTitle = action.payload;
    },
    setFormDescription: (state, action: PayloadAction<string>) => {
      state.form.formDescription = action.payload;
    },
    setAccessType: (state, action: PayloadAction<'public' | 'restricted'>) => {
      state.form.accessType = action.payload;
      if (action.payload === 'public') {
        state.form.allowedUsers = [];
      }
    },
    setAllowedUsers: (state, action: PayloadAction<string[]>) => {
      state.form.allowedUsers = action.payload;
    },
    addQuestion: (state) => {
      const newQuestion: Question = {
        id: uuidv4(),
        questionTitle: '',
        type: '',
        options: [],
        imageUrl: null,
        isRequired: false,
      };
      state.form.questions.push(newQuestion);
      state.activeQuestionId = newQuestion.id;
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.form.questions = state.form.questions.filter(
        (q) => q.id !== action.payload
      );
      if (state.activeQuestionId === action.payload) {
        state.activeQuestionId = null;
      }
    },
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.questionTitle = action.payload.text;
    },
    updateQuestionType: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.type = action.payload.type;
    },
    updateQuestionOptions: (
      state,
      action: PayloadAction<{ id: string; options: Option[] }>
    ) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.options = action.payload.options;
    },
    updateQuestionImage: (
      state,
      action: PayloadAction<{ id: string; imageUrl: string }>
    ) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.imageUrl = action.payload.imageUrl;
    },
    removeQuestionImage: (state, action: PayloadAction<{ id: string }>) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) {
        question.imageUrl = null;
      }
    },
    toggleQuestionRequired: (state, action: PayloadAction<{ id: string }>) => {
      const question = state.form.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) {
        question.isRequired = !question.isRequired;
      }
    },
    setActiveQuestion: (state, action: PayloadAction<string | null>) => {
      state.activeQuestionId = action.payload;
    },
    updateQuestionOrder: (state, action: PayloadAction<Question[]>) => {
      state.form.questions = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.form.tags.push(action.payload);
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.form.tags = state.form.tags.filter(
        (tag) => tag.id !== action.payload
      );
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.form.tags = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFormTitle,
  setFormDescription,
  setAccessType,
  setAllowedUsers,
  addQuestion,
  removeQuestion,
  updateQuestionTitle,
  updateQuestionType,
  updateQuestionOptions,
  setActiveQuestion,
  updateQuestionOrder,
  updateQuestionImage,
  removeQuestionImage,
  toggleQuestionRequired,
  addTag,
  removeTag,
  setTags,
  setLoading,
} = formSlice.actions;

export default formSlice.reducer;
