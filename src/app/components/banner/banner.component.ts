import { NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgFor],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  products: any[] = [];

  productsPerPage: number = 4;
  pages: any[] = [];


  constructor(private _productsService: ProductsService) {

  }
  ngOnInit() {
    this.getBranding();
  }
  paginateProducts() {
    const totalProducts = this.products.length;
    const totalPages = Math.ceil(totalProducts / this.productsPerPage);

    this.pages = Array.from({ length: totalPages }, (_, i) =>
      this.products.slice(i * this.productsPerPage, (i + 1) * this.productsPerPage)
    );
  }



  getBranding() {
    this._productsService.getBrannding().subscribe({
      next: (res) => {
        // console.log(res.data,'ddddddddddddddddddddd');
        this.products = res.data
        this.paginateProducts();


      }
    })
  }
}
