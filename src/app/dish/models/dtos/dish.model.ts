export type Discount = {
  minQuantity: number;
  percentage: number;
}

export type DishDto = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  discount: Discount | null
};
