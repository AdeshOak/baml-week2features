import React, { useEffect } from 'react';

export const Thebe = () => {
  useEffect(() => {
    if (window.thebelab) {
      window.thebelab.bootstrap();
    }
  }, []);

  return (
    <div>
      <div>
        <h2>Work in Progress...</h2>
        <p>I am still working on this part. I have added a jupyter notebook cell below but I haven't integrated the <b>Binder</b> kernel and the <br/>
        backend required to run it. There's two images under that which show how the final product will look like. Please have a look and suggest me any possible designs!</p>
      </div>
      <h4>Live Code with Thebe</h4>
      <pre data-executable="true" data-language="python">
        print("Hello, Thebe!")
      </pre>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="../assets/code.jpeg" alt="Image 1" style={{ width: '600px', height: 'auto' }} />
          <p>CODE</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="../assets/output.jpeg" alt="Image 2" style={{ width: '600px', height: 'auto'  }} />
          <p>OUTPUT</p>
        </div>
      </div>
    </div>
  );
};

