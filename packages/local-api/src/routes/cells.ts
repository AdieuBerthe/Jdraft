import express from "express";
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code'
}



export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get('/cells',async (req, res) => {
        try {
            const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
            res.send(JSON.parse(result));
        } catch (err: any){
            if (err.code === 'ENOENT') {
                await fs.writeFile(fullPath, '[]', 'utf-8');
                res.send(defaultCellsList);
            } else {
                throw err;
            }
        }
    });

    router.post('/cells',async (req, res) => {
        const { cells }: { cells: Cell[]} = req.body;

        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

        res.send('OK');
    });

    return router;
}

const defaultCellsList = [{"content":"# Jdraft\n\nJdraft is a code and Markdown editor, you can click on any cell, *this one included*, to edit its content. You can add more text or code cells by hovering on the divider between cells and at the very bottom, you can also move them around or delete them as you wish.\n\nThe list of cells and its content is automatically saved in JSON to a .js file (default is notebook.js). ","type":"text","id":"Yku0lWU4O5FGgmIbT4lH5"},{"content":"import { useState } from 'react';\r\n\r\nconst Counter = () => {\r\n  const [count, setCount] = useState(0);\r\n  return (\r\n    <div>\r\n      <button onClick={() => setCount(count + 1)}>Click me</button>\r\n      <h2>Count : {count}</h2>\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<Counter />)","type":"code","id":"oH8WWpyhfUP9qvWreDQr0"},{"content":"- You can reference variables from one code cell to another. \n- You can easily display content in the preview frame with he built-in `show()`  function.","type":"text","id":"WteAj1HSmRUA6G8rg8S2J"},{"content":"const App = () => {\r\n  return (\r\n    <div>\r\n    <h3>Your App goes here</h3>\r\n    <hr />\r\n     {/* We can reference our previously declared Counter component here */}\r\n    <Counter />\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<App />)","type":"code","id":"10Scu_hCAQCrnlR4HNBXb"}]