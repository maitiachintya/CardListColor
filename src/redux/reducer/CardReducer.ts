import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CardItem {
  title: string;
  description: string;
  color: string;
  index?: number;
}

interface CardState {
  cards: CardItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  loading: false,
  error: null,
};

const cardReducer = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCardRequest(state, action: PayloadAction<CardItem>) {
      state.loading = true;
      state.error = null;
    },
    addCardSuccess(state, action: PayloadAction<CardItem>) {
      state.cards.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addCardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCardRequest(state, action: PayloadAction<CardItem>) {
      state.loading = true;
      state.error = null;
    },
    updateCardSuccess(state, action: PayloadAction<CardItem>) {
      const {index, title, description, color} = action.payload;
      if (index !== undefined) {
        state.cards[index] = {title, description, color};
        state.error = null;
        state.loading = false;
      }
    },
    updateCardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCard(state, action: PayloadAction<number>) {
      state.cards.splice(action.payload, 1);
    },
  },
});

export const {
  addCardRequest,
  addCardSuccess,
  addCardFailure,
  updateCardRequest,
  updateCardSuccess,
  updateCardFailure,
  deleteCard,
} = cardReducer.actions;

export default cardReducer.reducer;
