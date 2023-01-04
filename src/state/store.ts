import { configureStore } from '@reduxjs/toolkit';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import { ActionType } from './action-types';
import { insertCellAfter } from './cellsReducer';


export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		bundles: bundlesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(insertCellAfter({id: null, type: 'code'}));

store.dispatch(insertCellAfter({id: null, type: 'text'}));

store.dispatch(insertCellAfter({id: null, type: 'code'}));

store.dispatch(insertCellAfter({id: null, type: 'text'}));