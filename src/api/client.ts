export type MovieId = string

export interface Movie {
  id: string,
  imdbId: string,
  title: string,
  releaseDate: string,
}

// Dummy placeholder
export async function getMovie(params: {
  movieId: string,
}): Promise<Movie|null> {
  if (params.movieId == "10194") return {
    id: params.movieId,
    imdbId: "tt0114709",
    title: "Toy Story",
    releaseDate: "1995-10-30"
  }

  if (params.movieId == "5039") return {
    id: params.movieId,
    imdbId: "tt0089880",
    title: "Rambo: First Blood Part II",
    releaseDate: "1985-05-21"
  }

  return null
}

// Dummy placeholder
export async function getRecommendations(params: {
  userId: string
}): Promise<MovieId[]> {
  return Promise.resolve(["10194", "5039"])
}