import {put, takeLatest} from 'redux-saga/effects';
import {
  addCardFailure,
  addCardSuccess,
  updateCardSuccess,
  updateCardFailure,
} from '../reducer/CardReducer';

// Handle Add Card
function* handleAddCard(action: any) {
  try {
    if (action?.payload?.title !== '' && action?.payload?.description !== '') {
      yield put(addCardSuccess(action.payload));
    } else {
      yield put(addCardFailure('Not Valid'));
    }
  } catch (error: any) {
    yield put(addCardFailure(error?.response));
  }
}

// Handle Update Card
function* handleUpdateCard(action: any) {
  console.log('handleUpdateCard -- ');
  
  try {
    if (
      action?.payload?.index !== undefined &&
      action?.payload?.color !== '' &&
      action?.payload?.title !== '' &&
      action?.payload?.description !== ''
    ) {
      yield put(updateCardSuccess(action.payload));
    } else {
      yield put(updateCardFailure('Invalid update data'));
    }
  } catch (error: any) {
    yield put(updateCardFailure(error?.response));
  }
}

// Handle Delete Card
function* handleDeleteCard(action: any) {
  try {
    if (typeof action?.payload?.index === 'number') {
      yield put({type: 'card/deleteCard', payload: action.payload.index});
    } else {
      console.error('Invalid index for delete:', action.payload.index);
    }
  } catch (error) {
    console.error('Delete card error:', error);
  }
}

function* cardSaga() {
  yield takeLatest('card/addCardRequest', handleAddCard);
  yield takeLatest('card/updateCardRequest', handleUpdateCard);
  yield takeLatest('card/deleteCardRequest', handleDeleteCard);
}

export default cardSaga;
