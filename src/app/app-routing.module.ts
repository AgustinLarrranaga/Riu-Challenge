import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: '', component: HeroesListComponent },
  { path: 'add', loadComponent: () => import('./pages/add-hero/add-hero.component').then(m => m.AddHeroComponent) }, 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
