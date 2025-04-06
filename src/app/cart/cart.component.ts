import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        this.cartService.updateQuantity(productId, item.quantity - 1);
      } else {
        this.cartService.removeFromCart(productId);  // Nếu số lượng = 0 thì xóa sản phẩm
      }
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  toggleSelection(productId: number): void {
    this.cartService.toggleSelection(productId);
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  checkout(): void {
    // In a real app, you would navigate to checkout page
    alert('Proceeding to checkout!');
    this.cartService.clearCart();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' ₫';
  }
}
