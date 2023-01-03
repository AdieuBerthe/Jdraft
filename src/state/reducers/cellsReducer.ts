import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, CellTypes, Direction } from '../cell';


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

      deleteCell: (state, action: PayloadAction<string>) => {
        delete state.data[action.payload];
  
        state.order = state.order.filter((id) => id !== action.payload);
      },
      
      moveCell: (state, action: PayloadAction<MoveCellAction>) => {
        const { direction } = action.payload;
  
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
  
        if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
  
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      },
      insertCellAfter: (state, action: PayloadAction<InsertCellAction>) => {
        const newCell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };
  
        state.data[newCell.id] = newCell;
  
        const index = state.order.findIndex((id) => id === action.payload.id);
  
        if (index < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(index + 1, 0, newCell.id);
        }
      },
    },
  });
  
  export const { moveCell, deleteCell, insertCellAfter, updateCell } =
    cellsSlice.actions;
  
  export default cellsSlice.reducer;
  
  const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
  };

  interface MoveCellAction {
    id: string;
    direction: Direction;
  }
  
  interface InsertCellAction {
    id: string | null;
    type: CellTypes;
  }
  
  interface UpdateCellAction {
    id: string;
    content: string;
  }
  

  