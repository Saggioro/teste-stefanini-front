export class Order {
  id: number = 0;
  customerName: string = '';
  customerEmail: string = '';
  creationDate: string = '';
  paid: boolean = false;
  orderItems: OrderItem[] = [];
}

export class OrderItem {
  id: number = 0;
  orderId: number = 0;
  productId: number = 0;
  quantity: number = 0;
  product: Product = new Product();
  order?: Order;
}

export class Product {
  id: number = 0;
  productName: string = '';
  price: number = 0;
}
