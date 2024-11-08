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
  }, []);

  return (
    <div>
      <h1>Google Colab Notebook Link</h1>
      
      {/* Colab badge link */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<a href="https://colab.research.google.com/gist/AdeshOak/48804e276d03cc156c40deb217a4e185/baml_test.ipynb" target="_blank">
                     <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
                   </a>`,
        }}
      />

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
