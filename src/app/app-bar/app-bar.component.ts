import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../config/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AppBarComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);

  searchTerm = '';

  topics = [
    { title: 'Angular Introduction', path: '/link2', icon: 'info' },
    { title: 'Products', path: '/products', icon: 'shop' },
    { title: 'Angular CLI', path: '/link3', icon: 'terminal' },
    { title: 'Components', path: '/components', icon: 'view_quilt' },
    { title: 'Templates', path: '/templates', icon: 'code' },
    { title: 'Data Binding', path: '/data-binding', icon: 'sync_alt' },
    { title: 'Directives', path: '/directives', icon: 'extension' },
    { title: 'Pipes', path: '/pipes', icon: 'filter_alt' },
    { title: 'Services', path: '/services', icon: 'build' },
    { title: 'Dependency Injection', path: '/di', icon: 'hub' },
    { title: 'Routing & Navigation', path: '/routing', icon: 'alt_route' },
    { title: 'Lazy Loading', path: '/lazy-loading', icon: 'layers' },
    { title: 'Route Guards', path: '/guards', icon: 'security' },
    { title: 'HTTP Interceptors', path: '/interceptors', icon: 'http' },
    { title: 'Forms', path: '/forms', icon: 'assignment' },
    { title: 'Form Validation', path: '/validation', icon: 'rule' },
    { title: 'Signals', path: '/signals', icon: 'bolt' },
    { title: 'Standalone Components', path: '/standalone', icon: 'widgets' },
    { title: 'Change Detection', path: '/change-detection', icon: 'refresh' },
    { title: 'Performance', path: '/performance', icon: 'speed' },
    { title: 'Testing', path: '/testing', icon: 'science' },
  ];

  private router = inject(Router);
  private dialog = inject(MatDialog);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  filteredTopics() {
    const term = this.searchTerm.toLowerCase();
    return this.topics.filter((t) => t.title.toLowerCase().includes(term));
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      maxWidth: '90vw',
      disableClose: true, // prevent backdrop click
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to logout?',
        confirmText: 'Logout',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('[APP] Logout');

        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
