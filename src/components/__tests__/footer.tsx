import { shallow } from 'enzyme';
import React from 'react';
import Footer from '../footer';

describe('Footer', () => {
  it('renders without error', () => {
    const wrapper = shallow(<Footer />);
    const home = wrapper.find('[to="/"]');
    expect(home).toHaveLength(1);
  });

  it('renders without error', () => {
    const wrapper = shallow(<Footer />);
    const cart = wrapper.find('[to="/cart"]');
    expect(cart).toHaveLength(1);
  });

  it('renders without error', () => {
    const wrapper = shallow(<Footer />);
    const profile = wrapper.find('[to="/profile"]');
    expect(profile).toHaveLength(1);
  });

  it('matches snapshot', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
