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
    updateCard(state, action: PayloadAction<CardItem>) {
      const idx = action.payload.index;
      if (idx === undefined || idx < 0 || idx >= state.cards.length) {
        state.error = `Invalid card index ${idx}`;
        return;
      }
      state.cards[idx] = {
        title: action.payload.title,
        description: action.payload.description,
        color: action.payload.color,
      };
      state.error = null;
    },
    deleteCard(state, action: PayloadAction<number>) {
      state.cards.splice(action.payload, 1);
    },
  },
});

export const {addCardRequest, addCardSuccess, addCardFailure, updateCard, deleteCard} =
  cardReducer.actions;

export default cardReducer.reducer;
