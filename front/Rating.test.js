import { EditRating, Rating } from './Rating.js'

import React from 'react'
import renderer from 'react-test-renderer';

describe('Rating', () => {
    test('makes stars', () => {
        const component = renderer.create(
            <Rating rank="2" />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})


describe('EditRating', () => {
    test('makes stars', () => {
        const component = renderer.create(
            <EditRating rank="2" />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})
