"use client";
import { useState, useEffect } from "react";
import { DUMMY_PRODUCTS } from "@/data/products"
import { BiSearch } from "react-icons/bi"
import { IProduct, ProductCard } from "../../../components/product-card"

function getFeaturedProducts() {
    return DUMMY_PRODUCTS;
}

function getMoreFeaturedProducts(currentProducts: IProduct[]) {
    return [...currentProducts, ...DUMMY_PRODUCTS];
}

export function Featured() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch initial products on component mount
        const initialProducts = getFeaturedProducts();
        setProducts(initialProducts);
    }, []);

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const moreProducts = getMoreFeaturedProducts(products);
            setProducts(moreProducts);
            setLoading(false);
        }, 1000); // Simulate network delay
    };

    return (
        <section id="featured" className="p-4 flex justify-center">
            <div className="container flex flex-col gap-4">
                <div className="w-full flex-wrap gap-4 sm:grid grid-cols-[auto,auto] items-center">
                    <h2 className="font-bold text-2xl">
                        Featured Products
                    </h2>
                    <div className="mt-2 flex justify-center">
                        <input
                            type="email"
                            className="border-2 border-neutral-800 border-r-0 outline-none font-semibold w-full max-w-4xl bg-white text-black px-4 py-2 rounded-l-lg"
                            placeholder="CG 125 Break Shoe ..."
                        />
                        <button className="border-2 border-neutral-800 border-l-0 bg-red-500 text-white hover:bg-yellow-500 px-4 py-2 flex gap-2 items-center rounded-r-lg">
                            <BiSearch />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((productProps, i) => (
                        <ProductCard key={i} productProps={productProps} />
                    ))}
                </div>
                <div className="flex justify-center items-center p-4">
                    <button 
                        className="bg-red-500 text-white p-4 px-8 font-semibold rounded-md hover:bg-yellow-500" 
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
                        ) : (
                            "Load More"
                        )}
                    </button>
                </div>
            </div>
        </section>
    )
}
