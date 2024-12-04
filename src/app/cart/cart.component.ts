import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { CartAPIService } from '../services/cart-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [];
  totalAmount: number = 0;
item: any;
i: any;

  constructor(private cartApi: CartAPIService) { }
  ngOnInit() {
    this.cartItems = this.cartApi.getCartItems();
    this.calculateTotalAmount()
  }
  calculateTotalAmount() {
    this.totalAmount= this.cartItems.reduce((total,item)=> total+(item.price*item.quantity),0)
  }
  removeProduct(product: Product) : void {
    this.cartApi.removeCartItem(product);
    this.calculateTotalAmount();
  }
}
