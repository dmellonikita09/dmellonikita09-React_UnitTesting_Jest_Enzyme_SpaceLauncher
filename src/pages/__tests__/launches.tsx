import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { cleanup,   waitForElement } from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];

    const wrapper = mount(<BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={true} cache={cache}><Launches /></MockedProvider>
    </BrowserRouter>
    )
    await waitForElement(() => wrapper.find('test mission'));
  });
});