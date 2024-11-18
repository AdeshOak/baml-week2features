import React, { useEffect, useState } from 'react';
import './ThebeNotebook.css';

const ThebeNotebook = () => {
  const [notebookContent, setNotebookContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      try {
        // Step 1: Fetch XSRF token
        const loginPageResponse = await fetch('https://thebeimg-354944226045.us-south1.run.app/login', {
          method: 'GET',
          credentials: 'same-origin', // Ensure cookies are sent
        });

        // Log cookies for debugging
        logCookies();

        const xsrfToken = getXSRFTokenFromCookies(document.cookie);
        console.log('XSRF Token:', xsrfToken); // Log to check the token

        if (!xsrfToken) {
          throw new Error('XSRF token not found');
        }

        // Step 2: Send POST request to login
        const loginResponse = await fetch('https://thebeimg-354944226045.us-south1.run.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `password=jserver24&_xsrf=${xsrfToken}`,
          credentials: 'same-origin', // Ensure cookies are sent
        });

        if (loginResponse.ok) {
          console.log('Login successful');
          setIsLoggedIn(true);
        } else {
          console.error('Login failed');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    const fetchNotebook = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/AdeshOak/thebetest/main/test.ipynb'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch notebook');
        }
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
        setTimeout(bootstrapThebe, 1000); // Retry after 1 second if Thebe isn't loaded
      }
    };

    if (isLoggedIn) {
      // Initialize Thebe only after successful login
      if (!window.thebelab) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/thebelab@latest/lib/index.js';
        script.onload = bootstrapThebe;
        document.body.appendChild(script);
      } else {
        bootstrapThebe();
      }

      fetchNotebook(); // Fetch the notebook after login
    } else {
      login(); // Trigger login flow when the component mounts
    }
  }, [isLoggedIn]);

  // Utility function to extract XSRF token from cookies
  function getXSRFTokenFromCookies(cookieString) {
    const cookies = cookieString.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === '_xsrf') {
        return value;
      }
    }
    return null; // If no token found, return null
  }

  // Log cookies for debugging
  function logCookies() {
    console.log('Cookies:', document.cookie);
  }

  return (
    <div className="thebe-notebook">
      <h1>Interactive Jupyter Notebook</h1>

      {/* Colab badge link */}
      <div>
        <a href="https://colab.research.google.com/gist/AdeshOak/48804e276d03cc156c40deb217a4e185/baml_test.ipynb" target="_blank" rel="noopener noreferrer">
          <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" />
        </a>
      </div>

      {/* Thebe configuration script */}
      <script type="text/x-thebe-config">
        {JSON.stringify({
          requestKernel: true,
          codeMirrorConfig: {
            theme: 'abcdef',
          },
          serverOptions: {
            baseUrl: 'https://thebeimg-354944226045.us-south1.run.app/', // Cloud Run URL
            token: 'jserver24', // Password for Jupyter server
          },
        })}
      </script>

      {/* Display notebook cells */}
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
