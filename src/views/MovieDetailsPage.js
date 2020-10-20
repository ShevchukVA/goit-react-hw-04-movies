import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import movieApi from '../api/movieApi';
import Cast from './Cast';
import Reviews from './Reviews';
import Notification from '../components/Notification';
import Loader from '../components/Loader';
import routes from '../routes';
import styles from '../styles.module.css';

export default class MoviesDetailsPage extends Component {
  state = {
    movie: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    movieApi
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoToBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }
    this.props.history.push(routes.moviesPage);
  };

  render() {
    const { error, loading } = this.state;
    return (
      <>
        <button
          className={styles.button}
          type="button"
          onClick={this.handleGoToBack}
        >
          to back
        </button>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <div className={styles.loading}>{loading && <Loader />}</div>
        {this.state.movie && (
          <>
            <div className={styles.box}>
              {this.state.movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${this.state.movie.backdrop_path}`}
                  alt={this.state.movie.title}
                  className={styles.boxImg}
                />
              )}
              <div>
                <h1>
                  {this.state.movie.title || this.state.movie.name}(
                  {this.state.movie.release_date.substr(0, 4)})
                </h1>
                <p>
                  User Score: {Number.parseInt(this.state.movie.popularity)}%
                </p>
                <h2>Overview</h2>
                <p>{this.state.movie.overview}</p>
                <h3>Genres</h3>
                <ul className={styles.boxList}>
                  {this.state.movie.genres.map(genre => (
                    <li className={styles.boxListItem} key={genre.id}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className={styles.boxLine} />
            <div>
              <h4 className={styles.info}>Additional information</h4>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/cast`,
                      state: { from: this.props.location.state.from },
                    }}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/reviews`,
                      state: { from: this.props.location.state.from },
                    }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
              <hr className={styles.boxLine} />
              <Route path={`${this.props.match.path}/cast`} component={Cast} />
              <Route
                path={`${this.props.match.path}/reviews`}
                component={Reviews}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
