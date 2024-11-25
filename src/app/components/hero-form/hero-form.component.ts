import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
})
export class HeroFormComponent {
  @Input() hero: Hero | null = null; 
  @Output() saveHero = new EventEmitter<Hero>(); 

  heroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      world: ['', [Validators.required]],
      enemy: ['', [Validators.required]],
      image: ['', [Validators.required, this.imageUrlValidator]],
      author: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {    
    if (this.hero) {
      this.heroForm.patchValue(this.hero);
    }
  }

  private imageUrlValidator(control: AbstractControl): ValidationErrors | null {
    const urlPattern = /^https?:\/\/.*\.jpg$/;
    const value = control.value;
    if (!value || urlPattern.test(value)) {
      return null;
    }
    return { invalidImageUrl: true };
  }

  getErrorMessage(field: string): string | null {
    const control = this.heroForm.get(field);
    if (!control || !control.touched) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength')?.requiredLength;
      return `El campo debe tener al menos ${minLength} caracteres.`;
    }
    if (control.hasError('invalidImageUrl')) {
      return 'La URL debe comenzar con "https://" o "http://" y terminar con ".jpg".';
    }
    return null;
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroData: Hero = {
        ...this.hero,
        ...this.heroForm.value,
      };
      this.saveHero.emit(heroData);
    } else {
      alert('Formulario inválido.');
    }
  }
}
