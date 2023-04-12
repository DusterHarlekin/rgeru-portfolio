import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: any
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

 getCategories(){
    /*
    const result = await this.supabase
      .from('tasks')
      .select()
      .eq('userId', user?.id)
      .eq('done', done)
      .order('id', { ascending: true });
    console.log(result);
    console.log(result.data);
    */

    return this.supabase
      .from('categories')
      .select()
      .order('id', { ascending: false });
  }

  getAllImg(){
    return this.supabase
    .from('images')
    .select()
    .order('id', { ascending: false });
  }

  addImg(addImgForm: any){
    return this.supabase
    .from('images')
    .insert({ url: addImgForm.value.url, category_id: addImgForm.value.category_id, isLatest: addImgForm.value.isLatest, isMature: addImgForm.value.isMature})
    .select()
  }

  updateImg(updateImgForm: any){
    return this.supabase
    .from('images')
    .update({ url: updateImgForm.value.url, category_id: updateImgForm.value.category_id, isLatest: updateImgForm.value.isLatest, isMature: updateImgForm.value.isMature})
    .eq('id', updateImgForm.value.id)
    .select()
  }

  deleteImg(imgId:number){
    
    return this.supabase
    .from('images')
    .delete()
    .eq('id', imgId)

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
