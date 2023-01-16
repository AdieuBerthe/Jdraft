# Jdraft

Jdraft is an online JS and markdown editor.


The app allows you to write some JS or JSX code and document it in a text editor. You can add more text or code cells and move them around as you please.
The list of cells and its content are automatically saved in JSON to a .js file (default is notebook.js).

## Available Scripts

### `npx jdraft serve [filename.js][--port <number>]`

Runs the app on port 4005 by default, it can be changed with the `--port option`.

Open [http://localhost:4005](http://localhost:4005) to view it in the browser and start coding.

The command will create the 'filename.js' specified if it doesn't exist, notebook.js will be used if none is provided.

