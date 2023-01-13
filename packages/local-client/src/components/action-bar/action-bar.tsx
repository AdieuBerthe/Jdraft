import './action-bar.css';
import { useActions } from '../../hooks/use-actions';
import { ActionType } from '../../state/action-types';

interface ActionBarProps {
    id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const {moveCell, deleteCell} = useActions();

    return (
        <div className="action-bar">
            <button className="button is-primary is-small" onClick={() => moveCell({type: ActionType.MOVE_CELL , id, direction: 'up'})}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={() => moveCell({type: ActionType.MOVE_CELL, id, direction: 'down'})}>
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={() => deleteCell({type: ActionType.DELETE_CELL, id})}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    )
};

export default ActionBar;