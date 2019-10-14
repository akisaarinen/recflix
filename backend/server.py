import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix

from flask import Flask, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# Note: no restrictions atm
CORS(app)

# Load data
def load_sparse_csr(filename):
  loader = np.load(filename + '.npz')
  return csr_matrix((loader['data'], loader['indices'], loader['indptr']),
                    shape=loader['shape'])

print("Loading data:")
print("- Cosine similarity")
sim_cos = load_sparse_csr("data/sim_ml-latest_matrix")
imdb_ids = pd.read_csv(
  "data/sim_ml-latest_mapping.csv",
  names=["sim_id", "imdb_id"],
  header=0,
  dtype={ "sim_id": int, 'imdb_id': str }
)
print("  [sim_cos.shape: %s]" % str(sim_cos.shape))
print("  [imdb_ids.shape: %s]" % str(imdb_ids.shape))

print("- Movies metadata")
movies = pd.read_csv(
  "data/movies_metadata_recflix.csv.gz")
print("  [movies.shape: %s]" % str(movies.shape))

print("")
print("Processing data:")
print("- Match and merge movies from datasets")
imdb_ids['imdb_id'] = imdb_ids['imdb_id'].map(lambda x: "tt%s" % x)
movies = movies.merge(imdb_ids, how='inner')
print(movies.head(3))
print("=> Done")

@app.route('/')
def root():
  return "Not available"

def format_movie(frame):
  print(frame)
  return ({
    "imdbId": frame['imdb_id'],
    "title": frame["title"],
    "releaseYear": frame["year"],
    "imageUrl": "https://image.tmdb.org/t/p/w500/%s" % frame["poster_path"],
  })

def format_movie_details(frame):
  print(frame)

  def with_default(val, default_val):
    if pd.isna(val):
      return default_val
    return val

  return ({
    "imdbId": frame['imdb_id'],
    "title": frame["title"],
    "releaseYear": str(frame["year"]),
    "imageUrl": "https://image.tmdb.org/t/p/w500/%s" % frame["poster_path"],
    "tagline": with_default(frame["tagline"], ""),
    "overview": with_default(frame["overview"], ""),
    "voteAverage": "%.1f" % frame["vote_average"],
    "voteCount": str(frame["vote_count"]),
  })

def recommendationSimilarItems(movie):
  sim_id = movie['sim_id']
  not_included = [sim_id]
  sim_val = sim_cos[sim_id].toarray().flatten()
  sim_df = pd.DataFrame({
    "sim" : sim_val,
    "sim_id": np.arange(len(sim_val)),
  })
  sim_df.drop(index=not_included, inplace=True)
  sim_df = sim_df.sort_values(by='sim', ascending=False)
  sim_df = sim_df[:15]
  sim_df = sim_df.merge(movies)
  return sim_df

def recommendationRecentPopular():
  MIN_YEAR = 2010
  MIN_COUNT = 1000
  by_rating = movies[(movies['year'] >= MIN_YEAR) & (movies['vote_count'] >= MIN_COUNT)].sort_values("vote_average")
  return by_rating.tail(50).sample(20)

def recommendationHighlyRated():
  MIN_COUNT = 1000
  MIN_VOTE = 8.0
  by_rating = movies[(movies['vote_average'] >= MIN_VOTE) & (movies['vote_count'] >= MIN_COUNT)]
  return by_rating.sample(20)

def recommendationPersonalized():
  # Completely random, an excellent choice, but only those
  # for which we have at least 10 ratings and poster image available
  # for better visual effects
  return movies[(movies['vote_count'] >= 10) & (movies['poster_path'] != "")].sample(20)

API_VERSION = "v1"

@app.route('/api/%s/movie/<imdbId>' % API_VERSION, methods=["GET"])
def apiMovies(imdbId):
  movie_match = movies[movies['imdb_id'] == imdbId]
  if len(movie_match) != 1:
    return make_response(jsonify({
      "match_count" : len(movie_match)
    }), 404)
  return jsonify(format_movie_details(movie_match.iloc[0]))

@app.route('/api/%s/recommendation/similarItems/<imdbId>' % API_VERSION, methods=["GET"])
def apiRecommendationSimilarItems(imdbId):
  movie_match = movies[movies['imdb_id'] == imdbId]
  if len(movie_match) != 1:
    return make_response(jsonify({
      "match_count" : len(movie_match)
    }), 404)
  return jsonify(list(recommendationSimilarItems(movie_match.iloc[0]).apply(format_movie, axis=1)))

@app.route('/api/%s/recommendation/recentPopular' % API_VERSION, methods=["GET"])
def apiRecommendationRecentPopular():
  return jsonify(list(recommendationRecentPopular().apply(format_movie, axis=1)))

@app.route('/api/%s/recommendation/highlyRated' % API_VERSION, methods=["GET"])
def apiRecommendationHighlyRated():
  return jsonify(list(recommendationHighlyRated().apply(format_movie, axis=1)))

@app.route('/api/%s/recommendation/personalized' % API_VERSION, methods=["GET"])
def apiRecommendationPersonalized():
  return jsonify(list(recommendationPersonalized().apply(format_movie, axis=1)))

if __name__ == '__main__':
    app.run()