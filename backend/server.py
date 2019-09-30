import pandas as pd
from flask import Flask, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# Note: no restrictions atm
CORS(app)

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
}, parse_dates=["release_date"])

movies['year'] = movies['release_date'].map(lambda x: x.year)

@app.route('/')
def root():
  return "Not available"

def format_movie(frame):
  print(frame)
  return ({
    "id": frame['id'],
    "imdbId": frame['imdb_id'],
    "title": frame["title"],
    "releaseYear": frame["year"],
    "imageUrl": "https://image.tmdb.org/t/p/w500/%s" % frame["poster_path"],
  })


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

@app.route('/api/%s/movie/<movieId>' % API_VERSION, methods=["GET"])
def apiMovies(movieId):
  movie_match = movies[movies['imdb_id'] == movieId]
  if len(movie_match) != 1:
    return make_response(jsonify({
      "match_count" : len(movie_match)
    }), 404)
  return jsonify(format_movie(movie_match.iloc[0]))


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