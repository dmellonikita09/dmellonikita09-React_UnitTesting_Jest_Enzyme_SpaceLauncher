import { mount } from 'enzyme';
import React from 'react';
import LaunchTile from '../launch-tile';

describe('Launch Tile', () => {
  it('renders without error', () => {
    const component = mount(
      <LaunchTile
      launch={{
        __typename: 'Launch',
        isBooked: false,
        id: '1',
        mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
        rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
      }}
      />
    );
    expect (component).toMatchSnapshot();
  });
});