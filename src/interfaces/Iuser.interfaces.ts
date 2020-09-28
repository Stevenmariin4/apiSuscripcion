export interface IUsuario {
  use_name: string;
  use_lastname: string;
  use_age: Number;
  use_email: string;
  use_phone: string;
  use_photo: string;
  ro_id: number;
  su_id: number;
}

export interface IUserCredentials {
  use_id: string;
  use_password: string;
}
