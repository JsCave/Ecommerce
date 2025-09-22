import { Category, Subcategory } from './category';
import { Brand } from './brand';

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  images: string[];
  imageCover: string;
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}


export interface WishListResponse {
  status: string;   // "success"
  count: number;    // number of products
  data: Product[];
}