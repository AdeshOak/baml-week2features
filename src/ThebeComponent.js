import React, { useEffect } from 'react';

export const Thebe = () => {
  useEffect(() => {
    const bootstrapThebe = () => {
      // Check if Thebe is already initialized
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
      script.src = 'https://unpkg.com/thebelab@latest/lib/index.js'; // Load from CDN
      script.onload = bootstrapThebe;
      script.onerror = () => {
        console.error('Failed to load Thebe.js script.');
      };
      document.body.appendChild(script);
    } else {
      bootstrapThebe(); // Bootstrap Thebe if script is already loaded
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      <h1>Interactive Code Example with Thebe</h1>

      {/* Configuration block for Thebe */}
      <script type="text/x-thebe-config">
        {JSON.stringify({
          requestKernel: true,
          binderOptions: {
            repo: "AdeshOak/thebetest",
            ref: "main",  // or "master", depending on your default branch
          },
          codeMirrorConfig: {
            theme: 'abcdef', // Optional: customize CodeMirror theme
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



