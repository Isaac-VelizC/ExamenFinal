import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/service/noticias.service';
import { Noticias } from 'src/app/models/noticias';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  cultural: Noticias[] = [];
  economica: Noticias[] = [];
  social: Noticias[] = [];
  cientifica: Noticias[] = [];
  constructor( private NotService: NoticiasService) { }

  ngOnInit(): void {
    this.cutural();
    this.Economica();
    this.Social();
    this.Cientifica();
  }

  cutural(){
    this.NotService.Catcultural().subscribe(datos => {
      this.cultural = [];
      datos.forEach((element: any) => {
        this.cultural.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }as Noticias);
      });
    });
  }

  Economica(){
    this.NotService.CatEconomica().subscribe(datos => {
      this.economica = [];
      datos.forEach((element: any) => {
        this.economica.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }as Noticias);
      });
    });
  }
  Social(){
    this.NotService.CatSocial().subscribe(datos => {
      this.social = [];
      datos.forEach((element: any) => {
        this.social.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }as Noticias);
      });
    });
  }
  Cientifica(){
    this.NotService.CatCientifica().subscribe(datos => {
      this.cientifica = [];
      datos.forEach((element: any) => {
        this.cientifica.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }as Noticias);
      });
    });
  }
}
