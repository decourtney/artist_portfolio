export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  profilePic: string;
  products: string[];
  productCount: string;
  categories: string[];
  categoryCount: string;
}

export interface LoggedInUser {
  data: { email: string; username: string; _id: string };
  exp: number;
  iat: number;
}