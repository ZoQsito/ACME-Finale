import React from 'react';
import { shallow } from 'enzyme';
import ShopPage from '../assets/js/pages/Shop';


describe('ShopPage component', () => {
  it('renders the component without crashing', () => {
    shallow(<ShopPage />);
  });

  it('initializes the state correctly', () => {
    const wrapper = shallow(<ShopPage />);
    const initialState = {
      basket: [],
      products: [],
      cartCount: 0,
      emailUser: undefined,
      isAuthenticated: false,
    };
    expect(wrapper.state()).toEqual(initialState);
  });

  it('displays a product card', () => {
    const products = [
      {
        id: 1,
        nom: 'Product 1',
        prix: 10,
        photo: 'http://example.com/product1.jpg',
      },
    ];
    const wrapper = shallow(<ShopPage />);
    wrapper.setState({ products });
    expect(wrapper.find('.card')).toHaveLength(1);
  });

  it('calls the handleBuyClick function when clicking on the Buy button', () => {
    const products = [
      {
        id: 1,
        nom: 'Product 1',
        prix: 10,
        photo: 'http://example.com/product1.jpg',
      },
    ];
    const handleBuyClick = jest.fn();
    const wrapper = shallow(<ShopPage />);
    wrapper.setState({ products, isAuthenticated: true });
    wrapper.instance().handleBuyClick = handleBuyClick;
    wrapper.update();
    wrapper.find('#button1').simulate('click');
    expect(handleBuyClick).toHaveBeenCalled();
  });
});