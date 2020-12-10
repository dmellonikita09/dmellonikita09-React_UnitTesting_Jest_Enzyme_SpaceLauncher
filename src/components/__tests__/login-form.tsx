import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../login-form';
import * as LoginTypes from '../../pages/__generated__/login';

describe('Login Form', () => {
  it('login should be called with email parameter', () => {
    // Arrange
    const mockLoginFunc = jest.fn((p: { variables: LoginTypes.LoginVariables }) => p.variables.email)
    const wrapper = shallow(<LoginForm login={mockLoginFunc}/>)
    const form = wrapper.find('Styled(form)')
    const input = wrapper.find('Styled(input)')

    // Act
    input.simulate('change', {target: { value: 'test@apollo.com'}})
    // Just to note that this is an issue only when using shallow render. 
    // In case of full DOM renderer mount, the event object contains the preventDefault method, 
    // therefore you don't have to mock it.
    const event = { preventDefault: () => {} }
    jest.spyOn(event, 'preventDefault')
    form.simulate('submit', event)

    // Assert
    expect(mockLoginFunc).toHaveBeenCalledTimes(1)
    expect(mockLoginFunc.mock.results[0].value).toBe('test@apollo.com')
  });
});
