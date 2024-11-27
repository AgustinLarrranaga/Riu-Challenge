import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero.model';
import { of } from 'rxjs';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;

  const mockHeroesCorto: Hero[] = [
    { id: 1, name: 'Superman', world: 'Earth', image: '', enemy: 'Lex Luthor', author: 'Jerry Siegel' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
  ];

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'loadHeroes', 
      'getHeroesByPage',
      'searchHeroesByName',
      'deleteHero',
      'getTotalPages'
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;

    heroesService.getHeroesByPage.and.returnValue(mockHeroesCorto);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los héroes en ngOnInit', async () => {
    heroesService.loadHeroes.and.returnValue(Promise.resolve());

    await component.ngOnInit();

    expect(heroesService.loadHeroes).toHaveBeenCalled();
    expect(heroesService.getHeroesByPage).toHaveBeenCalledWith(1)
    expect(component.heroes.length).toBeGreaterThan(0);
    expect(component.loading).toBeFalse();
  });

  it('debería cambiar la página de héroes al llamar a onPageChanged', () => {
    const page = 2;
    heroesService.getHeroesByPage.and.returnValue(mockHeroesCorto);

    component.onPageChanged(page);

    expect(heroesService.getHeroesByPage).toHaveBeenCalledWith(page);
    expect(component.heroes).toEqual(mockHeroesCorto);  
  });

  it('debería buscar héroes por nombre al llamar a onSearch', () => {
    const searchValue = 'Superman';
    heroesService.searchHeroesByName.and.returnValue(mockHeroesCorto);

    component.onSearch(searchValue);

    expect(heroesService.searchHeroesByName).toHaveBeenCalledWith(searchValue);
    expect(component.heroes.length).toBeGreaterThan(0);
    expect(component.paginatorDisable).toBeTrue();
  });


  it('debería cargar el listado de heroes de pagina 1 cuando no hay contenido en el searchvalue', () => {
    const searchValue = '';
    heroesService.getHeroesByPage.and.returnValue(mockHeroesCorto);

    component.onSearch(searchValue);

    expect(heroesService.getHeroesByPage).toHaveBeenCalledWith(1);
    expect(component.heroes.length).toBeGreaterThan(0);
    expect(component.paginatorDisable).toBeFalse();
  });


  it('debería eliminar un héroe al llamar a onDeleteHero', () => {
    const id = 1;
    heroesService.deleteHero.and.returnValue([
        { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    ]);
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeleteHero(id);

    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar a este héroe?');
    expect(heroesService.deleteHero).toHaveBeenCalledWith(id);
    expect(heroesService.getHeroesByPage).toHaveBeenCalledWith(1);
    expect(heroesService.getTotalPages).toHaveBeenCalled();

  });

  it(' no debería eliminar un héroe al llamar a onDeleteHero', () => {
    const id = 1;
    heroesService.deleteHero.and.returnValue([
        { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    ]);

    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeleteHero(id);

    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar a este héroe?');
    expect(heroesService.deleteHero).not.toHaveBeenCalledWith(id);
  });
});
