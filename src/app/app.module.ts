import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHeroButtonComponent } from './components/add-hero-button/add-hero-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({ declarations: [
        AppComponent,
        HeroesListComponent,
        PaginatorComponent,
        SearchComponent,
        AddHeroButtonComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
