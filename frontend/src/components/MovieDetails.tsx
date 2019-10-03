import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap'

import * as api from '../api/client'

import './MovieDetails.css'

interface MovieDetailsProps {
  imdbId: string
}

function createStars(voteAverage: number) {
  // Using a rather arbitrary mapping to stars:
  // 4.0+ = 1 stars
  // 5.0+ = 2 stars
  // 6.0+ = 3 stars
  // 7.0+ = 4 stars
  // 8.0+ = 5 stars
  const starCount = 1.0 + Math.floor(Math.max(5.0, Math.min(8.0, voteAverage)) - 4.0)
  const starFull = "★"
  const starEmpty = "☆"
  return Array(starCount+1).join(starFull) + Array(6-starCount).join(starEmpty)
}
export const MovieDetails: React.FunctionComponent<MovieDetailsProps> = (props) => {
  const [movie, setMovie]  = useState<api.MovieWithDetails|null>(null)

  useEffect(() => {
    if (!!movie) return
    api.getMovie({ imdbId: props.imdbId }).then(movie => setMovie(movie))
  })

  if (!movie) {
    return (<Spinner animation="border"/>)
  }

  return (<>
    <Container>
      <Row>
        <Col>
          <h3>{movie.title} ({movie.releaseYear})</h3>
          <h4>{createStars(movie.voteAverage)} {movie.voteAverage} (from {movie.voteCount} reviews)</h4>
          <p>
            {movie.overview}
          </p>
        </Col>
        <Col>
        <Image className="moviePoster" src={movie.imageUrl} fluid />
        </Col>
      </Row>
    </Container>
  </>)
}
