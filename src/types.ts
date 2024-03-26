export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface UserData {
  name: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  shipping_address: string;
}

export interface OrderProduct {
  id: number;
  quantity: number;
}

export interface Order {
  user_id: number;
  total: number;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface OrderInfo {
  id: number;
  total: number;
  created_at: string;
  user: {
    name: string;
    phone_number: string;
    shipping_address: string;
  };
}
