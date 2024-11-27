import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHeroComponent } from './add-hero.component';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroFormComponent } from 'src/app/components/hero-form/hero-form.component';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['addHero']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [AddHeroComponent, HeroFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería agregar un héroe y redirigir a la página principal al guardar', () => {
    const newHero: Hero =  { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' }
    spyOn(window, 'alert');  

    component.onSave(newHero);

    expect(heroesService.addHero).toHaveBeenCalledWith(newHero);
    expect(window.alert).toHaveBeenCalledWith('¡Héroe agregado exitosamente!');
    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });
});
