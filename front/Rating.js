import React, { Component } from 'react';

export const Rating = ({ rank, icon }) =>
    <div className="compact my-rating">
        {Array.apply(null, Array(rank)).map((_, i) =>
            <i key={i} className={"icon small " + (icon || 'star')} />)}
    </div>

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
        let { icon } = this.props;
        let { rating } = this.state;
        rating = rating || 0;
        icon = icon || 'star';
        return (
            <div>
                {rating > 0 && Array.apply(null, Array(rating)).map((_, i) =>
                    <i key={i} className={"icon small " + icon}
                        onClick={() => this.onRating(i + 1)} />)}
                {rating < 5 && Array.apply(null, Array(5 - rating)).map((_, i) =>
                    <i key={i + rating} className={"icon small empty " + icon}
                        onClick={() => this.onRating(i + 1 + rating)} />)}
            </div>)
    }
}
