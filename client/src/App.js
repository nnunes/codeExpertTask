import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import DirTree from './components/DirTree';

import './App.css';

const fetchData = (setData) => {
  fetch("http://localhost:9000/")
    .then(res => res.json())
    .then(res => setData(res));
}

function App() {
  
  const [data, setData] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!data) {
      fetchData(setData);
    }
  }, [data, setData]);

  return (
    <div className="App">
      <h1>Directories Code Task</h1>
      <Tabs>
        <div label="Directory Tree">
          <DirTree tree={data} />
        </div>
        <div label="Raw Data">
          <pre>{JSON.stringify(data, null, 2) }</pre>
        </div>
      </Tabs>
    </div>
  );
}

export default App;


