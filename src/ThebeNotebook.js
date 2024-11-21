import React, { useEffect, useState } from 'react';
import './ThebeNotebook.css';

const ThebeNotebook = () => {
  const [notebookContent, setNotebookContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      try {
        const loginPageResponse = await fetch('https://thebeimg2-354944226045.us-south1.run.app/login', {
          method: 'GET',
          credentials: 'include',
        });
        const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('_xsrf=')).split('=')[1];
        if (!xsrfToken) throw new Error('XSRF token not found');

        const loginResponse = await fetch('https://thebeimg2-354944226045.us-south1.run.app/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `password=jserver24&_xsrf=${xsrfToken}`,
          credentials: 'include',
        });

        if (loginResponse.ok) setIsLoggedIn(true);
        else console.error('Login failed');
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    const fetchNotebook = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/AdeshOak/thebetest/main/test.ipynb');
        if (!response.ok) throw new Error('Failed to fetch notebook');
        setNotebookContent(await response.json());
      } catch (error) {
        console.error('Error fetching notebook:', error);
      }
    };

    const bootstrapThebe = () => {
      if (window.thebelab) window.thebelab.bootstrap();
      else setTimeout(bootstrapThebe, 1000);
    };

    if (isLoggedIn) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/thebelab@latest/lib/index.js';
      script.onload = bootstrapThebe;
      document.body.appendChild(script);
      fetchNotebook();
    } else login();
  }, [isLoggedIn]);

  return (
    <div className="thebe-notebook">
      <h1>Interactive Jupyter Notebook</h1>
      <script type="text/x-thebe-config">
        {JSON.stringify({
          requestKernel: true,
          serverOptions: { baseUrl: 'https://thebeimg2-354944226045.us-south1.run.app/' },
        })}
      </script>
      {notebookContent ? (
        <div className="notebook-container">
          {notebookContent.cells.map((cell, index) => (
            <div key={index} className="cell-container">
              {cell.cell_type === 'code' ? (
                <pre data-executable="true" data-language="python">
                  {cell.source.join('')}
                </pre>
              ) : (
                <div className="markdown-cell">
                  <pre>{cell.source.join('')}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading notebook content...</p>
      )}
    </div>
  );
};

export default ThebeNotebook;
