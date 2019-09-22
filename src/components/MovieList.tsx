import React from 'react'
import { Card, Image } from 'react-bootstrap'

import * as api from '../api/client'

import './MovieList.css'

type MovieListProps = {
  movies: api.Movie[]
}

export const MovieList: React.FunctionComponent<MovieListProps> = (props) => {
  return <div className="movieList">
    { props.movies.map(movie =>
      <div className="movieList--content">
        <div className="movieList--content__box">
          <Image src={movie.imageUrl} fluid />
          <div className="textOverlay">
            { movie.title }
          </div>
        </div>
      </div>
      )
    }
  </div>
}
