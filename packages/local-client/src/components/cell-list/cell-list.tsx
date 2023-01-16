import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from '../cell-list-item/cell-list-item';
import AddCell from '../add-cell/add-cell';
import { useDispatch } from 'react-redux';
import { fetchCells } from '../../state/cellsReducer';

const CellList: React.FC = () => {
  const dispatch = useDispatch();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    dispatch(fetchCells());
    // eslint-disable-next-line
  }, [])

  const renderedCells = cells.map((cell) => (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} />
      </Fragment>
    ));
    
    return(
        <div className='cell-list'>
          <AddCell forceVisible={cells.length === 0} previousCellId={null} />
          {renderedCells}
        </div>
    )
};

export default CellList;