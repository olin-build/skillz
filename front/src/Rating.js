/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';

export const Rating = ({ rating, icon }) => {
  const size = 'tiny';
  return (
    <div className="compact my-rating">
      {Array(...Array(rating || 0)).map((_, i) =>
        <i key={i} className={`${size} ${icon || 'star'} icon`} />)}
      {!!rating || <i className={`${size} empty star icon`} style={{ color: 'transparent' }} />}
    </div>);
};

export class EditRating extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: props.rating };
    this.onRating = this.onRating.bind(this);
  }
  onRating(rating) {
    this.props.onRating(rating);
    this.setState({ rating });
  }
  render() {
    const { props, state, onRating } = this;
    const icon = props.icon || 'star';
    const rating = state.rating || 0;
    const size = '';
    return (
      <div className="my-rating">
        <i
          className={`${size} circle icon${rating ? ' thin' : ''}`}
          onClick={() => onRating(null)}
        />
        {rating > 0 && Array(...Array(rating)).map((_, i) => (
          <i
            key={i}
            className={`${size} ${icon} icon`}
            onClick={() => onRating(i + 1)}
          />))}
        {rating < 5 && Array(...Array(5 - rating)).map((_, i) => (
          <i
            key={i + rating}
            className={`${size} empty ${icon} icon`}
            onClick={() => onRating(i + 1 + rating)}
          />))}
      </div>);
  }
}
