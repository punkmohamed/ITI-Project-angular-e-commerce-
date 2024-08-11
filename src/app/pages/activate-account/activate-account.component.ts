import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  token: string = ''
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;

  constructor(private _authService: AuthService) {
    this.ActivatedAccount();
  }

  ActivatedAccount() {
    this.token = String(this.route.snapshot.paramMap.get('token'));
    this._authService.activateTheAccount(this.token).subscribe({
      next: (res) => {
        console.log(res);
        const message = (res as any).message;

        if (message === "Your account is activated") {
          this.successMessage = message;
          this.showSuccessModal = true;
        } else {
          this.errorMessage = message;
          this.showErrorModal = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message || 'An error occurred'; // Provide a default message
        this.showErrorModal = true;
      },
    });
  }
}
