export interface ProductsTypes {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
  createdAt?: string;
}

export const baseURL = "https://shopify-commerce-api.onrender.com";
// export const frontendURL = "https://shopify-frontend-lnyt.onrender.com";
export const LIMIT = 10;