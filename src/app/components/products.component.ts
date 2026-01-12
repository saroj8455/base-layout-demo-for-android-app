import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { LoaderService } from '../core/loader/loader.service';
import { MaterialModule } from '../config/material.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MaterialModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private loader = inject(LoaderService);

  products: any[] = [];

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loader.show();

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.loader.hide();
      },
      error: () => {
        this.loader.hide();
      },
    });
  }
}
