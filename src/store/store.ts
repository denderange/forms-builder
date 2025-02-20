import { configureStore } from '@reduxjs/toolkit';
import formTemplateReducer from './slices/formTemplateSlice';

export const store = configureStore({
  reducer: {
    formTemplate: formTemplateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
