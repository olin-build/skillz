import { EditRating, Rating } from './Rating.js'

import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Rating', () => {


    [0, 1, 5].forEach(rank => {
        test(`${rank} matches snapshot`, () => {

            const component = renderer.create(
                <Rating rank={rank} />
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
})


describe('EditRating', () => {
    [0, 1, 5].forEach(rating => {
        test(`rating ${rating} matches snapshot`, () => {
            const component = renderer.create(
                <EditRating rating={rating} />
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
})
