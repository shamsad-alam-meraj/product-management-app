export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  offset: number;
  limit: number;
}

export interface CategoriesResponse {
  data: Category[];
}

export interface AuthResponse {
  token: string;
}
