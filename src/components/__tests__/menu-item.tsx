import React from 'react';
import { mount } from 'enzyme';
import MenuItem from '../menu-item';

describe('Menu Item', () => {
  it('should render correctly', () => {
    const wrapper = mount(<MenuItem to="/wow" />);
    expect(wrapper).toMatchSnapshot();
  });
});