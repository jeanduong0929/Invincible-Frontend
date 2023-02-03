import Quantity from "./Quantity";

class Size {
  id: string;
  size: string;
  quantities: Quantity[];

  constructor(id: string, size: string, quantities: Quantity[]) {
    this.id = id;
    this.size = size;
    this.quantities = quantities;
  }
}

export default Size;
