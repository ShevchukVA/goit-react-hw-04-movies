import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getQueryParams from '../utilits/getQueryString';
import SearchBox from '../components/SearchBox';
import Notification from '../components/Notification';
import Loader from '../components/Loader';
import movieApi from '../api/movieApi';
import styles from '../styles.module.css';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.fetchShows(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchShows(nextQuery);
    }
  }

  fetchShows = query => {
    this.setState({ loading: true });
    movieApi
      .fetchMoviesApi(query)
      .then(movies => this.setState({ movies }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = query => {
    this.props.history.push({
      ...this.props.location.pathname,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        <SearchBox onSubmit={this.handleChangeQuery} />
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <div className={styles.loading}>{loading && <Loader />}</div>
        {movies.length > 0 && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${this.props.match.url}/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
