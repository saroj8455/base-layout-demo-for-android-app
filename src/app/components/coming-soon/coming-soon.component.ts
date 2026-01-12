import { Component } from '@angular/core';
import { MaterialModule } from '../../config/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css',
})
export class ComingSoonComponent {}
