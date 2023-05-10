import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShopPage from '../assets/js/pages/Shop';


describe('ShopPage', () => {
  it('should increment cart count and change cart icon on add to cart', () => {
    const { getByTestId } = render(<ShopPage />);
    const cartIcon = getByTestId('cart-icon');
    const addToCartButton = getByTestId('add-to-cart-button');
    expect(cartIcon.src).toContain('cart-icon-empty.png');
    expect(cartIcon.alt).toBe('Logo panier vide');
    expect(getByTestId('cart-count').textContent).toBe('0');
    fireEvent.click(addToCartButton);
    expect(getByTestId('cart-count').textContent).toBe('1');
    expect(cartIcon.src).toContain('cart-icon-full.png');
    expect(cartIcon.alt).toBe('Logo panier plein');
  });
});
