import {environment} from "../environments/environment";

export class AppConstant {
  public static readonly API_URL = environment.apiUrl;

  public static readonly API_PATHS = {
    LOGIN: 'user/login',
    REGISTER: 'user/register'
  }

  public static readonly REGEX = {
    email: /^[_a-z0-9-+]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    password: /^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,}$/
  }
}
