import React, { useState, useEffect } from 'react';

import { MovieList } from './MovieList'

import './Home.css'

import * as api from '../api/client'

interface MovieLists {
  recommended: api.Movie[],
  popular: api.Movie[],
  highlyRated: api.Movie[],
}

export const Home: React.FunctionComponent<any> = (props) => {
  const [lists, setLists] = useState<MovieLists>({
    recommended: [],
    popular: [],
    highlyRated: [],
  })

  const fetchLists = async() => {
    const params = { userId: "dummy" }

    // TODO: Error handling
    const [recommended, popular, highlyRated] = await Promise.all([
      api.getRecommendedMovies(params).catch(error => []),
      api.getRecentlyPopularMovies(params).catch(error => []),
      api.getHighlyRatedMovies(params).catch(error => []),
    ])
    setLists({ recommended, popular, highlyRated })
  }

  useEffect(() => {
    if (lists.popular.length > 0 ||
      lists.recommended.length > 0 ||
      lists.highlyRated.length > 0)
      return
    fetchLists()
  })

  return (<>
    <h4>Recommended for you</h4>
    <MovieList movies={lists.recommended || []}/>
    <h4>Popular Recent Movies</h4>
    <MovieList movies={lists.popular || []}/>
    <h4>Highly Rated Classics</h4>
    <MovieList movies={lists.highlyRated || []}/>
  </>)
}
