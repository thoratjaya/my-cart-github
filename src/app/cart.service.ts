import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<number, number> = new Map<number, number>();
  private cartItems: { product: Product, quantity: number }[] = [];

  constructor() { }

  addToCart(product: Product): void {
    const foundIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    if (foundIndex !== -1) {
      this.cartItems[foundIndex].quantity++;
    } else {
      this.cartItems.push({ product: product, quantity: 1 });
    }
  }
  removeFromCart(product: Product): void {
    const foundIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    if (foundIndex !== -1) {
      this.cartItems[foundIndex].quantity--;
      if (this.cartItems[foundIndex].quantity <= 0) {
        this.cartItems.splice(foundIndex, 1);
      }
    }
  }

  getProductQuantity(product: Product): number {
    const productId = product.id;
    return this.cart.get(productId) || 0;
  }

  isInCart(product: Product): boolean {
    return this.cart.has(product.id);
  }
  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
