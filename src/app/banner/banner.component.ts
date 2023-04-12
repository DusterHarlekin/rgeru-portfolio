import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  constructor(public router: Router, protected lang: LangService) {
  }
  selContent: any = {}
  enContent = {
    banHi: 'Hi!',
    banPres: "I'M RGERU",
    banDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore voluptatum reprehenderit magni vel vero laboriosam atque",
    banBtn: 'GALLERY',
    banGal: 'Gallery',
    banGalDesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore voluptatum reprehenderit magni vel vero laboriosam atque'
  }
  esContent = {
    banHi: 'Hey!',
    banPres: "SOY RGERU",
    banDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore voluptatum reprehenderit magni vel vero laboriosam atque",
    banBtn: 'GALERIA',
    banGal: 'Galería',
    banGalDesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore voluptatum reprehenderit magni vel vero laboriosam atque'
  }

  ngOnInit(){
    if(this.lang.lang == 'es')
      this.selContent = this.esContent;
    else
      this.selContent = this.enContent
  }
}
