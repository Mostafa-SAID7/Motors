export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'new' | 'used';
  color: string;
  images: string[];
  description: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  rating?: number;
  reviews?: number;
}

export interface CarFilter {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  condition?: 'new' | 'used';
  color?: string;
  search?: string;
}

export interface Review {
  id: string;
  carId: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}
