import { Component } from '@angular/core';
import { CartAPIService } from '../services/cart-api.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productList: Product [] = [];
item: any;
  constructor(private cartAPI: CartAPIService) {}
  ngOnInit() {
    this.cartAPI.fetchProducts().subscribe(
        product => {
            console.log(product);
            this.productList = product;
        },
        error => {
            console.error('Error fetching products:', error); 
        }
    );
}

addToCart(product: Product): void{
  this.cartAPI.addToCart(product);
}
}
