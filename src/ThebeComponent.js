import React, { useEffect } from 'react';

export const Thebe = () => {

    
  useEffect(() => {
    const bootstrapThebe = () => {
      if (window.thebelab) {
        console.log('Thebe.js loaded, bootstrapping...');
        window.thebelab.bootstrap();
      } else {
        console.error('Thebe.js not loaded.');
      }
    };
    // Function to fetch and render the Gist content
    const fetchGist = async () => {
      const gistId = '48804e276d03cc156c40deb217a4e185';
      try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        const data = await response.json();
        const files = data.files;
        
        // Assuming you want the first file's content
        const fileContent = files[Object.keys(files)[0]].content;
        setGistContent(fileContent);
      } catch (error) {
        console.error('Failed to fetch Gist content:', error);
      }

      fetchGist();
    // Load Thebe.js script dynamically if not already loaded
    if (!window.thebelab) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/thebelab@latest/lib/index.js';
      script.onload = bootstrapThebe;
      script.onerror = () => {
        console.error('Failed to load Thebe.js script.');
      };
      document.body.appendChild(script);
    } else {
      bootstrapThebe();
    }

    

   

  return (
    <div>
      <h1>Google Colab Notebook Link</h1>
      
      {/* Display the Gist content */}
      <pre>
        <code>{gistContent}</code>
      </pre>

      <h1>Interactive Code Example with Thebe</h1>

      {/* Configuration block for Thebe */}
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

      {/* Executable code blocks */}
      <pre data-executable="true" data-language="python">
        {`
        print("Hello, Thebe in React!")
        `}
      </pre>

      <pre data-executable="true" data-language="python">
        {`
import numpy as np
import matplotlib.pyplot as plt

data = np.random.randn(100)
plt.hist(data, bins=30)
plt.title("Histogram of Random Data")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()
        `}
      </pre>
    </div>
  );
};


