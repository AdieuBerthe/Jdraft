import './code-cell.css'
import { useEffect } from "react";
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from "./resizable";
import { Cell } from "../state/cell";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from '../hooks/use-typed-selector';
import { createBundle } from "../state/bundlesReducer";
import { useDispatch } from "react-redux";



interface codeCellProps {
  cell: Cell,
}

const CodeCell: React.FC<codeCellProps> = ({ cell }) => {
  
 
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const { updateCell } = useActions();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle({cellId: cell.id, input: cell.content}));
      return
    }
    const timer = setTimeout(async () => {
      dispatch(createBundle({cellId: cell.id, input: cell.content}));
     }, 1000);

    return () => {
        clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id]);


  return (
    <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
            <Resizable direction="horizontal">
                <CodeEditor
                    initialValue={cell.content}
                    onEditorChange={(value) => updateCell({id: cell.id, content: value})}
                />
            </Resizable>
            <div className='progress-wrapper'>
            {
              !bundle || bundle.loading
              ? <div className="progress-cover">
                  <progress className="progress is-small is-primary" max='100'>
                    Loading
                  </progress>
                </div>
              : <Preview code={bundle.code} potentialError={bundle.err} />
            }
            </div>
        </div>
    </Resizable>
  );
};

export default CodeCell;