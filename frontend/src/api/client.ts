import * as dummyData from "./dummyData"

export type MovieId = string

export interface Movie {
  id: string,
  imdbId: string,
  title: string,
  releaseDate: string,
  imageUrl: string,
}

export type Recommendations = MovieId[]

export async function getMovie(params: {
  movieId: string,
}): Promise<Movie|null> {
  const data: { [key: string]: any } = dummyData.movies[params.movieId] || {}
  const movie = {
    id: data["id"],
    imdbId: data["imdb_id"],
    title: data["title"],
    releaseDate: data["release_date"],
    imageUrl: tmdbImageBasePath + data["backdrop_path"]
  }
  return Promise.resolve(movie)
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

// TODO: If using from tmdb, should fetch from configuration API
//       as the URL may change.
const tmdbImageBasePath = "https://image.tmdb.org/t/p/w500/"

function shuffleArrayInPlace<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}