import { useMemo } from 'react';
import { useTypedDispatch } from './use-typed-selector';
import { bindActionCreators } from '@reduxjs/toolkit';
import  {cellsActions} from '../state/cellsReducer';

export const useActions = () => {
  const dispatch = useTypedDispatch();

  return useMemo(() => {
     return bindActionCreators(cellsActions, dispatch);
  }, [dispatch]);
};

