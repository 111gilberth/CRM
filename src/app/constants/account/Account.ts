import { Address } from "./address";

export class Account {
  restaurantID: string;
  name: string;
  phoneNumber: string;
  rfc: string;
  type: string;
  email: string;
  address: Array<Address>;
}

export enum TypeEnum {
  GOURMET = "GOURMET",
  FAMILIAR = "FAMILIAR",
}

export class TypeRestaurantEnum {
  id: string;
  value: string;

  static readonly ALL = [
    { id: TypeEnum.GOURMET, value: "GOURMET" },
    { id: TypeEnum.FAMILIAR, value: "FAMILIAR" },
  ];
}
