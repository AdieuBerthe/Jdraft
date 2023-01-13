import { CellTypes, Cell } from "./cell";

export enum ActionType {
  MOVE_CELL = 'move_cell',
  DELETE_CELL = 'delete_cell',
  INSERT_CELL_AFTER = 'insert_cell_after',
  UPDATE_CELL = 'update_cell',
  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',
  FETCH_CELLS = 'fetch_cells',
  FETCH_CELLS_COMPLETE = 'fetch_cells_complete',
  FETCH_CELLS_ERROR = 'fetch_cells_error',
  SAVE_CELLS_ERROR = 'save_cells_error',
}

export type Direction = 'up' | 'down';

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    id: string;
    direction: Direction;
  
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  id: string;
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    id: string | null;
    cellType: CellTypes;
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
    id: string;
    content: string;
}

export interface BundleStartAction {
    cellId: string;
}

export interface BundleCompleteAction {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE;
  data: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  data: string;
}

export interface SaveCellsErrorAction {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: string
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction

  export type BundleAction =
  | BundleStartAction
  | BundleCompleteAction;
