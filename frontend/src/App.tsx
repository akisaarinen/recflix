import React from 'react'
import './App.css';
import { Home } from './components/Home'
import { Menu } from './components/Menu'
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu>
        <Router>
          <Route path="/" exact>
            <Home/>
          </Route>
        </Router>
      </Menu>
    </div>
  );
}

export default App;
