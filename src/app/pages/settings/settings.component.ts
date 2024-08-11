import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  information: any
  constructor(private _authService: AuthService) {
    this.getUserInformation()
  }

  getUserInformation() {
    this._authService.userInformation.subscribe({
      next: (res) => {
        if (res.user.locations && res.user.locations.length > 0) {
          const location = res.user.locations[0];
          this.information = {
            city: location.city || '',
            zip: location.zip || '',
            address: location.address || ''
          };
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
