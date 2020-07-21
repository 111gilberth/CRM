export class DishForm {
  name: string;
  price: number;
  description: string;

  constructor(name: string, price: number, description: string) {
    console.log(name, "constructor");
    this.name = name;
    this.price = price;
    this.description = description;
  }
}
