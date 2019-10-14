import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from "react-router-dom"

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
          <Link to={`/movies/${movie.imdbId}`}>
            <Image src={movie.imageUrl} fluid />
            <div className="textOverlay">
              { movie.title } ({movie.releaseYear})
            </div>
          </Link>
        </div>
      </div>
      )
    }
  </div>
}
