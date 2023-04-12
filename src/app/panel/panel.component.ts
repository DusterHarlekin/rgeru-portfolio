import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  categories:any = [];
  images:any = [];
  firstOfCat:any=[];
  imgEdit:boolean = false; 

  constructor(protected readonly supabase: SupabaseService, private readonly formBuilder: FormBuilder){}

   

  addImgForm = this.formBuilder.group({
    url: ['', Validators.required],
    category_id: ['', Validators.required],
    isLatest: [false, Validators.required],
    isMature: [false, Validators.required]
  })

  updateImgForm = this.formBuilder.group({
    id: [''],
    url: ['', Validators.required],
    category_id: ['', Validators.required],
    isLatest: [false],
    isMature: [false]
  })

  ngOnInit(){
    this.getCategories();
  }

  async addImg(){
    console.log(this.addImgForm.value)
    try {
      const { data, error } = await this.supabase.addImg(this.addImgForm)
      if (error) throw error
      console.log(data)
      this.images.unshift(data[0])
      this.Toast.fire({
        icon: 'success',
        title: 'Imagen agregada con éxito'
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        this.Toast.fire({
          icon: 'error',
          title: 'Hubo un error: '+error.message
        })
      }
    } finally {
      //...
    }
  }

  async updateImg(){
    console.log(this.updateImgForm.value)
    try {
      const { data, error } = await this.supabase.updateImg(this.updateImgForm)
      if (error) throw error
      console.log(data)
      const pos = this.images.map((img: { id: any; }) => img.id).indexOf(data[0].id);
      this.images[pos] = data[0];
      this.Toast.fire({
        icon: 'success',
        title: 'Imagen actualizada con éxito'
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        this.Toast.fire({
          icon: 'error',
          title: 'Hubo un error: '+error.message
        })
      }
    } finally {
      //...
    }
  }

  deleteImg(imgId:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro de eliminar esta imagen? esto no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data, error } = await this.supabase.deleteImg(imgId)
          if (error) throw error
          console.log(data)
          const pos = this.images.map((img: { id: any; }) => img.id).indexOf(imgId)
          this.images.splice(pos, 1)
  
          this.Toast.fire({
            icon: 'success',
            title: 'Imagen eliminada con éxito'
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
            this.Toast.fire({
              icon: 'error',
              title: 'Hubo un error: '+error.message
            })
          }
        } finally {
          //...
        }


       
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  openModalPanel(img:any = null){
    this.addImgForm.reset();
    this.updateImgForm.reset();
    this.addImgForm.patchValue({isLatest: false, isMature: false})
    if(!img)
      this.imgEdit = false
    else{

      this.updateImgForm.setValue({id: img.id, url: img.url, category_id: img.category_id, isLatest: img.isLatest, isMature: img.isMature})
      this.imgEdit = true;
    }
  }

  getFirstImage(cat_id: string){
    let result = this.images.filter((img: { category_id: any; }) => {
      return img.category_id === cat_id
    })
   return result[0].url;
  }

  async getCategories(){
    try {
      const { data, error } = await this.supabase.getCategories()
      if (error) throw error
      this.categories = data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    } finally {
      this.getAllImg()
    }
  }
  async getAllImg(){
    try {
      const { data, error } = await this.supabase.getAllImg()
      if (error) throw error
      this.images = data;
      console.log(this.images);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    } finally {
      //...
      for (const cat of this.categories) {
        this.firstOfCat.push(this.getFirstImage(cat.id));
      }
      
    }
  }
}
