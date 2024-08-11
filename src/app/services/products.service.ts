import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../Interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _httpClient = inject(HttpClient)


  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>('https://fakestoreapi.com/products')
  }
  getProductsRoute(): Observable<any> {
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/products')
  }
  getProductSpecfic(id: string): Observable<any> {
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getBrannding(): Observable<any> {
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
}
