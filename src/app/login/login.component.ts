import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private readonly supabase:SupabaseService,
    private readonly formBuilder: FormBuilder){}
  signInForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  async onSubmit(){
    try {
      const { error } = await this.supabase.signIn(this.signInForm.value.email as string, this.signInForm.value.password as string)
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
    }

  }

}
