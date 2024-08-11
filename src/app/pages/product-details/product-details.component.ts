import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import Product from '../../Interfaces/product';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';
import { MessageService } from 'primeng/api';
import { log } from 'console';
import { SpinnerComponent } from "../../components/spinner/spinner.component";


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ToastModule, SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [MessageService]
})
export class ProductDetailsComponent {
  loading: boolean = true
  product: any | undefined;
  route = inject(ActivatedRoute)
  router = inject(Router)
  similarProducts: Product[] = []
  constructor(public _productsService: ProductsService, private _cartService: CartService,
    private messageService: MessageService,
    private wishlistService: WishListService
  ) {
    // this.getProduct();
    this.getSpecficProduct()
    this.getProduct()
  }
  getProduct() {
    this.loading = true
    if (!this.product) return
    this._productsService.getProductsRoute().subscribe({
      next: (res) => {
        this.similarProducts = res.data.filter((product: { category: { _id: string }; id: string }) =>
          product.category._id === this.product.category._id && product.id !== this.product.id
        )
        console.log('Similar Products:', this.similarProducts);
        this.similarProducts = this.similarProducts.slice(0, 4);
        this.loading = false
      },
      error: (err) => {
        console.error('Error fetching products:', err)
        this.loading = false
      }
    });
  }
  goToProductDetails(productid: any) {
    this.router.navigate(['/productDetails', productid])
    this.getSpecficProduct()
  }
  getSpecficProduct() {
    this.loading = true
    const productid = String(this.route.snapshot.paramMap.get('id'))
    this._productsService.getProductSpecfic(productid).subscribe({
      next: (res) => {
        this.product = res.data
        this.getProduct()
        console.log(productid);
        console.log(res.data);
        this.loading = false
      }
    })
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

  addProductToCart(productId: string) {
    this._cartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Product has been added to your cart.'
        });
        this.getCart()
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product could not be added to your cart.'
        });
      }
    });
  }
  // this.route.queryParams.subscribe(params => {
  //   this.productid
  //   params['id']
  // });

}
