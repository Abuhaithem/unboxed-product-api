export interface ProductData {
  url: string;
  title: string;
  category: string;
  attributes: {
    colorOptions: string[];
    sizeOptions: string[];
  };
  rawPrice: number;
}
