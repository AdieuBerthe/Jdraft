import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { insertCellBefore } from './reducers/cellsReducer';



export const store = configureStore({ reducer: reducers, preloadedState: {}});

store.dispatch({
    type: insertCellBefore,
    payload:{
        id: null,
        type: 'code'
    }
})

store.dispatch({
    type: insertCellBefore,
    payload:{
        id: null,
        type: 'text'
    }
})

store.dispatch({
    type: insertCellBefore,
    payload:{
        id: null,
        type: 'code'
    }
})

store.dispatch({
    type: insertCellBefore,
    payload:{
        id: null,
        type: 'text'
    }
})