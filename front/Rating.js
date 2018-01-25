import React, { Component } from 'react';

export const Rating = ({ rank, icon }) =>
    <div>
        {Array.apply(null, Array(rank)).map((_, i) =>
            <i key={i} className={"icon small " + (icon || 'star')} />)}
    </div>

export const EditRating = ({ rank, icon, onRating }) => {
    rank = rank || 0;
    icon = icon || 'star';
    return (
        <div>
            {rank > 0 && Array.apply(null, Array(rank)).map((_, i) =>
                <i key={i} className={"icon small " + icon}
                    onClick={() => onRating(i + 1)} />)}
            {rank < 5 && Array.apply(null, Array(5 - rank)).map((_, i) =>
                <i key={i + rank} className={"icon small empty " + icon}
                    onClick={() => onRating(i + 1 + rank)} />)}
        </div>)
}
