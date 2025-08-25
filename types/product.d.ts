type Product = {
    name: string;
    description: string | null;
    price: number;
    discountPercent: number;
    imageUrls: string[]
    rating: number;
    isFlashSale: boolean;
}