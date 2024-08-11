import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  router = inject(Router)
  isLoading: boolean = false
  errorMessage: string = ''
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  constructor(private _authService: AuthService) {
  }
  get emailControl(): FormControl {
    return this.emailForm.get('email') as FormControl
  }
  forgotPassword(event: Event) {
    event.preventDefault();
    console.log(this.emailForm);
    if (this.emailForm.valid == false) {
      this.emailForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._authService.forgotPasswordEmail(this.emailForm.value).subscribe({
        next: (res) => {
          this.errorMessage = ''
          console.log(res);
          this.emailForm.reset()
          this.isLoading = false
          this.errorMessage = (res as any).message
        }, error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message
          this.isLoading = false
        }
      })
    }
  }
}
