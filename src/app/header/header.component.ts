import { Component } from '@angular/core';
import { CartAPIService } from '../services/cart-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cartApi: CartAPIService) {}

  getCartItemCount(): number {
    return this.cartApi.getCartItemCount();
  }
}
