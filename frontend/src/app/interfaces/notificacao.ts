import { NotificationType } from "../enumeration/notification_type";
import { Aposta, ApostaMultipla } from "./aposta";
import { Jogo } from "./jogo";

export interface Notificacao {
    id: number;
    date: string;
    type: NotificationType;
    jogo: Jogo;
    aposta: Aposta;
    apostasMultiplas: ApostaMultipla;
  }
  