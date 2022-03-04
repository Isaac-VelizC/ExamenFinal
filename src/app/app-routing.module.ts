import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { NoticiasComponent } from './components/noticias/noticias.component';

const routes: Routes = [
    { path: 'noticias', component: NoticiasComponent },
    { path: 'categoria', component: CategoriaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }