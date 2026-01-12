import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from './config/material.module';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { AppBarComponent } from './app-bar/app-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    AppBarComponent,
    RouterOutlet,
    MatSidenavModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'base-layout-demo';
  private breakpointObserver = inject(BreakpointObserver);
  private loader = inject(LoaderService);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader.hide();
      }
    });
  }
}
