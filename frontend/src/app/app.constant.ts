import {environment} from "../environments/environment";

export class AppConstant {
  public static readonly API_URL = environment.apiUrl;

  public static readonly API_PATHS = {
    USER: {
      LOGIN: 'user/login',
      REGISTER: 'user/register',
      DEFAULT: 'user',
      EDIT: 'user/profile'
    },
    JOGO: {
      DEFAULT: 'jogo'
    },
    TIPO:{
      DEFAULT:'tipo'
    },
    CARTEIRA:{
      DEFAULT: 'carteira'
    },
    TRANSACOES: {
      DEFAULT: 'transacoes'
    },
    APOSTAS:{
      DEFAULT:'aposta',
      SAVE: 'aposta/all',
      MULTIPLE:'apostaMultipla',
      APOSTAS_COUNT: 'aposta/id/count',
      MULTIPLE_APOSTAS_COUNT: 'apostaMultipla/id/count'
    },

  }

  public static readonly REGEX = {
    email: /^[_a-z0-9-+]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    password: /^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,}$/
  }
}
