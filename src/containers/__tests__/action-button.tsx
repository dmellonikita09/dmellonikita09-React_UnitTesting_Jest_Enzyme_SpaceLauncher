import React from 'react';
import ActionButton from '../action-button';
import { mount, shallow } from 'enzyme';

describe('Action Button', () => {
  it('renders without error', () => {
    const wrapper = mount(<ActionButton />);
    wrapper.find('button').simulate('click');

  });

  it("renders correctly", () => {
    const wrapper = shallow(
      <ActionButton />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('shows add trip ', () => {
    const wrap = shallow(
      <ActionButton id="1" />)
    expect(wrap.text()).toEqual('<ToggleTripButton />')
  });

  it('shows cancels trip if trip is already booked', () => {
    const wrap = shallow(
      <ActionButton isBooked={true} />
    )
    expect(wrap.text()).toEqual('<CancelTripButton />')
  });
});
