export enum Role{
  ROLE_USER = 'ROLE_USER',
  ROLE_SPECIALIST = 'ROLE_SPECIALIST',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface UserToken{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  saldo: number;
  idCarteira: number;
  token: string;
}

export interface Transaction {
  id: number;
  valor: number;
  createdAt: string;
  tipo: string;
  tipoDeposit: string;
}
