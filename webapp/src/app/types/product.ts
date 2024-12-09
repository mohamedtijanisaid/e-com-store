export interface Product {
    _id: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    discount: number;
    images: string[]; // Tableau pour les images
    categoryId: { name: string };
    brandId: { name: string };
    isFeatured:boolean;
    isNew:boolean;
  
  }
  