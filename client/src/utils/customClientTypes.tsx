export type UserData = {
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
  productCount: string;
  categoryCount: string;
  products: [Product];
  categories: [Category];
};

export type Category = {
  __typename: string;
  name: string;
  defaultCategory: boolean;
  image: string;
  products: [Product?];
};

export type Product = {
  __typename: string;
  name: string;
  description: string;
  image: string;
  categories: [Category?];
};

export type AccountData = {
  username: string;
  productCount: string;
  products: [Product];
  categoryCount: string;
  categories: [Category];
};

export type LoggedInUser = {
  data: { email: string; username: string; _id: string };
  exp: number;
  iat: number;
};
