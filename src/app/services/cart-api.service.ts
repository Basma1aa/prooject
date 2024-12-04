import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { NotificationService } from './notification.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartAPIService {
  private cartItems: Product[] = [];
  private storageKey = 'cartItems';

  constructor(
    private http: HttpClient, 
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCartItems();
  }

  private loadCartItems() {
    if (isPlatformBrowser(this.platformId)) {
      const storedItems = localStorage.getItem(this.storageKey);
      if (storedItems) {
        this.cartItems = JSON.parse(storedItems);
      }
    }
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.notificationService.showSuccess(`${product.title} already in the cart. Quantity Updated: ${existingItem.quantity}`); 
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
      this.notificationService.showSuccess(`${product.title} added to the cart`);
    }
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  removeCartItem(product: Product): void {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) { // Corrected from index !== 1 to index !== -1
      this.cartItems.splice(index, 1);
      this.notificationService.showSuccess('Product removed from the cart');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems)); // Update localStorage after removing
      }
    } else {
      this.notificationService.showSuccess('Product not found in the cart');
    }
  }
}
