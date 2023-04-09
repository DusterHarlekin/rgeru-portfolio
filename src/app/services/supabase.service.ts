import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: any
  private session:any
  constructor(private router:Router) {
    this.supabase = createClient(environment.URL, environment.KEY)
  }

  signIn(email:string, password:string){
    return this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }

  async signOut(){
    const { error } = await this.supabase.auth.signOut()
    this.router.navigate(['/login']);
  }

  getSession(){
    return this.session;
  }

  watch(){
    this.supabase.auth.onAuthStateChange((event:any, session:any) => {
      //CONTROL DE PAGE PARA LOGIN
      if (!session) {
        if (this.router.url.includes('/panel'))
          this.router.navigate(['/login']);
      } else if (this.router.url == '/login') {
        this.router.navigate(['/panel']);
      }
      this.session = session;
    });
  }
}
