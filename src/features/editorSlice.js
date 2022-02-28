import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
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
  selectedType: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addImage(state, action) {
      const { content, id, width, height } = action.payload;

      console.log(width, height);

      const imageData = {
        type: 'image',
        content,
        id,
        width,
        height,
      };

      const data = state.elements.concat([imageData]);
      state.elements = data;
    },
    addText(state, action) {
      const style = action.payload;

      const textNode = {
        type: 'text',
        text: 'Click to edit',
        x: 80,
        y: 80,
        width: 150,
        fontSize: 25,
        fontFamily: 'Sans serif',
        fill: 'black',
        id: `text${state.elements.length + 1}`,
        ...style,
      };
      const data = state.elements.concat([textNode]);
      state.elements = data;
      const shs = state.shapes.concat([`text${state.elements.length + 1}`]);
      state.shapes = shs;
    },
    moveToTop(state) {
      const items = state.elements.slice();
      const item = items.find((s) => s.id === state.selectedId);
      const index = items.indexOf(item);
      items.splice(index, 1);
      items.splice(index + 1, 0, item);
      state.elements = items;
    },

    moveToBottom(state) {
      const items = state.elements.slice();
      const item = items.find((s) => s.id === state.selectedId);
      const index = items.indexOf(item);
      items.splice(index, 1);
      items.splice(index - 1, 0, item);
      state.elements = items;
    },

    setSelectedItem(state, action) {
      const item = action.payload;
      state.selectedId = item.id;
      state.textColor = item.fill;
      state.fontSize = item.fontSize;
      state.textValue = item.text;
      state.fontFamily = item.fontFamily;
      state.selectedType = item.type;
    },

    setItemChange(state, action) {
      const newAttrs = action.payload.newAttrs;
      const i = action.payload.i;
      const items = state.elements.slice();
      items[i] = newAttrs;
      state.elements = items;
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
      state.elements = action.payload;
    },
    removeItem(state) {
      const items = state.elements;
      const item = items.find((item) => item.id === state.selectedId);
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

      if (storedState) {
        state.elements = storedState.elements;
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
      if (state.elements.length >= 1 || state.frameUrl) {
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
  addImage,
} = editorSlice.actions;
export default editorSlice.reducer;
