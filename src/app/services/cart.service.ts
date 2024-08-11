import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartNumber = new BehaviorSubject<number>(0);
  numberofCart = this.cartNumber.asObservable();
  changeCart(data: number) {
    this.cartNumber.next(data);
  }
  _httpClient = inject(HttpClient)
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGVmZGY4ZWQwZGMwMDE2Yzk4Yjk1YSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMjM1NjI2LCJleHAiOjE3MzEwMTE2MjZ9.MSbIzRSJyXXjccmfr7zExwagBub2q2qYCJi7KVEbtKA";

  addToCart(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, { headers })
  }
  updateCart(count: any, productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.put<any>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
  }
  getCart(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/cart', { headers })
  }
  deleteCartOneProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
  }
  deleteTheCart(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>('https://ecommerce.routemisr.com/api/v1/cart', { headers })
  }
}
