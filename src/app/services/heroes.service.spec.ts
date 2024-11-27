
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../models/hero.model';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  const mockHeroesCorto: Hero[] = [
    { id: 1, name: 'Superman', world: 'Earth', image: '', enemy: 'Lex Luthor', author: 'Jerry Siegel' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
  ];


  const mockHeroesLargo: Hero[] = [
    { id: 1, name: 'Superman', world: 'Earth', image: '', enemy: 'Lex Luthor', author: 'Jerry Siegel' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('total pages devuelve 1 si hay menos de 12 heroes', () => {
    service['heroes'] = mockHeroesCorto;
    const value = service.getTotalPages()
    expect(value).toBe(1);
  });


  it('total pages devuelve >1 si hay menos de 12 heroes', () => {
    service['heroes'] = mockHeroesLargo;
    const value = service.getTotalPages()
    expect(value).toBe(2);
  });



  it('siempre debe devolver 12 heroes maximo por pagina', () => {
    service['heroes'] = mockHeroesLargo;
    const value = service.getHeroesByPage(1)
    expect(value.length).toBe(12)
  });

  it('preuba de que devuelva menos heroes para la pagina 2', () => {
    service['heroes'] = mockHeroesLargo;
    const value = service.getHeroesByPage(2)
    expect(value.length).toBe(8)
  });


  it('preuba de que no devuelva  heroes para la pagina 122', () => {
    service['heroes'] = mockHeroesLargo;
    const value = service.getHeroesByPage(122)
    expect(value.length).toBe(0)
  });

  it('debe devolver el listado que hay en la variable heroes', () => {
    service['heroes'] = mockHeroesCorto;
    const value = service.getAllHeroes()
    expect(value).toEqual(mockHeroesCorto)
  });


  it('debe devolver el heroe con id 1', () => {
    service['heroes'] = mockHeroesCorto;
    const value = service.getHeroById(1)
    expect(value).toEqual(mockHeroesCorto[0])
  });

  it('debe devolver null cuando no existe el id', () => {
    service['heroes'] = mockHeroesCorto;
    const value = service.getHeroById(102)
    expect(value).toEqual(null)
  });



  it('debe agregar un nuevo heroe al listado y llamar a los metodos pertinentes', () => {
    const mockHeroesCortos: Hero[] = [
      { id: 1, name: 'Superman', world: 'Earth', image: '', enemy: 'Lex Luthor', author: 'Jerry Siegel' },
      { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' },
    ];
    service['heroes'] = mockHeroesCortos;
    const newHero = { id: 22, name: 'Batmoon', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' }
    spyOn(service, 'getNewId').and.returnValue(22);
    spyOn(service, 'saveHeroes')

    service.addHero(newHero)

    expect(service['heroes'].includes(newHero)).toBeTrue()
  });


  it('no debe llamar al saveheroes si no encuentra el id del heroe modificado', () => {
    service['heroes'] = mockHeroesCorto;
    const newHero = { id: 822, name: 'Batmoon', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' }
    const spy = spyOn(service, 'saveHeroes')

    service.updateHero(newHero)

    expect(spy).not.toHaveBeenCalled()
  });



  it('debe llamar al metodo saveHeroes  y actualizar el listado, al modifcar', () => {
    service['heroes'] = mockHeroesCorto;
    const updatedHero = { id: 2, name: 'Batmoon', world: 'tierra', image: '', enemy: 'Joker', author: 'Bob Kane' }
    const spy = spyOn(service, 'saveHeroes')

    service.updateHero(updatedHero)

    expect(spy).toHaveBeenCalled()
    expect(service['heroes'][1]).toEqual(updatedHero)

  });


  it('Debe borrar al heroe del listado', () => {
    service['heroes'] = mockHeroesCorto;
    const oldLength = mockHeroesCorto.length
    const heroToDelete = { id: 2, name: 'Batman', world: 'Earth', image: '', enemy: 'Joker', author: 'Bob Kane' }
    const spy = spyOn(service, 'saveHeroes')

    const newArray = service.deleteHero(2)

    expect(spy).toHaveBeenCalled()
    expect(service['heroes'].includes(heroToDelete)).toBeFalse()
    expect(oldLength).toBeGreaterThan(newArray.length)
  });

  it('NO Debe borrar al heroe del listado si este no existe', () => {
    service['heroes'] = mockHeroesCorto;
    const oldLength = mockHeroesCorto.length
    const spy = spyOn(service, 'saveHeroes')

    const newArray = service.deleteHero(5)

    expect(spy).toHaveBeenCalled()
    expect(oldLength).toEqual(newArray.length)
  });


  it('Debe devovler 1 heroe cuando se busca super', () => {
    service['heroes'] = mockHeroesCorto;
    const filtrados = service.searchHeroesByName('super')
    expect(filtrados.length).toEqual(1)
  });

  xit('Debe devovler 2 heroe cuando se busca man', () => {
    service['heroes'] = mockHeroesCorto;
    const filtrados = service.searchHeroesByName('man') 
    expect(filtrados.length).toEqual(2)
  });


  it('saveHeroes debe llamar al local storage set item', () => {
    const spy = spyOn(localStorage, 'setItem')

    service.saveHeroes()
    expect(spy).toHaveBeenCalledWith('heroes', JSON.stringify(service['heroes']))
  });

  it('getNewId debe devolver 1 si no hay heroes aun', () => {
    service['heroes'] = [];
    const newId = service.getNewId()
    expect(newId).toEqual(1)
  });

  it('getNewId debe devolver 1 si no hay heroes aun', () => {
    service['heroes'] = mockHeroesCorto;
    const newId = service.getNewId()
    expect(newId).toEqual(3)
  });

  it('debe llamar al setAllGEroes cuando no hay nada en el localstorage', async () => {
    const spy = spyOn(service, 'setAllHeroes').and.returnValue(Promise.resolve());
    spyOn(localStorage, 'getItem').and.returnValue(null)
    await service.loadHeroes();
    expect(spy).toHaveBeenCalled();
  });


  it('debe setear los heroes del local storage', async () => {
    const spy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockHeroesCorto))
    await service.loadHeroes();
    expect(spy).toHaveBeenCalled();
    expect(service['heroes']).toEqual(mockHeroesCorto)
  });
});




