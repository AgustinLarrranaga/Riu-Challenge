import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-hero.component.html', 
  styleUrls: ['./add-hero.component.css'], 
})
export class AddHeroComponent { }
