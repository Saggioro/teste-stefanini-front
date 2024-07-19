import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  isEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getProduct(+id).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  saveProduct(): void {
    if (this.isEdit) {
      this.productService
        .updateProduct(this.product.id, this.product)
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
