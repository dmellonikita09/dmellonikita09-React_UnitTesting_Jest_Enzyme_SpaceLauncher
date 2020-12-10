import { mount } from 'enzyme';
import React from 'react';
import LaunchDetail from '../launch-detail';

describe('Launch Detail View', () => {
  it('renders without error', () => {
    const mockLaunch = {
      __typename: 'Launch',
      id: 1,

      rocket: {
        __typename: 'Rocket',
        id: 1,
        name: 'tester',
      }
    };    
    const wrapper=mount(<LaunchDetail />);
    expect(wrapper.find({mockLaunch}));
  });
    
  it('renders without error', () =>{
    const component= mount(
      <LaunchDetail
      id={'1'}
      site={'earth'}
      rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />
    );
    expect(component).toMatchSnapshot();
  });  
});
