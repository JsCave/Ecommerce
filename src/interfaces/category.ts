import { Metadata } from "./brand";

export interface CategoryResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}





