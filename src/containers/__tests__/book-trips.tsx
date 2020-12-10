import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import React from 'react';
import { Button } from '../../components';
import { waitForElement } from '../../test-utils';
import BookTrips, { BOOK_TRIPS } from '../book-trips';
import { GET_LAUNCH } from '../cart-item';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('book trips', () => {

  it('renders without error', () => {
    const wrapper = mount(<Button id='book-button'>Book All</Button>)
    wrapper.simulate('click');
  });

  it('shows correct name', () => {
    const wrapper = mount(
      <MockedProvider ><BookTrips cartItems={[]} /></MockedProvider>)
    expect(wrapper.text()).toEqual('Book All')
  });

  it('shows message', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[
        {
          request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
          result: {
            data: {
              bookTrips: [{ success: true, message: 'success!', launches: [] }],
            },
          },
        },
        {

          request: { query: GET_LAUNCH, variables: { launchId: '1' } },
          result: { data: { launch: mockLaunch } },
        },
      ]}
      ><BookTrips cartItems={[]} /></MockedProvider>)
    await waitForElement(() => wrapper.find('message'));
  });
});