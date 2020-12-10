import React from 'react';
import { mount } from 'enzyme';
import Loading from '../loading';

describe('Loading', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});