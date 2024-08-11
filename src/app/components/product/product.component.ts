import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import Product from '../../Interfaces/product';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProductsService } from '../../services/products.service';
import { ToastModule } from 'primeng/toast';
import { WishListService } from './../../services/wish-list.service';
import { CartService } from './../../services/cart.service';
import { log } from 'console';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, ToastModule, RippleModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent {
  @Input() product!: Product
  wishlist: Product[] = [];
  cart: Product[] = []
  constructor(public router: Router,
    private messageService: MessageService,
    private wishlistService: WishListService,
    private _cartService: CartService,
    private _productsService: ProductsService
  ) {
  }
  goToProductDetails(productid: any) {
    this.router.navigate(['/productDetails', productid])
  }
  getWishList() {
    this._productsService.getProductsRoute().subscribe({
      next: (productsResponse) => {
        console.log('Products:', productsResponse);
        const products = productsResponse.data || [];
        this.wishlistService.getWishList().subscribe({
          next: (wishlistResponse) => {
            console.log('Wishlist Response:', wishlistResponse);
            if (wishlistResponse && wishlistResponse.data && Array.isArray(wishlistResponse.data)) {
              const favoriteIds = wishlistResponse.data.map((item: { _id: string }) => item._id);
              this.wishlistService.changeWish(favoriteIds.length);
            } else {
              console.log('Unexpected response format or empty wishlist:', wishlistResponse);
            }
          },
          error: (error) => {
            console.error('Error fetching wishlist:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  addToWishlist(productId: string) {
    this.wishlistService.addToWishList(productId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Product has been added to your Wishlist.'
        })
        this.getWishList()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this._cartService.changeCart(res.data.products.length)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addProductToCart(productId: string) {
    this._cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Product has been added to your cart.'
        })
        this.getCart()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  hasHalfStar(rating: number): boolean {
    return Math.floor(rating) !== rating;
  }
  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.ceil(rating)).fill(0);
  }
}
