import { Component, OnInit, Inject } from '@angular/core';
import { Noticias } from 'src/app/models/noticias';
import { NoticiasService } from 'src/app/service/noticias.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  Noticias: Noticias[] = [];
  search: any;
  constructor( private NotService:NoticiasService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.NotService.AllNoticia().subscribe(datos => {
      this.Noticias = [];
      datos.forEach((element: any) => {
        this.Noticias.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }as Noticias);
      });
    });
  }

  async NewNoticia() {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva Noticia',
      html: `
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="autor" placeholder="autor" required>
        <label for="autor">Autor</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="titulo" placeholder="titulo" required>
        <label for="titulo">Titulo</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="contenido" placeholder="contenido" required>
        <label for="contenido">Contenido</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="fecha" placeholder="fecha" required>
        <label for="fecha">Fecha</label>
      </div>
      <select id="categoria" class="form-select" aria-label="Default select example">
        <option selected>Selecciona categoria</option>
        <option value="economica">Economica</option>
        <option value="cultural">Cultural</option>
        <option value="social">Social</option>
        <option value="cientifica">Cientifica</option>
      </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        let Not: Noticias = {
          autor: (<HTMLInputElement>document.getElementById('autor')).value,
          titulo: (<HTMLInputElement>document.getElementById('titulo')).value,
          contenido: (<HTMLInputElement>document.getElementById('contenido')).value,
          fecha: new Date((<HTMLInputElement>(document.getElementById('fecha'))).value),
          categoria: (<HTMLInputElement>document.getElementById('categoria')).value
        };
        return Not;
      },
    });
    if( formValues ) {
      this.NotService.NewNoticia(formValues);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Noticia Agregada',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  buscar(){
    this.NotService.search(this.search).snapshotChanges()
      .subscribe(serve=>{
        this.Noticias=
        serve.map((item:any)=>{
           return Object.assign(
            { 
              id:item.payload.doc.id,
              autor:item.payload.doc.data().autor,
              titulo:item.payload.doc.data().titulo,
              contenido:item.payload.doc.data().contenido,
              fecha:item.payload.doc.data().fecha,
              categoria:item.payload.doc.data().categoria,
            }
          );
        })
      });
  }

}
