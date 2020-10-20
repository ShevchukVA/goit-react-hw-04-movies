import React, { Component } from 'react';
import movieApi from '../api/movieApi';
import styles from '../styles.module.css';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    movieApi
      .fetchMovieDetailsReviews(this.props.match.params.movieId)
      .then(reviews => this.setState({ reviews }));
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length === 0 && (
          <p>We don't have any reviews for this movie</p>
        )}
        {reviews.length > 0 && (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p className={styles.author}>Author: {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
