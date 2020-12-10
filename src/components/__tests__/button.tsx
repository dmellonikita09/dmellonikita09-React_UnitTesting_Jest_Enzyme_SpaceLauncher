import { mount } from 'enzyme';
import React from 'react';
import Button from '../button';

describe('Button', () => {
  it('renders without error', () => {
    const wrapper = mount(<Button>Hello World </Button>);
    wrapper.simulate('click');
  });

  it('matches snapshot', () => {
    const component = mount(<Button>Hello World </Button>);
    expect(component).toMatchSnapshot();
  });
});
