import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loaderService.isLoading()) {
    <div class="loader-overlay">
      <mat-spinner
        diameter="50"
        mode="indeterminate"
        color="primary"
      ></mat-spinner>
    </div>
    }
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
        z-index: 9999; /* Sit on top of everything */
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(2px); /* Modern blur effect */
      }
    `,
  ],
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
}
