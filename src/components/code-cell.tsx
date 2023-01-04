import { useState, useEffect } from "react";
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from "./resizable";
import { Cell } from "../state/cell";
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';


interface codeCellProps {
  cell: Cell,
}

const CodeCell: React.FC<codeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(async () => {
        const output = await bundle(cell.content);
        setCode(output.code);
        setErr(output.err)
    }, 1000);

    return () => {
        clearTimeout(timer);
    };
  }, [cell.content]);


  return (
    <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
            <Resizable direction="horizontal">
                <CodeEditor
                    initialValue={cell.content}
                    onEditorChange={(value) => updateCell({id: cell.id, content: value})}
                />
            </Resizable>
        <Preview code={code} potentialError={err} />
        </div>
    </Resizable>
  );
};

export default CodeCell;