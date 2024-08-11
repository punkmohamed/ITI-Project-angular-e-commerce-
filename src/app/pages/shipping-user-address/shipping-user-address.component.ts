import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shipping-user-address',
  standalone: true,
  imports: [],
  templateUrl: './shipping-user-address.component.html',
  styleUrl: './shipping-user-address.component.css'
})
export class ShippingUserAddressComponent {
  information: any = {
    city: '',
    zip: '',
    country: ''
  };

  constructor(public _authService: AuthService) {
    this.getUserInformation()
  }

  getUserInformation() {
    this._authService.userInformation.subscribe({
      next: (res) => {
        if (res.user.locations.length > 0) {
          this.information = res.user.locations[0];
        }
        console.log(this.information.city);
        console.log(this.information);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
