import React, { Component } from 'react';
import movieApi from '../api/movieApi';
import styles from '../styles.module.css';

export default class Cast extends Component {
  state = {
    casts: [],
  };

  componentDidMount() {
    movieApi
      .fetchMovieDetailsCast(this.props.match.params.movieId)
      .then(casts => this.setState({ casts }));
  }

  render() {
    const { casts } = this.state;
    casts.length = 10;
    return (
      <>
        {casts.length === 0 && <p>We don't have casts for this movie</p>}
        {casts.length > 0 && (
          <ul>
            {casts.map(cast => (
              <li key={cast.id}>
                {cast.profile_path && (
                  <img
                    className={styles.castImg}
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt={cast.name}
                  />
                )}
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
