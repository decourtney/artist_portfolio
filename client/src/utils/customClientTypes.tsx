export type UserData ={
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

export type AccountData ={
  username: string;
  productCount: string;
  products: [
    {
      name: string;
      description: string;
      image: string;
      categories: [
        {
          name: string;
          image: string;
        }
      ];
    }
  ];
  categoryCount: string;
  categories: [
    {
      name: string;
      image: string;
    }
  ];
}

export type CategoryItem ={
  name: string;
  image: string;
  products: [
    {
      name: string;
      description: string;
      image: string;
      categories: [
        {
          name: string;
          image: string;
        }
      ];
    }
  ];
}

export type AccountItem ={
  name: string;
  description: string;
  image: string;
  categories: [
    {
      name: string;
      image: string;
    }
  ];
}

export type LoggedInUser ={
  data: { email: string; username: string; _id: string };
  exp: number;
  iat: number;
}
