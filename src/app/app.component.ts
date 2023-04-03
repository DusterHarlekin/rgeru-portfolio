import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rgeru-portfolio';

  ngOnInit(){
    register()
  }
}
