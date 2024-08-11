import { Component, OnInit } from '@angular/core';
import Product from '../../Interfaces/product';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { WishListService } from '../../services/wish-list.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
@Component({
  selector: 'app-favorites-products',
  standalone: true,
  imports: [CommonModule, ToastModule, SpinnerComponent],
  templateUrl: './favorites-products.component.html',
  styleUrl: './favorites-products.component.css',
  providers: [MessageService]
})
export class FavoritesProductsComponent implements OnInit {
  loading: boolean = true;
  favoriteProducts: any[] = [];
  productitem: any[] = [];
  constructor(private _productsService: ProductsService, private _wishListService: WishListService,
    private messageService: MessageService, private _cartService: CartService,
  ) { }


  ngOnInit() {
    this.getWishList()
  }
  getWishList() {
    this.loading = true
    this._productsService.getProductsRoute().subscribe({
      next: (productsResponse) => {
        console.log('Products:', productsResponse);
        const products = productsResponse.data || [];
        this._wishListService.getWishList().subscribe({
          next: (wishlistResponse) => {
            console.log('Wishlist Response:', wishlistResponse);
            if (wishlistResponse && wishlistResponse.data && Array.isArray(wishlistResponse.data)) {
              const favoriteIds = wishlistResponse.data.map((item: { _id: string }) => item._id);
              this._wishListService.changeWish(favoriteIds.length);
              console.log('Favorite IDs:', favoriteIds);
              this.favoriteProducts = products.filter((product: { id: string }) => favoriteIds.includes(product.id));
              console.log('Filtered Products:', this.favoriteProducts);
            } else {
              console.log('Unexpected response format or empty wishlist:', wishlistResponse);
            }
            this.loading = false
          },
          error: (error) => {
            console.error('Error fetching wishlist:', error)
            this.loading = false
          }
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error)
        this.loading = false
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

  removeFromWishList(productId: string) {
    this._wishListService.removeFromWishList(productId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Product Added',
          detail: 'Product has been added to your Wishlist.'
        });
        this.getWishList()

      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
