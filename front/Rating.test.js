import { EditRating, Rating } from './Rating.js'

import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Rating', () => {


    [null, 0, 1, 5].forEach(rating => {
        test(`${rating} matches snapshot`, () => {

            const component = renderer.create(
                <Rating rating={rating} />
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    test('renders {rating} `.icon.star`', () => {
        // This is functionally redundant to the snapshot tests, but
        // it communicates the intent.
        const rating = shallow(<Rating rating={2} />);
        expect(rating.find('.icon.star')).toHaveLength(2);
    });
})


describe('EditRating', () => {
    [null, 0, 1, 5].forEach(rating => {
        test(`rating ${rating} matches snapshot`, () => {
            const component = renderer.create(
                <EditRating rating={rating} />
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
})
