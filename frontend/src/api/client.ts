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

export interface MovieWithDetails extends Movie {
  overview: string,
  tagline: string,
  voteAverage: number,
  voteCount: number,
}

export type Recommendations = MovieId[]

export async function getMovie(params: {
  imdbId: string,
}): Promise<MovieWithDetails|null> {
  return httpClient
    .get<MovieWithDetails>(`movie/${params.imdbId}`)
    .then(response => {
      return response.data
    })
}

export async function getSimilarItems(params: {
  imdbId: string
}): Promise<Movie[]> {
  return httpClient
    .get<Movie[]>(`recommendation/similarItems/${params.imdbId}`)
    .then(response => {
      return response.data
    })
}

export async function getRecommendedMovies(params: {
  userId: string
}): Promise<Movie[]> {
  return httpClient
    .get<Movie[]>(`recommendation/personalized`)
    .then(response => {
      return response.data
    })
}

export async function getRecentlyPopularMovies(params: {
  userId: string
}): Promise<Movie[]> {
  return httpClient
    .get<Movie[]>(`recommendation/recentPopular`)
    .then(response => {
      return response.data
    })
}

export async function getHighlyRatedMovies(params: {
  userId: string
}): Promise<Movie[]> {
  return httpClient
    .get<Movie[]>(`recommendation/highlyRated`)
    .then(response => {
      return response.data
    })
}
