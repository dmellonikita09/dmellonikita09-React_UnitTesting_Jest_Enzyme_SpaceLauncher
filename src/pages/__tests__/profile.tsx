import React from 'react';
import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should render loading state initially', async () => {
    // Arrange
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: {} },
      },
    ];
    const { getByText } = renderApollo(<Profile />, { mocks });

    // Act
    const loading = await waitForElement(() => getByText(/logo/i));

    // Assert
    expect(loading).toBeInTheDocument()
  });

  it('should render trips', async () => {
    // Arrange
    const mockTrip1 = {
      __typename: 'Launch',
      id: 1,
      isBooked: true,
      rocket: {
        __typename: 'Rocket',
        id: 1,
        name: 'rocket1',
      },
      mission: {
        __typename: 'Mission',
        id: 1,
        name: 'test mission',
        missionPatch: '/',
      },
    };    
    const mockTrip2 = {
      __typename: 'Launch',
      id: 2,
      isBooked: true,
      rocket: {
        __typename: 'Rocket',
        id: 2,
        name: 'rocket2',
      },
      mission: {
        __typename: 'Mission',
        id: 2,
        name: 'test mission2',
        missionPatch: '/',
      },
    };
    const mockMe = {
      __typename: 'User',
      id: 1,
      email: 'a@a.a',
      trips: [mockTrip1, mockTrip2],
    };
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];
    const { getByText, getAllByText } = renderApollo(<Profile />, { mocks });

    // Act
    const title = await waitForElement(() => getByText('My Trips'));
    const missions = getAllByText(/test mission/i);
    const rockets = getAllByText(/rocket/i);

    // Assert
    expect(title).toBeInTheDocument()
    expect(missions).toHaveLength(2);
    expect(missions[0].textContent).toBe('test mission')
    expect(missions[1].textContent).toBe('test mission2')
    expect(rockets).toHaveLength(2);
    expect(rockets[0].textContent).toBe('rocket1')
    expect(rockets[1].textContent).toBe('rocket2')
  });

  it('should render no trip message', async () => {
    // Arrange
    const mockMeWithNoTrips = {
      __typename: 'User',
      id: 1,
      email: '',
      trips: [],
    };
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMeWithNoTrips } },
      },
    ];
    const { getByText } = renderApollo(<Profile />, { mocks });

    // Act
    const title = await waitForElement(() => getByText('My Trips'));
    const message = getByText("You haven't booked any trips");

    // Assert
    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('should render error state', async () => {
    // Arrange
    const erroMsg = 'Oops, something went wrong.';
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        error: new Error(erroMsg),
      },
    ];
    const { getByText } = renderApollo(<Profile />, { mocks });

    // Act
    const message = await waitForElement(() => getByText(`ERROR: ${erroMsg}`));

    // Assert
    expect(message).toBeInTheDocument();
  });

  it('should render error on undefined data', async () => {
    // Arrange
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: {} },
      },
    ];
    const { getByText } = renderApollo(<Profile />, { mocks });

    // Act
    const error = await waitForElement(() => getByText('ERROR'));

    // Assert
    expect(error).toBeInTheDocument()
  });
});