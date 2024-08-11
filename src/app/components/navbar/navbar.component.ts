import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from './../../services/favorites.service';
import { ProductsService } from '../../services/products.service';
import { WishListService } from './../../services/wish-list.service';
import { CartService } from '../../services/cart.service';
import Product from '../../Interfaces/product';
interface Image {
  imageURL: string
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  route = inject(Router)
  isLoggedIn: boolean = false
  favoriteProducts: Product[] = [];
  wishListNumber: number = 0;
  cartNumber: number = 0;
  cart: Product[] = [];
  userInformation: any
  image: Image = {
    imageURL: 'assets/images/angular_wordmark_gradient.png'
  }
  constructor(private _authService: AuthService,
    private _productsService: ProductsService,
    private _wishListService: WishListService,
    private _cartService: CartService,) {

  }
  ngOnInit(): void {
    this.userLoggedIn();
    this.getUserInformation()
    this.getWishList()
    this.getCart()
    this._wishListService.numberofWish.subscribe((number) => {
      this.wishListNumber = number;
    });
    this._cartService.numberofCart.subscribe((number) => {
      this.cartNumber = number;
    });
  }
  getWishList() {
    this._productsService.getProductsRoute().subscribe({
      next: (productsResponse) => {
        console.log('Products:', productsResponse);
        const products = productsResponse.data || [];
        this._wishListService.getWishList().subscribe({
          next: (wishlistResponse) => {
            console.log('Wishlist Response:', wishlistResponse);
            if (wishlistResponse && wishlistResponse.data && Array.isArray(wishlistResponse.data)) {
              const favoriteIds = wishlistResponse.data.map((item: { _id: string }) => item._id);
              this._wishListService.changeWish(favoriteIds.length)
              console.log('Favorite IDs:', favoriteIds);
              this.favoriteProducts = products.filter((product: { id: string }) => favoriteIds.includes(product.id));
              console.log('Filtered Products:', this.favoriteProducts);
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

  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res.data.totalCartPrice);
        console.log(res.data.products.length);
        this.cart = res.data.products;
        this._cartService.changeCart(res.data.products.length)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  userLoggedIn() {
    this._authService.loggedInUser.subscribe(res => {
      if (res) {
        this.isLoggedIn = res ? true : false
      } else {
        this.isLoggedIn = false
      }
    })
  }
  getUserInformation() {
    this._authService.userInformation.subscribe({
      next: (res) => {
        console.log(res.user);
        this.userInformation = res.user
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  Logout() {
    this._authService.Logout()
  }
}


