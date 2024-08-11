import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  information: any
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''


  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.email]),
    age: new FormControl('', [Validators.min(16), Validators.max(100)]),
    password: new FormControl('', [Validators.pattern(new RegExp('^[A-Za-z0-9]{3,12}$'))]),
    rePassword: new FormControl(''),
  }, { validators: this.passwordMatchValidator })

  get nameControl(): FormControl {
    return this.updateForm.get('name') as FormControl;
  }
  get emailControl(): FormControl {
    return this.updateForm.get('email') as FormControl;
  }
  get ageControl(): FormControl {
    return this.updateForm.get('age') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.updateForm.get('password') as FormControl;
  }

  get rePasswordControl(): FormControl {
    return this.updateForm.get('rePassword') as FormControl;
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
  constructor(private _authService: AuthService) {
    this.getUserInformation()
  }

  getUserInformation() {
    this._authService.userInformation.subscribe({
      next: (res) => {
        console.log(res.user);
        this.information = res.user
        this.updateForm.setValue({
          name: res.user.name || '',
          email: res.user.email || '',
          age: res.user.age || '',
          password: '',
          rePassword: ''
        });
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  updateUserInformation(event: Event) {
    event.preventDefault()
    console.log(this.updateForm);
    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._authService.updateUserInformation(this.updateForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false
          this.errorMessage = (res as any).message
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
