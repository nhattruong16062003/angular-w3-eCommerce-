import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  faShoppingCart = faShoppingCart;

  cartItemCount$ = this.cartService.cart$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}