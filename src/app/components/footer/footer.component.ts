import { Component } from '@angular/core';
interface Image {
  imageURL: String
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  image: Image = {
    imageURL: 'assets/images/angular_wordmark_gradient.png'
  }
}
