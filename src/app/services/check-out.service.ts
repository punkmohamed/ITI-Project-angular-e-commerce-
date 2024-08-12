import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor() { }
  _httpClient = inject(HttpClient)
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGVmZGY4ZWQwZGMwMDE2Yzk4Yjk1YSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMjM1NjI2LCJleHAiOjE3MzEwMTE2MjZ9.MSbIzRSJyXXjccmfr7zExwagBub2q2qYCJi7KVEbtKA";

  checkOutSession(cartId: string, shippingAddress: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, shippingAddress, { headers })
  }

}
