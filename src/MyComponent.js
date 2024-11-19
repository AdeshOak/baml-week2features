import { JupyterNotebook, JupyterCell } from '@datalayer/jupyter-react';

const MyComponent = () => (
  <div>
    <JupyterNotebook notebookUrl="path/to/notebook.ipynb" />
    <JupyterCell code="print('Hello from Jupyter!')" />
  </div>
);

export default MyComponent;