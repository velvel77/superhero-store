export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  category?: Category;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode?: string;
    qrCode?: string;
  };
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface SuperheroProp {
  response: string;
  id: string;
  name: string;

  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };

  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };

  appearance: {
    gender: string;
    race: string;
    height: string[]; // ["6'8", "203 cm"]
    weight: string[]; // ["980 lb", "441 kg"]
    'eye-color': string;
    'hair-color': string;
  };

  work: {
    occupation: string;
    base: string;
  };

  connections: {
    'group-affiliation': string;
    relatives: string;
  };

  image: {
    url: string;
  };
}

export interface SuperheroSearchResponse {
  response: string;
  results: SuperheroProp[];
}
