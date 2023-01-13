import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Cell } from './cell';
import {
  UpdateCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  SaveCellsErrorAction,
  DeleteCellAction,
  ActionType
} from "./action-types";
import axios from 'axios';
import { RootState } from './store';


interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
      [key: string]: Cell;
    };
  }


  const initialState = {
    loading: false,
    error: null,
    order: [],
    data: {},
  } as CellsState;
  
  const cellsSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {
      updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
        const { id, content } = action.payload;
        state.data[id].content = content;        
      },

      deleteCell: (state, action: PayloadAction<DeleteCellAction>) => {
        delete state.data[action.payload.id];
  
        state.order = state.order.filter((id) => id !== action.payload.id);
      },
      
      moveCell: (state, action: PayloadAction<MoveCellAction>) => {
        const { direction } = action.payload;
  
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
  
        if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
  
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      },
      insertCellAfter: (state, action: PayloadAction<InsertCellAfterAction>) => {
        const newCell: Cell = {
          content: '',
          type: action.payload.cellType,
          id: nanoid(),
        };
  
        state.data[newCell.id] = newCell;
  
        const index = state.order.findIndex((id) => id === action.payload.id);
  
        if (index < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(index + 1, 0, newCell.id);
        }
      },
      loadCells: (state, action: PayloadAction<FetchCellsAction>) => {
        state.loading = true;
        state.error = null;
      },
      fetchCellsComplete: (state, action: PayloadAction<FetchCellsCompleteAction>) => {
        state.order = action.payload.data.map(cell => cell.id);
        state.data = action.payload.data.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
      },
      fetchCellsError: (state, action: PayloadAction<FetchCellsErrorAction>) => {
        state.loading = false;
        state.error = action.payload.data;
      },
      saveCellsError: (state, action: PayloadAction<SaveCellsErrorAction>) => {
        state.error = action.payload.payload;
      },
    },
  });

  export const fetchCells: any = createAsyncThunk(
    'cells/fetchCells',
    async (_, {dispatch}) => {
  
        dispatch(loadCells({type: ActionType.FETCH_CELLS}));

        try {
          const { data }: { data: Cell[]} = await axios.get('/cells');
          dispatch(fetchCellsComplete({type: ActionType.FETCH_CELLS_COMPLETE, data}));
        } catch (err: any) {
          dispatch(fetchCellsError({type: ActionType.FETCH_CELLS_ERROR, data: err.message}));
        }
      }
   )

   export const saveCells: any = createAsyncThunk<void, void, { state: RootState }>(
    'cells/saveCells',
    async (_, {dispatch, getState}) => {
      const { cells: {data, order} } = getState();
      const cells = order.map(id => data[id]);
      try {
        await axios.post('/cells', { cells });
        console.log('saved');
      } catch (err: any) {
        dispatch(saveCellsError({type: ActionType.SAVE_CELLS_ERROR,payload: err.message}))
      }
    }
   )
  
  export const { moveCell, deleteCell, insertCellAfter, updateCell, loadCells, fetchCellsComplete, fetchCellsError, saveCellsError } =
    cellsSlice.actions;

  export const cellsActions = cellsSlice.actions;
  
  export default cellsSlice.reducer;
