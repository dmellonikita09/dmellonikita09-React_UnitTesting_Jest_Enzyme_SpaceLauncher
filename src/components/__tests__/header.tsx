import { shallow } from 'enzyme';
import React from 'react';
import Header from '../header';

describe('Header', () => {
  it('renders header with image and children', () => {
      const imgSrc = 'testImage.png';
      const wrapper = shallow(<Header image={imgSrc}><div id='testChildren'/></Header>);  
      const img = wrapper.find('Styled(img)');
      const children = wrapper.find('#testChildren');
      expect(img.prop("src")).toEqual(imgSrc);
      expect(children).toHaveLength(1);      
  });
  it('renders without error and matches snapshot',() =>{
    const component=shallow(<Header />);
    expect (component).toMatchSnapshot();
  });
});
