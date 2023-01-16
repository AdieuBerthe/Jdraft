import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { saveCells } from "../cellsReducer";
import  { moveCell, updateCell, deleteCell, insertCellAfter } from "../cellsReducer";
   
let timer: NodeJS.Timeout;

export const persistMiddleware = createListenerMiddleware();

persistMiddleware.startListening({
    matcher: isAnyOf(moveCell,updateCell, deleteCell, insertCellAfter),
    effect: async (action, listenerApi) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            listenerApi.dispatch(saveCells());
        }, 300)

    }
});


