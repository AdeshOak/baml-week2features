import React, { useEffect } from 'react';


export const Thebe = () => {
  useEffect(() => {
    if (window.thebelab) {
      window.thebelab.bootstrap();
    }
  }, []);

  return (
    <div>
      <h2>Live Code with Thebe</h2>
      <pre data-executable="true" data-language="python">
        print("Hello, Thebe!")
      </pre>
    </div>
  );
};



