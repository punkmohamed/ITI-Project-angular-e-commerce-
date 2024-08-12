import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor() { }
  _httpClient = inject(HttpClient)
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGVmZGY4ZWQwZGMwMDE2Yzk4Yjk1YSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMjM1NjI2LCJleHAiOjE3MzEwMTE2MjZ9.MSbIzRSJyXXjccmfr7zExwagBub2q2qYCJi7KVEbtKA";

  getOrders(): Observable<any> {
    const id = "668efdf8ed0dc0016c98b95a"
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }

}
