import {call, delay, put, select, takeLatest} from 'redux-saga/effects';
import { addCardFailure, addCardRequest, addCardSuccess } from '../reducer/CardReducer';

function* handleAddCard(action: any) {
  try {
    // Simulate API or delay
    yield new Promise(resolve => setTimeout(resolve, 500));
    yield put(addCardSuccess(action.payload));
  } catch (error) {
    yield put(addCardFailure('Failed to add card'));
  }
}

export default function* cardSaga() {
  yield takeLatest(addCardRequest.type, handleAddCard);
}
