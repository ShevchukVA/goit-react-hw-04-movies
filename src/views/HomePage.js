import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../api/movieApi';
import Notification from '../components/Notification';
import Loader from '../components/Loader';
import styles from '../styles.module.css';

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    movieApi
      .fetchMovieTrending()
      .then(movies => this.setState({ movies }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <div className={styles.loading}>{loading && <Loader />}</div>
        {movies.length > 0 && (
          <div>
            <h1>Trending today</h1>
            <ul>
              {movies.map(movie => (
                <li key={movie.id}>
                  <Link
                    to={{
                      pathname: `movies/${movie.id}`,
                      state: { from: this.props.location },
                    }}
                  >
                    {movie.title || movie.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}
