import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { SupabaseService } from './services/supabase.service';
import { LangService } from './services/lang.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private supabase:SupabaseService, private lang: LangService) {}
  title = 'RGeru';
  ngOnInit() {
    //INICIALIZAR SWIPER
    register();
    

    this.supabase.watch()
  }

  onActivate(event: Event) {
    window.scroll({
      top: 0,
      left: 0,
    });

  }
}
