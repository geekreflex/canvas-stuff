import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  texts: [],
  shapes: [],
  selectedId: null,
  fontsModal: false,
  previewModal: false,
  textValue: null,
  textColor: null,
  fontSize: null,
  fontFamily: null,
  previewImage: null,
  frameUrl: null,
  loadingFrame: false,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addText(state, action) {
      const style = action.payload;

      const textNode = {
        text: 'Click to edit',
        x: 20,
        y: 20,
        width: 150,
        verticalAlign: 'middle',
        fontSize: 25,
        fontFamily: 'Sans serif',
        fill: 'black',
        id: `text${state.texts.length + 1}`,
        ...style,
      };
      const items = state.texts.concat([textNode]);
      state.texts = items;
      const shs = state.shapes.concat([`text${state.texts.length + 1}`]);
      state.shapes = shs;
    },
    moveToTop(state) {
      const items = state.texts.slice();
      const item = items.find((s) => s.id === state.selectedId);
      const index = items.indexOf(item);
      items.splice(index, 1);
      items.splice(index + 1, 0, item);
      state.texts = items;
    },

    moveToBottom(state) {
      const items = state.texts.slice();
      const item = items.find((s) => s.id === state.selectedId);
      const index = items.indexOf(item);
      items.splice(index, 1);
      items.splice(index - 1, 0, item);
      state.texts = items;
    },

    setSelectedItem(state, action) {
      const item = action.payload;
      state.selectedId = item.id;
      state.textColor = item.fill;
      state.fontSize = item.fontSize;
      state.textValue = item.text;
      state.fontFamily = item.fontFamily;
    },

    setItemChange(state, action) {
      const newAttrs = action.payload.newAttrs;
      const i = action.payload.i;
      const txts = state.texts.slice();
      txts[i] = newAttrs;
      state.texts = txts;
    },

    deSelectItem(state) {
      state.selectedId = null;
    },
    toggleFontsModal(state, action) {
      state.fontsModal = action.payload;
    },
    togglePreviewModal(state, action) {
      state.previewModal = action.payload;
    },
    setTextValue(state, action) {
      state.textValue = action.payload;
    },
    setTextColor(state, action) {
      state.textColor = action.payload;
    },
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
    updateItemData(state, action) {
      state.texts = action.payload;
    },
    removeItem(state) {
      const items = state.texts;
      const item = items.find((s) => s.id === state.selectedId);
      const index = items.indexOf(item);
      items.splice(index, 1);
      state.texts = items;
      state.selectedId = null;
    },
    setPreviewImage(state, action) {
      state.previewImage = action.payload;
    },
    getSavedFromStorage(state) {
      const storedState = localStorage.getItem('editor-state')
        ? JSON.parse(localStorage.getItem('editor-state'))
        : null;

      console.log(storedState);
      if (storedState) {
        state.texts = storedState.texts;
        state.shapes = storedState.shapes;
        state.frameUrl = storedState.frameUrl;
      } else {
        state = initialState;
      }
    },
    clearSavedFromStorage() {
      localStorage.removeItem('editor-state');
    },
    saveChangesToStorage(state) {
      const allState = state;
      if (state.texts.length >= 1) {
        localStorage.setItem('editor-state', JSON.stringify(allState));
      }
    },
    setBGFrame(state, action) {
      state.frameUrl = action.payload;
    },
    setLoadingFrame(state, action) {
      state.loadingFrame = action.payload;
    },
  },
});

export const {
  moveToTop,
  moveToBottom,
  addText,
  setSelectedItem,
  setItemChange,
  deSelectItem,
  toggleFontsModal,
  togglePreviewModal,
  setTextValue,
  setTextColor,
  setFontFamily,
  updateItemData,
  removeItem,
  previewImage,
  setPreviewImage,
  saveChangesToStorage,
  getSavedFromStorage,
  setFontSize,
  setBGFrame,
  clearSavedFromStorage,
  setLoadingFrame,
} = editorSlice.actions;
export default editorSlice.reducer;
