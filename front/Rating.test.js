import { EditRating, Rating } from './Rating.js'

import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Rating', () => {


    [0, 1, 5].forEach(rating => {
        test(`${rating} matches snapshot`, () => {

            const component = renderer.create(
                <Rating rating={rating} />
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    // test('has the right number of stars', () => {
    //     // Render a checkbox with label in the document
    //     const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

    //     expect(checkbox.text()).toEqual('Off');

    //     checkbox.find('input').simulate('change');

    //     expect(checkbox.text()).toEqual('On');
    // });
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
