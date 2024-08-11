import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from "../../components/product/product.component";
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

import { SidebarModule } from 'primeng/sidebar';
import Product from '../../Interfaces/product';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductComponent, FormsModule, SidebarModule, ButtonModule, SpinnerComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  loading: boolean = true
  products: any[] = []
  filterProduct: any[] = [];
  categoryProduct: any[] = [];
  sortedProduct: any[] = []
  productNow = 10;
  currentProduct = 1;
  totalProducts: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  priceRange: number = 0;
  minpriceRange: number = 0;
  searchTerm = '';
  hideButton: boolean = false;
  uniqueCategories: string[] = [];
  sidebarVisible: boolean = false;
  constructor(public router: Router, private _productsService: ProductsService) {
    this.getMoreProduct();
  }

  getMoreProduct() {
    this.loading = true
    this._productsService.getProductsRoute().subscribe({
      next: (res) => {
        this.totalProducts = res.data.length;
        this.filterProduct = res.data.filter((product: { category: { name: string; }; }) => product.category.name === "Women's Fashion");
        this.products = res.data.slice(0, this.productNow * this.currentProduct);
        this.minPrice = Math.min(...res.data.map((product: { price: any; }) => product.price));
        this.maxPrice = Math.max(...res.data.map((product: { price: any; }) => product.price));
        this.priceRange = this.maxPrice;
        this.minpriceRange = this.minPrice;
        this.categoryProduct = res.data;
        console.log(this.categoryProduct);
        this.getCategory();
        this.checkIfMoreProductsAvailable();
        this.loading = false
      },
      error(err) {
        console.log(err);

      }
    });
  }
  getCategory() {

    this.uniqueCategories = [...new Set(this.categoryProduct.map(product => product.category.name))];
    console.log(this.uniqueCategories);

  }


  filterProductsByName() {
    if (this.searchTerm) {
      this.products = this.products.filter(pro => pro.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.currentProduct = 1000;
      this.checkIfMoreProductsAvailable();
      this.hideButton = true;
    } else {
      this.getMoreProduct();
      this.productNow = 1;
    }
  }

  goToProductDetails(productid: any) {
    this.router.navigate(['/productDetails', productid]);
  }

  moreProduct() {
    this.currentProduct++;
    this.getMoreProduct();
  }
  checkIfMoreProductsAvailable() {
    this.hideButton = this.products.length >= this.totalProducts;
  }
  getProductByCategory(data: any) {
    this.currentProduct = 1000;
    this.products = this.categoryProduct.filter(pro => pro.category.name === data);
    this.hideButton = true;
  }


  sortByPriceAsc() {
    this.products.sort((a, b) => a.price - b.price)
    console.log(this.products, 'priceAsc')
  }
  sortByPriceDec() {
    this.products.sort((a, b) => b.price - a.price)
    console.log(this.products, 'priceDec')
  }
  sortByNameAsc() {
    this.products.sort((a, b) => a.title.localeCompare(b.title))
    console.log(this.products, 'nameAsc')
  }
  sortByNameDec() {
    this.products.sort((a, b) => b.title.localeCompare(a.title))
    console.log(this.products, 'nameDec')
  }
  getProductByPriceRange() {
    this.sortedProduct = this.categoryProduct.filter(product => product.price >= this.minPrice && product.price <= this.priceRange);
    this.products = this.sortedProduct.sort((a, b) => a.price - b.price)
    this.currentProduct = 1000;
    this.hideButton = true;
    this.checkIfMoreProductsAvailable();
  }

}

