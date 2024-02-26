export interface ISignUp {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpProps {
  data: ISignUp;
}
