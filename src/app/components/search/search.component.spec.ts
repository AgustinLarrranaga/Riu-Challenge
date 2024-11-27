import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con un campo llamado "searcher"', () => {
    expect(component.searchForm.contains('searcher')).toBeTruthy();
  });

  it('debería emitir un valor al llamar a searchHeroesByName', () => {
    spyOn(component.search, 'emit');
    const testValue = 'Superman';

    component.searchForm.get('searcher')?.setValue(testValue);
    component.searchHeroesByName();

    expect(component.search.emit).toHaveBeenCalledWith(testValue);
  });

  it('debería emitir un valor vacío si el formulario está vacío al llamar a searchHeroesByName', () => {
    spyOn(component.search, 'emit');

    component.searchHeroesByName();

    expect(component.search.emit).toHaveBeenCalledWith('');
  });

  it('debería actualizar el valor del formulario cuando se ingresa texto en el input', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'Batman';

    input.value = testValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchForm.get('searcher')?.value).toBe(testValue);
  });

  it('debería llamar a searchHeroesByName al presionar el botón de búsqueda', () => {
    spyOn(component, 'searchHeroesByName');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.searchHeroesByName).toHaveBeenCalled();
  });
});
