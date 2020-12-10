import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, waitForElement } from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';

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

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = mount(<BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={true} ><Launch launchId={1} /></MockedProvider>
    </BrowserRouter>
    )
    await waitForElement(() => wrapper.find('test mission'));
  });
});