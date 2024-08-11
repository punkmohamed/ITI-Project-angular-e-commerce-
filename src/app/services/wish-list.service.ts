import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor() { }
  _httpClient = inject(HttpClient)
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGVmZGY4ZWQwZGMwMDE2Yzk4Yjk1YSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMjM1NjI2LCJleHAiOjE3MzEwMTE2MjZ9.MSbIzRSJyXXjccmfr7zExwagBub2q2qYCJi7KVEbtKA";

  private wishlistNumber = new BehaviorSubject<number>(0);
  numberofWish = this.wishlistNumber.asObservable();
  changeWish(data: number) {
    this.wishlistNumber.next(data);
  }
  getWishList(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
  }


  addToWishList(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>('https://ecommerce.routemisr.com/api/v1/wishlist', { 'productId': productId }, { headers })
  }
  removeFromWishList(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
  }

}
