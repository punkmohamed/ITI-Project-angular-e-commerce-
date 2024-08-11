import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Register from '../../Interfaces/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''
  router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(100)]),
    password: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,12}$'))]),
    rePassword: new FormControl('', [Validators.required]),
    locations: new FormArray([
      new FormGroup({
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required),
      })
    ], Validators.required)
  }, { validators: this.passwordMatchValidator })

  constructor(private _authService: AuthService) {
  }
  get nameControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get ageControl(): FormControl {
    return this.registerForm.get('age') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get rePasswordControl(): FormControl {
    return this.registerForm.get('rePassword') as FormControl;
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

  get locations(): FormArray {
    return this.registerForm.get('locations') as FormArray;
  }

  addLocation() {
    this.locations.push(new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    }));
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
  }
  register() {
    console.log(this.registerForm);
    if (this.registerForm.valid == false) {
      this.registerForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.registerForm.reset()
          this.isLoading = false
          this.errorMessage = (res as any).message
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 3000)
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
