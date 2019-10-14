import pandas as pd

# Load data. Note this assumes files in the right place and
# also fixed a bit since the-movies-dataset that was used is a bit
# broken in format, and will break the read_csv. Alternatively
# one could download these independently from TMDB to produce
# the same dataset.
movies = pd.read_csv("data/the-movies-dataset/movies_metadata.csv", dtype={
  'adult': str,
  'belongs_to_collection': object,
  'budget': int,
  'genres': object,
  'homepage': str,
  'id': str,
  'imdb_id': str,
  'original_language': str,
  'original_title': str,
  'overview': str,
  'popularity': float,
  'poster_path': str,
  'production_companies': object,
  'production_countries': object,
  'release_date': str,
  'revenue': int,
  'runtime': float,
  'spoken_languages': object,
  'status': str,
  'tagline': str,
  'title': str,
  'video': str,
  'vote_average': float,
  'vote_count': int,
},
parse_dates=["release_date"],
usecols=[
  "imdb_id",
  "release_date",
  "title",
  "poster_path",
  "overview",
  "tagline",
  "vote_average",
  "vote_count",
])

movies['year'] = movies['release_date'].map(lambda x: x.year).fillna(0).astype(int)
movies.drop("release_date", axis=1, inplace=True)

movies.set_index("imdb_id", inplace=True)

print(movies.head(5))
movies.to_csv("movies_metadata_recflix.csv.gz", compression="gzip")