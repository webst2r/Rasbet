import {environment} from "../environments/environment";

export class AppConstant {
  public static readonly API_URL = environment.apiUrl;

  public static readonly API_PATHS = {
    USER: {
      LOGIN: 'user/login',
      REGISTER: 'user/register',
      DEFAULT: 'user',
      EDIT: 'user/profile',
      ADD_NOTIFICATION_GAME: 'user/id/notification/gameId/add',
      REMOVE_NOTIFICATION_GAME: 'user/id/notification/gameId/remove',
      LIST_NOTIFICATION_GAME: 'user/id/notification/games',
      TOTAL_UNREAD_NOTIFICATIONS: 'user/id/notification/unread/count',
      READ_ALL_NOTIFICATIONS: 'user/id/notification/unread'
    },
    JOGO: {
      DEFAULT: 'jogo',
      CREATE: 'jogo/create',
      EDIT:'jogo/id/edit',
      CANCEL:'jogo/id/cancel',
      ADD_RESULT:'jogo/id/result',
      BET_GAMES: 'jogo/betGames',
      ODD_GAMES: 'jogo/oddGames'
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
      APOSTA_ID: 'aposta/id',
      CANCEL_APOSTA: 'aposta/id/cancel',
      SAVE: 'aposta/all',
      MULTIPLE:'apostaMultipla',
      MULTIPLE_ID:'apostaMultipla/id',
      APOSTAS_COUNT: 'aposta/id/count',
      MULTIPLE_APOSTAS_COUNT: 'apostaMultipla/id/count',
      CANCEL_MULTIPLE: 'apostaMultipla/id/cancel',
    },
    OPCAO_APOSTA:{
      ADD: "opcaoAposta/add/id_jogo"
    },
    USER_NOTIFICACAO: {
      DEFAULT: 'userNotification'
    }
  }

  public static readonly REGEX = {
    email: /^[_a-z0-9-+]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    password: /^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,}$/
  }

  public static readonly DIALOG_DEFAULT_CONFIG = {
    disableClose: true,
    autoFocus: false,
    restoreFocus: false,
    width: '40vw',
  };
}
