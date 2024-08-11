import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent {
  router = inject(Router)
  view() {
    this.router.navigate(['/products']);
  }
}
