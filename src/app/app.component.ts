import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to our Brandportal';
  imgUrl = '../assets/images/mask.png';
  constructor() {
  }
  onHeadingChange(title) {
   this.title = title;
  }

  onImageChange(image) {
    this.imgUrl = image;
  }
}
