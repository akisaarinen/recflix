import * as dummyData from "./dummyData"
import axios from 'axios'

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: false,
})

export type MovieId = string

export interface Movie {
  id: string,
  imdbId: string,
  title: string,
  releaseYear: number,
  imageUrl: string,
}

export type Recommendations = MovieId[]

export async function getMovie(params: {
  movieId: string,
}): Promise<Movie|null> {
  return httpClient
    .get<Movie>(`movie/${params.movieId}`)
    .then(response => {
      return response.data
    })
}

export async function getRecommendedMovies(params: {
  userId: string
}): Promise<MovieId[]> {
  const allMovies = Object.keys(dummyData.movies)
  shuffleArrayInPlace(allMovies)
  return Promise.resolve(allMovies)
}

export async function getRecentlyPopularMovies(params: {
  userId: string
}): Promise<MovieId[]> {
  const allMovies = Object.keys(dummyData.movies)
  shuffleArrayInPlace(allMovies)
  return Promise.resolve(allMovies)
}

export async function getHighlyRatedMovies(params: {
  userId: string
}): Promise<MovieId[]> {
  const allMovies = Object.keys(dummyData.movies)
  shuffleArrayInPlace(allMovies)
  return Promise.resolve(allMovies)
}

function shuffleArrayInPlace<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}