import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cardReducer from '../reducer/CardReducer'; // your card reducer import
import AuthReducer from '../reducer/AuthReducer'; // your card reducer import
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {logger} from 'redux-logger';
import rootSaga from '../redux-saga/CardSaga';
const createSagaMiddleware = require('redux-saga').default;

// Combine reducers (only cardReducer here)
const rootReducer = combineReducers({
  auth: AuthReducer,
  card: cardReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false, // disable thunk if you don't want it
      serializableCheck: false,
    }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store};
