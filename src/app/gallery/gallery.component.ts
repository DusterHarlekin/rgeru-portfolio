import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  constructor(public router: Router) {}

  swiperEl: any;
  galIndex: number = 0;
  galClasses: string[] = [];
  //SIMULANDO LA RESPUESTA DEL SERVIDOR
  resImg: any[] = [
    {
      url: 'https://media.discordapp.net/attachments/721986690348089355/1090025263989018755/goblin_slayer_party_by_rgeru_ddasf97-fullview.jpg?width=345&height=473',
    },
    {
      url: 'https://media.discordapp.net/attachments/721986690348089355/1090024759061909544/1.jpg?width=840&height=473',
    },
    {
      url: 'https://media.discordapp.net/attachments/721986690348089355/1090024761310064791/Shiro_back.jpg?width=335&height=473',
    },
    {
      url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/862709ca-72bf-416b-b93e-232254938832/der7r0v-2bf25529-9f01-47ea-8f40-1fd27ab87ea1.jpg/v1/fill/w_900,h_1274,q_75,strp/vladilena_milize_by_rgeru_der7r0v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI3NCIsInBhdGgiOiJcL2ZcLzg2MjcwOWNhLTcyYmYtNDE2Yi1iOTNlLTIzMjI1NDkzODgzMlwvZGVyN3Iwdi0yYmYyNTUyOS05ZjAxLTQ3ZWEtOGY0MC0xZmQyN2FiODdlYTEuanBnIiwid2lkdGgiOiI8PTkwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.yZXnYBW6Q6OucM1RVaOUR1BkWfJBTXWIDPrJDifzg1U',
    },
    {
      url: 'https://media.discordapp.net/attachments/721986690348089355/1090024956542324797/Hatsune_Miku_redo.jpg?width=669&height=473',
    },
    {
      url: 'https://media.discordapp.net/attachments/721986690348089355/1090024956982730933/Pawa.jpg?width=332&height=468',
    },
  ];

  ngOnInit() {
    //AQUI COMO CUANDO ME LLEGA LA RESPUESTA
    this.resImg = this.resImg.reverse();
    this.generateGallery();
  }

  ngAfterViewInit() {
    this.swiperEl = document.querySelector('swiper-container');
    //ASIGNAR SLIDES A SWIPER
    this.swiperEl.swiper.appendSlide(this.getSlides(this.resImg));
    console.log(this.swiperEl);
  }

  showImg(index: any) {
    this.swiperEl.swiper.slideToLoop(index);
  }

  //GENERAR ARRAY DE SLIDES SWIPER
  getSlides(array: any[]) {
    const imgUrls = [];
    for (const img of array) {
      imgUrls.push(`
      <swiper-slide>
        <div style="height: 100%; width: 100%; display: flex;">
          <img
          style="max-height: 100%; max-width: 100%; margin: auto;"
          src="${img.url}"
          
          />
        </div>
      </swiper-slide>
      `);
    }
    return imgUrls;
  }

  //GENERAR PATRON DE GALERIA CON CLASES SCSS
  generateGallery() {
    this.galClasses = [];
    for (let i = 0; i < this.resImg.length; i++) {
      if (this.galIndex == 0) this.galClasses.push('div-h div5');
      else {
        this.galClasses.push('div-v');
        if (this.galIndex == 4) {
          this.galIndex = -1;
        }
      }
      this.galIndex++;
    }
    this.galIndex = 0;
  }

  //PRUEBA CAMBIO GALERIA Y SLIDER
  chng() {
    console.log(this.swiperEl);
    this.resImg = this.resImg.reverse();

    this.swiperEl.swiper.removeAllSlides();

    this.swiperEl.swiper.appendSlide(this.getSlides(this.resImg));
  }
}
