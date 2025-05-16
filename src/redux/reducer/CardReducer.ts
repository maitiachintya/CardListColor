import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardItem {
  title: string;
  description: string;
  color: string;
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
  },
});

export const {
  addCardRequest,
  addCardSuccess,
  addCardFailure,
} = cardReducer.actions;

export default cardReducer.reducer;
