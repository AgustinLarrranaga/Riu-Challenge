import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { Router } from '@angular/router';
import { HeroFormComponent } from 'src/app/components/hero-form/hero-form.component';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HeroFormComponent],
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent {

  constructor(private heroesService: HeroesService, private route: Router ) {}

  onSave(newHero: Hero): void {
    this.heroesService.addHero(newHero)
    alert('¡Héroe agregado exitosamente!');
    this.route.navigateByUrl("")
  }

}

