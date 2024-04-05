import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService, private cartService: CartService,private router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  getProductQuantity(product: Product): number {
    return this.cartService.getProductQuantity(product);
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}