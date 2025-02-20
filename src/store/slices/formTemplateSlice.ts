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
  position: number;
  templateId: string;
}

interface Tag {
  id: string;
  name: string;
}

interface FormTemplateState {
  formId?: string;
  formTitle: string;
  formDescription: string;
  questions: Question[];
  accessType: 'PUBLIC' | 'RESTRICTED';
  allowedUsers: string[];
  tags: Tag[];
}

interface FormTemplateSliceState {
  formTemplate: FormTemplateState;
  activeQuestionId: string | null;
  loading: boolean;
}

const initialState: FormTemplateSliceState = {
  formTemplate: {
    // formId: '',
    formTitle: '',
    formDescription: '',
    questions: [],
    accessType: 'PUBLIC',
    allowedUsers: [],
    tags: [],
  },
  activeQuestionId: null,
  loading: false,
};

const formTemplateSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormTemplateId: (state, action: PayloadAction<string>) => {
      state.formTemplate.formId = action.payload;
    },
    setFormTemplateTitle: (state, action: PayloadAction<string>) => {
      state.formTemplate.formTitle = action.payload;
    },
    setFormTemplateDescription: (state, action: PayloadAction<string>) => {
      state.formTemplate.formDescription = action.payload;
    },
    setAccessType: (state, action: PayloadAction<'PUBLIC' | 'RESTRICTED'>) => {
      state.formTemplate.accessType = action.payload;
      if (action.payload === 'PUBLIC') {
        state.formTemplate.allowedUsers = [];
      }
    },
    setAllowedUsers: (state, action: PayloadAction<string[]>) => {
      state.formTemplate.allowedUsers = action.payload;
    },
    addQuestion: (state) => {
      const newQuestion: Question = {
        id: uuidv4(),
        questionTitle: '',
        type: '',
        options: [],
        imageUrl: null,
        isRequired: false,
        position: 0,
        templateId: '',
      };
      state.formTemplate.questions.push(newQuestion);
      state.activeQuestionId = newQuestion.id;
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.formTemplate.questions = state.formTemplate.questions.filter(
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
      const question = state.formTemplate.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.questionTitle = action.payload.text;
    },
    updateQuestionType: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const question = state.formTemplate.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.type = action.payload.type;
    },
    updateQuestionOptions: (
      state,
      action: PayloadAction<{ id: string; options: Option[] }>
    ) => {
      const question = state.formTemplate.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.options = action.payload.options;
    },
    updateQuestionImage: (
      state,
      action: PayloadAction<{ id: string; imageUrl: string }>
    ) => {
      const question = state.formTemplate.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) question.imageUrl = action.payload.imageUrl;
    },
    removeQuestionImage: (state, action: PayloadAction<{ id: string }>) => {
      const question = state.formTemplate.questions.find(
        (q) => q.id === action.payload.id
      );
      if (question) {
        question.imageUrl = null;
      }
    },
    toggleQuestionRequired: (state, action: PayloadAction<{ id: string }>) => {
      const question = state.formTemplate.questions.find(
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
      state.formTemplate.questions = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.formTemplate.tags.push(action.payload);
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.formTemplate.tags = state.formTemplate.tags.filter(
        (tag) => tag.id !== action.payload
      );
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.formTemplate.tags = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFormTemplateId,
  setFormTemplateTitle,
  setFormTemplateDescription,
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
} = formTemplateSlice.actions;

export default formTemplateSlice.reducer;
