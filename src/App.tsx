import React from 'react';
import './App.css';
import { Home } from './components/Home'
import { Menu } from './components/Menu'

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu><Home/></Menu>
    </div>
  );
}

export default App;
