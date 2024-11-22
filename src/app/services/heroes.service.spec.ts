import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    

    localStorageSpy = jasmine.createSpyObj('Storage', ['getItem', 'setItem', 'removeItem']);


    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Storage, useValue: localStorageSpy }  
      ]
    });

    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load heroes from heroes.json if not in localStorage', () => {

    const mockHeroes = [
      { id: '1', name: 'Superman', world: 'Earth', image: '', enemy: '', author: '' },
      { id: '2', name: 'Spiderman', world: 'Earth', image: '', enemy: '', author: '' }
    ];


    httpClientSpy.get.and.returnValue(of(mockHeroes));

 
    localStorageSpy.getItem.and.returnValue(null);  

    service['setAllHeroes']();


    expect(service.getAllHeroes()).toEqual(mockHeroes);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith('heroes', JSON.stringify(mockHeroes));
  });

  it('should return empty array if no heroes match search query', () => {
    const hero1 = { id: '1', name: 'Superman', world: 'Earth', image: '', enemy: '', author: '' };
    service.addHero(hero1);
  

    const result = service.searchHeroesByName('batman');
    

    expect(result.length).toBe(0);
  });
  

  it('should load heroes from localStorage if available', () => {
    const mockHeroes = [
      { id: '1', name: 'Superman', world: 'Earth', image: '', enemy: '', author: '' },
      { id: '2', name: 'Spiderman', world: 'Earth', image: '', enemy: '', author: '' }
    ];

  
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockHeroes));

    service['loadHeroes']();


    expect(service.getAllHeroes()).toEqual(mockHeroes);
  });
});
