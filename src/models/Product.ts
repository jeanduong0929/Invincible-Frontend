import Size from "./Size";

class Product {
  id: string;
  product: string;
  price: number;
  sizes: Size[];

  constructor(id: string, product: string, price: number, sizes: Size[]) {
    this.id = id;
    this.product = product;
    this.price = price;
    this.sizes = sizes;
  }
}

export default Product;
