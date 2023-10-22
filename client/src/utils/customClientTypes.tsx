export interface UserData{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
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