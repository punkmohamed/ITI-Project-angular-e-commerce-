import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLinkActive, SpinnerComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [MessageService, ProgressSpinnerModule]
})
export class CartComponent implements OnInit {
  cart: any = []
  totalPrice: number = 0
  cartId: any
  loading: boolean = true;
  constructor(public router: Router,
    private _cartService: CartService,
    private messageService: MessageService
  ) {
  }
  goToProductDetails(productid: any) {
    this.router.navigate(['/productDetails', productid])
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.loading = true
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res.data.totalCartPrice);
        this.cartId = res.data._id
        this.cart = res.data.products;
        this.totalPrice = res.data.totalCartPrice
        this._cartService.changeCart(res.data.products.length)
        this.loading = false
        if (res.success) {
          console.log("Cart fetched successfully")
        } else {
          console.log("Error fetching cart")
        }
      },
      error: (error) => {
        console.log(error)
        this.loading = false
      }
    });
  }

  updateCart(count: any, productId: string) {
    this._cartService.updateCart(count, productId).subscribe({
      next: (res) => {
        this.cart = res.data.products;
        this.totalPrice = res.data.totalCartPrice
        console.log(res);
        if (res.success) {
          console.log("Cart updated successfully");
        } else {
          console.log("Error updating cart");
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  removeCart() {
    this._cartService.deleteTheCart().subscribe({
      next: (res) => {
        this.cart = []
        this._cartService.changeCart(0)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addProductToCart(productId: string) {
    this._cartService.addToCart(productId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log("Product added to cart successfully");
          this.getCart();
        } else {
          console.log("Error adding product to cart");
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  removeProduct(productId: string) {
    this._cartService.deleteCartOneProduct(productId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Product Removed',
          detail: 'Product has been removed from your cart.'
        });
        this.getCart();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to remove product from cart.'
        });
      }
    });
  }
}
