export class AddressForm {
  city: string;
  country: string;
  externalNumber: number;
  internalNumber: number;
  intersectionOne: string;
  intersectionTwo: string;
  neighborhood: string;
  state: string;
  street: string;
  zipCode: number;
  id: string;

  constructor(
    id: string,
    city: string,
    country: string,
    externalNumber: number,
    internalNumber: number,
    intersectionOne: string,
    intersectionTwo: string,
    neighborhood: string,
    state: string,
    street: string,
    zipCode: number
  ) {
    this.id = id;
    this.city = city;
    this.country = country;
    this.externalNumber = externalNumber;
    this.internalNumber = internalNumber;
    this.intersectionOne = intersectionOne;
    this.intersectionTwo = intersectionTwo;
    this.neighborhood = neighborhood;
    this.state = state;
    this.street = street;
    this.zipCode = zipCode;
  }
}
