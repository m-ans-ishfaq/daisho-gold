"use client";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi"
import { IProduct, ProductCard, SkeletonProductCard } from "../../../components/product-card"
import { getProductsForCards } from "@/app/admin/products/server";

async function getFeaturedProducts(currentIds: string[]) {
    const res = await getProductsForCards(null, currentIds);
    return JSON.parse(res) as IProduct[];
}

async function getMoreFeaturedProducts(currentProducts: IProduct[]) {
    const productIds = currentProducts.map(p => p._id);
    const moreProducts = await getFeaturedProducts(productIds)
    return [...currentProducts, ...moreProducts];
}

export function Featured() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [canLoad, setCanLoad] = useState(true);

    useEffect(() => {
        // Fetch initial products on component mount
        getFeaturedProducts([]).then(initialProducts => {
            setProducts(initialProducts);
            setInitialLoading(false);
        });
    }, []);

    const handleLoadMore = async () => {
        setLoading(true);
        const moreProducts = await getMoreFeaturedProducts(products);
        if (moreProducts.length < products.length + 8) setCanLoad(false);
        setProducts(moreProducts);
        setLoading(false);
    };

    return (
        <section id="products" className="p-4 flex justify-center">
            <div className="container px-0 flex flex-col gap-4">
                <div className="mb-8 w-full flex-col gap-4 sm:grid grid-cols-[auto,auto] items-center">
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
                <div className="mb-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {initialLoading && new Array(8).fill(0).map((x,i) => (
                        <SkeletonProductCard key={i} />
                    ))}
                    {!initialLoading && products.map((productProps, i) => (
                        <ProductCard key={i} productProps={productProps} />
                    ))}
                </div>
                {canLoad && <div className="flex justify-center items-center p-4">
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
                </div>}
            </div>
        </section>
    )
}
