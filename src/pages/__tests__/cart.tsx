import React from 'react';
import { wait } from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

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
  cartItems: ['1']

};
describe('Cart Page', () => {
  let wrapper: any;
  afterEach(() => wrapper.unmount());

  it('renders with message for empty carts', () => {
    // const { getByTestId } = renderApollo(<Cart />, { cache });
    wrapper = mount(<BrowserRouter>
      <MockedProvider cache={cache}><Cart /></MockedProvider>
    </BrowserRouter>)
    wait(() => wrapper.find('empty-message'));
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    wrapper = mount(<BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false} cache={cache}><Cart /></MockedProvider>
    </BrowserRouter>)

    cartItemsVar(['1']);
    wait(() => wrapper.find('book-button'));
  });
});
