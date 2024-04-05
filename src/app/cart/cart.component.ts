import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[]=[];
  totalPrice!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
