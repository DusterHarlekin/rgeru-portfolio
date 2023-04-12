import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public router: Router, protected readonly supabase: SupabaseService, protected lang: LangService) {}

  selContent : any = {};

  esContent = {
    navHome: 'INICIO',
    navGal: 'GALERIA',
    navContact: 'CONTACTO',
    navLang: {
      name: 'IDIOMA',
      opt1: 'Inglés',
      opt2: 'Español'
    }
  };

  enContent = {
    navHome: 'HOME',
    navGal: 'GALLERY',
    navContact: 'CONTACT',
    navLang: {
      name: 'LANGUAGE',
      opt1: 'English',
      opt2: 'Spanish'
    }
  };

  ngOnInit() {
    if(this.router.url.includes('/es'))
      this.lang.lang = 'es'
    else{
      this.lang.lang = 'en'
      console.log('aaaaaaaaaa')
    }
    if(this.lang.lang == 'es')
      this.selContent = this.esContent;
    else
      this.selContent = this.enContent
    this.loadSelected();
    console.log(this.supabase.getSession());
    console.log(this.selContent)
  }
  //SELECCION DINAMICA DEL NAV CON RUTAS SIN RECARGA DE PAGINA
  loadSelected() {
    const navLinks: any = document.getElementsByClassName('rg-item');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove('rg-selected');
    }
    console.log(navLinks);
    console.log(this.router.url);
    if (this.router.url.includes('/home')) {
      navLinks[0].classList.remove('rg-nav-link');
      navLinks[0].classList.add('rg-selected');
    } else if (this.router.url.includes('/gallery')) {
      navLinks[1].classList.remove('rg-nav-link');
      navLinks[1].classList.add('rg-selected');
    } else if (this.router.url.includes('contact')) {
      navLinks[2].classList.remove('rg-nav-link');
      navLinks[2].classList.add('rg-selected');
    }
  }

  chngLang(lang:string){
    this.lang.lang = lang;
    this.router.navigate(['/home/'+lang])
  }
}
