import { Part1, Part2 } from "@/app/assets";
import { IProduct } from "@/app/components/product-card";

export const DUMMY_PRODUCTS: IProduct[] = [
    {
        image: Part1,
        isCouponAvailable: true,
        outOfStock: false,
        price: 932.20,
        currency: "PKR",
        rating: 4,
        reviews: 22,
        sold: 25,
        title: "Brake Shoe H-106"
    },
    {
        image: Part2,
        isCouponAvailable: false,
        outOfStock: true,
        price: 1200.00,
        currency: "PKR",
        rating: 3,
        reviews: 15,
        sold: 30,
        title: "Bush Rod CG 125"
    },
    {
        image: Part1,
        isCouponAvailable: true,
        outOfStock: false,
        price: 1500.50,
        currency: "PKR",
        rating: 5,
        reviews: 10,
        sold: 40,
        title: "Cam Gear Set CG-125 New Model Fibre"
    },
    {
        image: Part2,
        isCouponAvailable: false,
        outOfStock: true,
        price: 800.75,
        currency: "PKR",
        rating: 2,
        reviews: 5,
        sold: 12,
        title: "Cam Gear Set CG-125 Old Model"
    },
    {
        image: Part1,
        isCouponAvailable: true,
        outOfStock: false,
        price: 950.00,
        currency: "PKR",
        rating: 4,
        reviews: 8,
        sold: 18,
        title: "Carburetor Assy CD-70 (Euro 2)"
    },
    {
        image: Part2,
        isCouponAvailable: false,
        outOfStock: true,
        price: 1100.20,
        currency: "PKR",
        rating: 3,
        reviews: 20,
        sold: 25,
        title: "Carburetor Assy CD-70 (Old Model)"
    },
    {
        image: Part1,
        isCouponAvailable: true,
        outOfStock: false,
        price: 1050.75,
        currency: "PKR",
        rating: 5,
        reviews: 18,
        sold: 22,
        title: "Carburetor Insulator CG-125 OM"
    },
    {
        image: Part2,
        isCouponAvailable: false,
        outOfStock: true,
        price: 980.60,
        currency: "PKR",
        rating: 4,
        reviews: 12,
        sold: 28,
        title: "Chain Lock"
    }
];
