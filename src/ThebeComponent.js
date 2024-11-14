import React, { useEffect, useState } from 'react';
import './ThebeNotebook.css'; // Use this to add custom Jupyter-like styling

export const ThebeNotebook = () => {
  const [notebookContent, setNotebookContent] = useState(null);

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/AdeshOak/thebetest/main/test.ipynb'
        );
        const notebook = await response.json();
        setNotebookContent(notebook);
      } catch (error) {
        console.error('Error fetching notebook:', error);
      }
    };

    const bootstrapThebe = () => {
      if (window.thebelab) {
        console.log('Thebe.js loaded, bootstrapping...');
        window.thebelab.bootstrap();
      } else {
        console.error('Thebe.js not loaded.');
      }
    };

    if (!window.thebelab) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/thebelab@latest/lib/index.js';
      script.onload = bootstrapThebe;
      document.body.appendChild(script);
    } else {
      bootstrapThebe();
    }

    fetchNotebook();
  }, []);

  return (
    <div className="thebe-notebook">
      <h1>Interactive Jupyter Notebook</h1>

      {/* Colab badge link */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<a href="https://colab.research.google.com/gist/AdeshOak/48804e276d03cc156c40deb217a4e185/baml_test.ipynb" target="_blank">
                     <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
                   </a>`,
        }}
      />

      <script type="text/x-thebe-config">
        {JSON.stringify({
          requestKernel: true,
          binderOptions: {
            repo: "AdeshOak/thebetest",
            ref: "main",
          },
          codeMirrorConfig: {
            theme: 'abcdef',
          },
        })}
      </script>

      {/* Display notebook content if available */}
      {notebookContent ? (
        <div className="notebook-container">
          {notebookContent.cells.map((cell, index) => (
            <pre key={index} data-executable={cell.cell_type === 'code'} data-language="python">
              {cell.source.join('')}
            </pre>
          ))}
        </div>
      ) : (
        <p>Loading notebook content...</p>
      )}
    </div>
  );
};

export default ThebeNotebook;

