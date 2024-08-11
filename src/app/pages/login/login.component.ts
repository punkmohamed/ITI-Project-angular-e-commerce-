import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  route = inject(Router)
  isLoading: boolean = false
  errorMessage: string = ''
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,12}$'))])
  })


  constructor(private _authService: AuthService) {
  }
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    console.log(this.loginForm);

    if (this.loginForm.valid == false) {
      this.loginForm.markAllAsTouched()
    } else {
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = true
          this.errorMessage = ''
          console.log(res);
          this.loginForm.reset()
          this._authService.saveUserData(res.token)
          this.isLoading = false
          this.errorMessage = (res as any).message
          this.route.navigate(['home'])
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message
          this.isLoading = false
        }
      })
    }
  }
}

