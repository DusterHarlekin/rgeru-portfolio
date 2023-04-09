import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  constructor(protected readonly supabase: SupabaseService){}


}
