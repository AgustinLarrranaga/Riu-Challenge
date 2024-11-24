import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHeroButtonComponent } from './components/addHeroButton/add-hero-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    PaginatorComponent,
    SearchComponent,
    AddHeroButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
