import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { HeroesService } from 'src/app/services/heroes.service';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getTotalPages']);

    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [{ provide: HeroesService, useValue: heroesServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    mockHeroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('debería incrementar currentPage y emitir pageChanged al llamar a nextPage si no está deshabilitado', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    component.disable = false;

    spyOn(component.pageChanged, 'emit');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('no debería cambiar currentPage ni emitir pageChanged al llamar a nextPage si está deshabilitado', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    component.disable = true;

    spyOn(component.pageChanged, 'emit');

    component.nextPage();

    expect(component.currentPage).toBe(1);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('no debería cambiar currentPage ni emitir pageChanged al llamar a nextPage si ya está en la última página', () => {
    component.totalPages = 5;
    component.currentPage = 5;
    component.disable = false;

    spyOn(component.pageChanged, 'emit');

    component.nextPage();

    expect(component.currentPage).toBe(5);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('debería decrementar currentPage y emitir pageChanged al llamar a previousPage si no está deshabilitado', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    component.disable = false;

    spyOn(component.pageChanged, 'emit');

    component.previousPage();

    expect(component.currentPage).toBe(2);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('no debería cambiar currentPage ni emitir pageChanged al llamar a previousPage si está deshabilitado', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    component.disable = true;

    spyOn(component.pageChanged, 'emit');

    component.previousPage();

    expect(component.currentPage).toBe(3);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('no debería cambiar currentPage ni emitir pageChanged al llamar a previousPage si ya está en la primera página', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    component.disable = false;

    spyOn(component.pageChanged, 'emit');

    component.previousPage();

    expect(component.currentPage).toBe(1);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });
});
