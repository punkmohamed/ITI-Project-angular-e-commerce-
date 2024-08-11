import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import Product from '../../Interfaces/product';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ToastModule, RippleModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [MessageService]
})
export class ContactComponent {

}
