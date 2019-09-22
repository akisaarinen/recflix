import React, { useState, useEffect } from 'react';

import { MovieList } from './MovieList'

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

  const fetchMovieById = async(movieId: api.MovieId): Promise<api.Movie> => {
    const movie = await api.getMovie({ movieId })
    if (movie !== null) {
      return movie
    }
    throw new Error(`Movie information not found for ${movieId}`)
  }

  const fetchLists = async() => {
    const params = { userId: "dummy" }

    const [recommended, popular, highlyRated] = await Promise.all([
      api.getRecommendedMovies(params)
        .then(movieIds => Promise.all(movieIds.map(fetchMovieById))),
      api.getRecommendedMovies(params)
        .then(movieIds => Promise.all(movieIds.map(fetchMovieById))),
      api.getRecommendedMovies(params)
        .then(movieIds => Promise.all(movieIds.map(fetchMovieById)))
    ])
    setLists({ recommended, popular, highlyRated })
  }

  useEffect(() => {
    if (lists.recommended.length > 0) return
    fetchLists()
  }, [lists, setLists])

  return (<>
    <h4>Recommended for you</h4>
    <MovieList movies={lists.recommended || []}/>
    <h4>Popular Recent Movies</h4>
    <MovieList movies={lists.popular || []}/>
    <h4>Highly Rated Classics</h4>
    <MovieList movies={lists.highlyRated || []}/>
  </>)
}
