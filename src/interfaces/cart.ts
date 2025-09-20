import { Category, Subcategory } from "./category";
import { Brand } from "./brand";

// product inside the cart
export interface InnerCartProduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// each product entry in cart
export interface CartProduct<T> {
  count: number;
  _id: string;
  product: T;
  price: number;
}

// generic cart response container
export interface CartResponseData<T> {
  _id: string;
  cartOwner: string;
  products: CartProduct<T>[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// ---------------------
// CART API RESPONSES
// ---------------------

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerCartProduct>;
}

export interface GetUserCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerCartProduct>;
}

export interface RemoveCartProductResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerCartProduct>;
}

export interface ClearCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerCartProduct>;
}

export interface UpdateCartProductCountResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerCartProduct>;
}
