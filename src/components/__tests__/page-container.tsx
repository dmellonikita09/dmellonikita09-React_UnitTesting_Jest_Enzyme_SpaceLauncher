import React from 'react';
import { mount } from 'enzyme';
import PageContainer from '../page-container';

describe('Page Container', () => {
  it('should contain passed page content', () => {
    const mockPageOne = (<div id='page1'/>), mockPageTwo = (<div id='page2'/>)
    const wrapper = mount(
      <PageContainer>
        {mockPageOne}
        {mockPageTwo}
      </PageContainer>);
    expect(wrapper).toMatchSnapshot();
  });
});
