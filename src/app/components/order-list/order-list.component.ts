import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  navigateToAddOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  navigateToEditOrder(id: number): void {
    this.router.navigate([`/orders/edit/${id}`]);
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }
}
