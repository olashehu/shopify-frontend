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
export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  addToCart: (product: ProductsTypes, quantity: number) => void;
  checkout: () => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
}
export interface CartItem extends ProductsTypes {
  quantity: number;
}

export const baseURL = "https://shopify-commerce-api.onrender.com";
export const LIMIT = 10;
