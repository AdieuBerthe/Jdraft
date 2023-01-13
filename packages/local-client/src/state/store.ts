import { configureStore } from '@reduxjs/toolkit';
import cellsReducer, { saveCells } from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import { persistMiddleware } from './middlewares/persist-mw';
import thunk from 'redux-thunk';

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		bundles: bundlesReducer,
	}, middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(persistMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
