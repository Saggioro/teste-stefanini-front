import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem, Product } from '../../models/order';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      id: [0],
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      paid: [false],
      orderItems: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.orderService.getOrder(+id).subscribe((data: Order) => {
        this.orderForm.patchValue(data);
        this.setOrderItems(data.orderItems);
      });
    }

    this.loadProducts();
  }

  loadProducts(): void {
    this.orderService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  setOrderItems(orderItems: OrderItem[]): void {
    const formItems = orderItems.map((item) =>
      this.fb.group({
        id: [item.id],
        orderId: [item.orderId],
        productId: [item.productId, Validators.required],
        quantity: [item.quantity, Validators.required],
      })
    );
    this.orderForm.setControl('orderItems', this.fb.array(formItems));
  }

  addItem(): void {
    this.orderItems.push(
      this.fb.group({
        id: [0],
        orderId: [0],
        productId: ['', Validators.required],
        quantity: [0, Validators.required],
      })
    );
  }

  removeItem(index: number): void {
    this.orderItems.removeAt(index);
  }

  prepareOrderData(): Order {
    const orderData: Order = this.orderForm.value as Order;

    orderData.orderItems.forEach((item) => {
      delete item.order;
    });
    return orderData;
  }

  saveOrder(): void {
    if (this.orderForm.invalid) {
      return;
    }

    const order: Order = this.prepareOrderData();

    if (this.isEdit) {
      this.orderService.updateOrder(order.id, order).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.orderService.createOrder(order).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
