import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap'

import * as api from '../api/client'

import './MovieDetails.css'

interface MovieDetailsProps {
  imdbId: string
}

export const MovieDetails: React.FunctionComponent<MovieDetailsProps> = (props) => {
  const [movie, setMovie]  = useState<api.Movie|null>(null)

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
        </Col>
        <Col>
        <Image src={movie.imageUrl} fluid />
        </Col>
      </Row>
    </Container>
  </>)
}
