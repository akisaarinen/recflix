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
