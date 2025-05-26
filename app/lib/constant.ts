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

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
export interface FieldProps {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface ErrorsProps {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}
export interface DecodedToken {
  sub?: string;
  email?: string;
  role?: string;
  username?: string;
  phone?: string;
  token?: string;
  // exp: number;
  // iat: number;
}

export const initialSignupValues = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
};
export const initialTouchedState = {
  userName: false,
  email: false,
  phoneNumber: false,
  password: false,
};

export const baseURL = "https://shopify-commerce-api.onrender.com";
export const LIMIT = 10;

// export const frontendURL = "https://shopify-frontend-lnyt.onrender.com";
