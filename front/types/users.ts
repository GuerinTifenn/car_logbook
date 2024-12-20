export type User = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  is_admin: boolean;
};

export type UserPayLoad = {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  is_admin: boolean;
};

export type UserSignInPayLoad = {
  email: string;
  password: string;
};

export type UserProfilePayload = {
  last_name: string,
  first_name: string,
  email: string
}

export type UserProfile = {
  last_name: string,
  first_name: string,
  email: string
}

export type UserPassword = {
  current_password: string,
  new_password: string
}
