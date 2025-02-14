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
}

interface FormState {
  formId: string;
  formTitle: string;
  formDescription: string;
  questions: Question[];
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
    addQuestion: (state) => {
      const newQuestion: Question = {
        id: uuidv4(),
        questionTitle: '',
        type: '',
        options: [],
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
    setActiveQuestion: (state, action: PayloadAction<string | null>) => {
      state.activeQuestionId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFormTitle,
  setFormDescription,
  addQuestion,
  removeQuestion,
  updateQuestionTitle,
  updateQuestionType,
  updateQuestionOptions,
  setActiveQuestion,
  setLoading,
} = formSlice.actions;

export default formSlice.reducer;
