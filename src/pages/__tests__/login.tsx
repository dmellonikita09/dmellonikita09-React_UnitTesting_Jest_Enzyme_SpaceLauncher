import React from 'react';
import { cleanup,  wait } from '../../test-utils';
import Login, { LOGIN_USER } from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

const runAllPromises = () => new Promise(setImmediate)

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should render login page', async () => {
    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];
    const wrapper = mount(<BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false} cache={cache}><Login /></MockedProvider>
    </BrowserRouter>
    )
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];

    const wrapper = mount(<BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={true} cache={cache}><Login /></MockedProvider>
    </BrowserRouter>
    )

    const input = wrapper.find('Styled(input)');
    expect(input.exists()).toBeTruthy();

    input.simulate('change', { target: { value: 'a@a.a' } })
    const form = wrapper.find('Styled(form)').first();
    const event = { preventDefault: () => { } }

    form.simulate('submit', event)

    await wait(() => expect(isLoggedInVar()).toBeTruthy());
  });
});