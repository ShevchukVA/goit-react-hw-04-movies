import PropTypes from 'prop-types';

const keyApi = '16329fa292eb0641dcc19ee9f479005f';
const baseUrl = 'https://api.themoviedb.org/3';

const fetchMovieTrending = () => {
  return fetch(
    `${baseUrl}/trending/movie/day?api_key=${keyApi}`,
  ).then(response => response.json().then(entries => entries.results));
};

const fetchMoviesApi = searchQuery => {
  return fetch(`${baseUrl}/search/movie?query=${searchQuery}&api_key=${keyApi}`)
    .then(response => response.json())
    .then(entries => entries.results);
};

const fetchMovieDetails = movieId => {
  return fetch(`${baseUrl}/movie/${movieId}?api_key=${keyApi}`).then(response =>
    response.json(),
  );
};

const fetchMovieDetailsCast = movieId => {
  return fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${keyApi}`)
    .then(response => response.json())
    .then(entries => entries.cast);
};

const fetchMovieDetailsReviews = movieId => {
  return fetch(`${baseUrl}/movie/${movieId}/reviews?api_key=${keyApi}`)
    .then(response => response.json())
    .then(entries => entries.results);
};

fetchMoviesApi.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

fetchMovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};

fetchMovieDetailsCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

fetchMovieDetailsReviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default {
  fetchMoviesApi,
  fetchMovieDetails,
  fetchMovieTrending,
  fetchMovieDetailsCast,
  fetchMovieDetailsReviews,
};
