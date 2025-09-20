import { Product } from '@/interfaces';

export interface CheckoutResponse {
    status: string;
    session: {
      id: string;
      url: string;
    };
  }
  

  export interface Order {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    cartItems: CartItem[];
    paidAt: string;      // ISO date
    createdAt: string;   // ISO date
    updatedAt: string;   // ISO date
    id: number;
    __v: number;
  }

  export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }

  export interface CartItem {
    count: number;
    _id: string;
    product: Product;
    price: number;
  }
  

  

  
