import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent {
  heroForm: FormGroup;

  constructor(private fb: FormBuilder , private heroesService: HeroesService, private route: Router ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      world: ['', [Validators.required]],
      enemy: ['', [Validators.required]],
      image: ['', [Validators.required, this.imageUrlValidator]],
      author: ['', [Validators.required]],
    });
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
  
  onSubmit() {
    if (this.heroForm.valid) {
      const newHero: Hero = {
        id: 0,
        name:this.heroForm.value.name,
        world: this.heroForm.value.world,
        image: this.heroForm.value.image,
        enemy: this.heroForm.value.enemy,
        author: this.heroForm.value.author
    }
      this.heroesService.addHero(newHero)
      alert('¡Héroe agregado exitosamente!');
      this.route.navigateByUrl("")
    } else {
      alert('Formulario inválido.');
    }
  }
}

