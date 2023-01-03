import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { insertCellAfter } from './reducers/cellsReducer';

export const store = configureStore({ 
    reducer: reducers, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActionPaths: ['type']},
      }), 
    preloadedState: {}});

store.dispatch({
    type: insertCellAfter,
    payload:{
        id: null,
        type: 'code'
    }
});

store.dispatch({
    type: insertCellAfter,
    payload:{
        id: null,
        type: 'text'
    }
});

store.dispatch({
    type: insertCellAfter,
    payload:{
        id: null,
        type: 'code'
    }
});

store.dispatch({
    type: insertCellAfter,
    payload:{
        id: null,
        type: 'text'
    }
});