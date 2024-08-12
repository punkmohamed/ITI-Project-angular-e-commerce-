import { Component } from '@angular/core';

import { OrdersService } from './../../services/orders.service';
import { log } from 'console';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {

  orders: any = []
  constructor(private _orderService: OrdersService) {
    this.getOrders()
  }



  getOrders() {
    this._orderService.getOrders().subscribe({
      next: (res) => {
        console.log(res)
        this.orders = res


      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
