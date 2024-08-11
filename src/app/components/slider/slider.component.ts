import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Banners {
  bannerName: string,
  bannerInfo: string,
  bannerImage: string
}
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  banner: Banners[] = [
    {
      "bannerName": "Level Up Your Gaming Experience",
      "bannerInfo": "Browse our latest collection of games and get ready to level up your gaming experience!",
      "bannerImage": "assets/images/1.jpg"
    },
    {
      "bannerName": "80% OFF on Top Games",
      "bannerInfo": "Don't miss out on this amazing opportunity to get your favorite games at unbeatable prices!",
      "bannerImage": "assets/images/2.jpg"
    },
    {
      "bannerName": "New Releases Alert!",
      "bannerInfo": "Stay ahead of the game with our latest releases! Explore our collection of new games and discover your next favorite title.",
      "bannerImage": "assets/images/3.jpg"
    }
  ]

}
