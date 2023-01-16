"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                yield promises_1.default.writeFile(fullPath, '[]', 'utf-8');
                res.send(defaultCellsList);
            }
            else {
                throw err;
            }
        }
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { cells } = req.body;
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send('OK');
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
const defaultCellsList = [{ "content": "# Jdraft\n\nJdraft is a code and Markdown editor, you can click on any cell, *this one included*, to edit its content. You can add more text or code cells by hovering on the divider between cells and at the very bottom, you can also move them around or delete them as you wish.\n\nThe list of cells and its content is automatically saved in JSON to a .js file (default is notebook.js). ", "type": "text", "id": "Yku0lWU4O5FGgmIbT4lH5" }, { "content": "import { useState } from 'react';\r\n\r\nconst Counter = () => {\r\n  const [count, setCount] = useState(0);\r\n  return (\r\n    <div>\r\n      <button onClick={() => setCount(count + 1)}>Click me</button>\r\n      <h2>Count : {count}</h2>\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<Counter />)", "type": "code", "id": "oH8WWpyhfUP9qvWreDQr0" }, { "content": "- You can reference variables from one code cell to another. \n- You can easily display content in the preview frame with he built-in `show()`  function.", "type": "text", "id": "WteAj1HSmRUA6G8rg8S2J" }, { "content": "const App = () => {\r\n  return (\r\n    <div>\r\n    <h3>Your App goes here</h3>\r\n    <hr />\r\n     {/* We can reference our previously declared Counter component here */}\r\n    <Counter />\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<App />)", "type": "code", "id": "10Scu_hCAQCrnlR4HNBXb" }];
