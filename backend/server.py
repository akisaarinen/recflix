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
  return ({
    "id": frame['id'],
    "imdbId": frame['imdb_id'],
    "title": frame["title"],
    "releaseYear": frame["year"],
    "imageUrl": "https://image.tmdb.org/t/p/w500/%s" % frame["poster_path"],
  })

API_VERSION = "v1"

@app.route('/api/%s/movie/<movieId>' % API_VERSION, methods=["GET"])
def apiMovies(movieId):
  movie_match = movies[movies['imdb_id'] == movieId]
  if len(movie_match) != 1:
    return make_response(jsonify({
      "match_count" : len(movie_match)
    }), 404)
  return jsonify(format_movie(movie_match.iloc[0]))

if __name__ == '__main__':
    app.run()