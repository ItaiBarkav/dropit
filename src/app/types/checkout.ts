export interface Checkout {
  items: CheckoutItem[];
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
}
