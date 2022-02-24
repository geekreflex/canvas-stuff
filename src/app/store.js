import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../features/editorSlice';

export default configureStore({
  reducer: {
    editor: editorReducer,
  },
});
