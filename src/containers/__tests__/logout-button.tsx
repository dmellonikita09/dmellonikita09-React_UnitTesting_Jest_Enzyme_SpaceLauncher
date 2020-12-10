import React from 'react';
import LogoutButton from '../logout-button';
import { cleanup } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';

describe.only('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  it('renders logout button 2', async () => {
    const wrapper = mount(<MockedProvider ><LogoutButton /></MockedProvider>
    );
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('complete logout', async () => {
    //pre req
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    const wrapper = mount(<MockedProvider cache={cache}><LogoutButton /></MockedProvider>
    );
    // next step clicks on logout button
    const button = wrapper.find({ 'data-testid': "logout-button" }).first();
    wrapper.simulate('click',);
    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});