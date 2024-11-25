import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeroFormComponent } from "src/app/components/hero-form/hero-form.component";
import { Hero } from "src/app/models/hero.model";
import { HeroesService } from "src/app/services/heroes.service";

@Component({
    selector: 'app-edit-hero',
    standalone: true,
    imports: [HeroFormComponent,CommonModule], 
    templateUrl: './edit-hero.component.html',
    styleUrls: ['./edit-hero.component.css'],
})
  export class EditHeroComponent implements OnInit {
    hero: Hero | null = null;
    title:string = ""
    formDisable : boolean = false

    constructor(private route: ActivatedRoute, private heroesService: HeroesService, private router: Router) {}
  
    ngOnInit(): void {
      const heroId = +this.route.snapshot.paramMap.get('id')!;
      this.hero = this.heroesService.getHeroById(heroId)      
      if(this.hero){
        this.title = "Editando " + this.hero.name
      }else{
        this.title = "Error al obtener heroe"
        this.formDisable = true
      }
    }
  
    onSave(updatedHero: Hero): void {
      this.heroesService.updateHero(updatedHero)
      alert('¡Héroe actualizado exitosamente!');
      this.router.navigateByUrl("")
    }
  }
  