import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Noticias as Coleccion } from '../models/noticias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private fdb: AngularFirestore) { }

  NewNoticia(noticia: any) {
    return  this.fdb.collection<Coleccion>('noticias').doc().set(Object.assign({},noticia));
  }

  AllNoticia(): Observable<any> {
    return this.fdb.collection<Coleccion>('noticias', ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
  }

  search(query:any){
    if(query==''){
      return this.fdb.collection('noticias');
    }
    let searchTerm=query.toLocaleLowerCase();
    let strlength = searchTerm.length;
    let strFrontCode = searchTerm.slice(0, strlength-1);
    let strEndCode = searchTerm.slice(strlength-1, searchTerm.length);
      
    let endCode = strFrontCode + Date.parse(strEndCode.charCodeAt(0) + 1);
    return this.fdb.collection('noticias',
      ref=>
      ref.where('fecha','>=',query).where('fecha','<',endCode)
      );
  }

  Catcultural(){
    return this.fdb.collection('noticias', ref => ref.where('categoria', '==', 'cultural')).snapshotChanges();
  }

  CatEconomica(){
    return this.fdb.collection('noticias', ref => ref.where('categoria', '==', 'economica')).snapshotChanges();
  }
 
  CatSocial(){
    return this.fdb.collection('noticias', ref => ref.where('categoria', '==', 'social')).snapshotChanges();
  }

  CatCientifica(){
    return this.fdb.collection('noticias', ref => ref.where('categoria', '==', 'cientifica')).snapshotChanges();
  }

}
