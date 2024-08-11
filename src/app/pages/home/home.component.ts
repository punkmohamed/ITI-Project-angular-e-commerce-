import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderComponent } from "../../components/slider/slider.component";
import Product from '../../Interfaces/product';
import { ProductComponent } from "../../components/product/product.component";
import { CategorySectionComponent } from "../../components/category-section/category-section.component";
import { ProductsService } from '../../services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';
import { ContactComponent } from "../contact/contact.component";
import { ReviewsUsersComponent } from "../../components/reviews-users/reviews-users.component";
import { BannerComponent } from "../../components/banner/banner.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, ProductComponent, CategorySectionComponent, CarouselModule, ButtonModule, TagModule, ToastModule, ContactComponent, ReviewsUsersComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  responsiveOptions: any[] = [];
  constructor(private router: Router, private _productsService: ProductsService, private messageService: MessageService,
    private _cartService: CartService,
    private wishlistService: WishListService
  ) { }

  ngOnInit() {
    this._productsService.getProductsRoute().subscribe({
      next: (res) => {
        this.products = res.data
        this.responsiveOptions = [
          {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
          },
          {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
          },
          {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
          }
        ];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  viewAll() {
    this.router.navigate(['/products']);
  }

  addToWishlist(productId: string) {
    this.wishlistService.addToWishList(productId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Product has been added to your Wishlist.'
        });
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
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
