import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''
  router = inject(Router)
  route = inject(ActivatedRoute)
  email: string = ''
  token: string = ''
  activatedRoute = inject(ActivatedRoute);
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,12}$'))]),
    rePassword: new FormControl('', [Validators.required]),

  }, { validators: this.passwordMatchValidator })

  constructor(private _authService: AuthService) {
  }



  get passwordControl(): FormControl {
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get rePasswordControl(): FormControl {
    return this.resetPasswordForm.get('rePassword') as FormControl;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) {
      return null;
    }

    if (password.value !== rePassword.value) {
      rePassword.setErrors({ passwordMismatch: true });
    } else {
      rePassword.setErrors(null);
    }

    return null;
  }
  // this.route.queryParams.subscribe(params => {
  //   this.email
  //   params['email']
  // });

  resetPassword() {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.email = params['email'];
    // });
    this.token = String(this.route.snapshot.paramMap.get('token'))
    console.log(this.token);
    console.log(this.resetPasswordForm);
    if (this.resetPasswordForm.valid == false) {
      this.resetPasswordForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._authService.resetPasswordEmail(this.token, this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.errorMessage = ''
          console.log(res);
          this.resetPasswordForm.reset()
          this.isLoading = false
          this.errorMessage = (res as any).message
          this.router.navigate(['login'])
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
