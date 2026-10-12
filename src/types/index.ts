export type Product = {
  product_id: string | number;
  product_image: string;
  product_title: string;
  product_status: string;
  product_category: string;
  product_price: number | string;
  product_quantity?: number;
  product_added_date?: string;
};

export type CartItem = {
  id: string | number;
  image: string;
  name: string;
  price: number | string;
};

export type Customer = {
  user_id: string | number;
  username: string;
  name: string;
  surname: string;
  email: string;
  date_added: string;
};
