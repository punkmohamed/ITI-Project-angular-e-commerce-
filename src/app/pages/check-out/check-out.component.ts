import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../services/check-out.service';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  providers: [MessageService]
})
export class CheckOutComponent {
  route = inject(ActivatedRoute);
  information: any;
  showErrors = false;
  isLoading = false;
  errorMessage = '';
  cartId = String(this.route.snapshot.paramMap.get('id'));
  userShippingAddress: any;

  updateForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(
    private checkOutService: CheckOutService,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  get detailsControl(): FormControl {
    return this.updateForm.get('details') as FormControl;
  }

  get cityControl(): FormControl {
    return this.updateForm.get('city') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.updateForm.get('phone') as FormControl;
  }

  checkOutPayment(event: Event, cartId: string): void {
    event.preventDefault();
    this.updateForm.markAllAsTouched();

    if (this.updateForm.invalid) {
      this.showErrors = true;
    } else {
      this.isLoading = true;
      this.errorMessage = '';

      this.checkOutService.checkOutSession(cartId, this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Data updated',
            detail: 'Your checkout details have been updated successfully.'
          });
          this.isLoading = false;
          this.navi((res as any).session.url);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update failed',
            detail: 'Failed to update checkout details. Please try again.'
          });
          this.isLoading = false;
        }
      });
    }
  }

  navi(url: string): void {
    window.location.href = url;
  }
}
