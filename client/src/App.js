import React, { useState } from 'react';
import SingleFileUpload from './components/SingleFileUpload';

function App() {
  const [mode, setMode] = useState('MULTI');
  return (
    <div className="container col-6 text-center">
      <h1>File Uploading In MERN</h1> 
      <SingleFileUpload />
    </div>
  );
}

export default App;
