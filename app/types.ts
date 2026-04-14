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

export interface Hero {
  id: number;
  name: string;
  price: string;
  description: string;
  superpowers: string;
  stats: HeroStats;
  image_url: string;
  is_available: boolean;
  joined_at: string;
  ranking: 'S' | 'A' | 'B' | 'C' | string;
}

export interface HeroStats {
  speed: number;
  combat: number;
  energy: number;
  strength: number;
  durability: number;
  intelligence: number;
}
