import React from 'react'
import './App.css';
import { Home } from './components/Home'
import { MovieDetails } from './components/MovieDetails'
import { Search } from './components/Search'
import { Menu } from './components/Menu'
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";

type TMovieParams = { imdbId: string }

function Movie({ match }: RouteComponentProps<TMovieParams>) {
  return <MovieDetails imdbId={match.params.imdbId} />
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/movies/:imdbId" component={Movie}/>
        <Route path="/search" component={Search}/>
      </Router>
    </div>
  );
}

export default App;
