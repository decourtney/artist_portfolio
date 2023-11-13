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
  productCount: string;
  categoryCount: string;
}

export interface AccountData {
  username: String;
  productCount: String;
  products: [
    {
      name: string;
      description: String;
      image: String;
      categories: [
        {
          name: String;
          image: String
        }
      ];
    }
  ];
  categoryCount: String;
  categories: [
    {
      name: String;
      image: String;
    }
  ];
}

export interface AccountItem {
  name: String;
  description: String;
  image: String;
  categories: [
    {
      name: String;
      image: String;
    }
  ];
}

export interface LoggedInUser {
  data: { email: string; username: string; _id: string };
  exp: number;
  iat: number;
}
