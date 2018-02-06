import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { EditRating, Rating } from '../Rating';

describe('Rating', () => {
  test('matches snapshots', () => {
    [null, 0, 1, 5].forEach((rating) => {
      const component = renderer.create(<Rating rating={rating} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot(`rating=${rating}`);
    });
  });
  test('renders {rating} `.icon.star`', () => {
    // This is functionally redundant to the snapshot tests, but
    // it communicates the intent.
    const rating = shallow(<Rating rating={2} />);
    expect(rating.find('.icon.star')).toHaveLength(2);
  });
});


describe('EditRating', () => {
  test('matches snapshots', () => {
    [null, 0, 1, 5].forEach((rating) => {
      const component = renderer.create(<EditRating rating={rating} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot(`rating=${rating}`);
    });
  });
});
