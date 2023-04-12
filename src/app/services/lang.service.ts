import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang: string = 'en';
  constructor() { }
}
