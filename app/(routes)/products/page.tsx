import { getTransformedProductsForCards } from "@/app/lib/product";
import { IProductCard, ProductModel } from "@/app/models/product";
import { dbConnect } from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import FilterForm from "./components/filter";
import { ProductCard } from "@/app/components/product-card";
import Image from "next/image";
import { NewsletterBg } from "@/app/assets";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Container = ({ children }: any) => {
    return (
        <main className="text-m-scale-2 sm:text-d-scale-2 p-4 flex justify-center">
            <div className="container px-0">

                <div className="relative py-20 px-4 w-full flex justify-center items-center mb-8">
                    <h1 className="relative z-[3] text-white font-medium uppercase tracking-widest text-opacity-85 text-2xl">Browse Our Products</h1>
                    <Image src={NewsletterBg} alt="" className="absolute top-0 left-0 z-[1] w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 z-[2] w-full h-full bg-black bg-opacity-50" />
                </div>

                <FilterForm>
                    {children}
                </FilterForm>
            </div>
        </main>
    )
}

export default async function Page({
    searchParams,
  }: {
    searchParams?: { 
        bike? : string;
        part? : string;
        query?: string;
        gtprice?: number;
        ltprice?: number;
        available?: string;
     };
  })
{

    if (!searchParams?.bike && !searchParams?.query && !searchParams?.part) {
        return (
            <Container>
                <div className="py-16 flex justify-center items-center flex-col gap-4">
                    <FaMagnifyingGlass size={24} />
                    <p>Search by query, bike part or bike filter</p>
                </div>
            </Container>
        )
    }

    await dbConnect();
    const conditions: any = {};
    
    if (searchParams?.bike) {
        conditions.bike = { $regex: searchParams.bike, $options: 'i' };
    }
    if (searchParams?.part) {
        conditions.category = { $regex: searchParams.part, $options: 'i' };
    }
    if (searchParams?.query) {
        const queryRegex = { $regex: searchParams.query, $options: 'i' };
        conditions.$or = [
            { title: queryRegex },
            { description: queryRegex },
            { category: queryRegex },
            { bike: queryRegex },
        ];
    }
    if (searchParams?.gtprice) {
        conditions.price = { ...conditions.price, $gte: Number(searchParams.gtprice) };
    }
    if (searchParams?.ltprice) {
        conditions.price = { ...conditions.price, $lte: Number(searchParams.ltprice) };
    }
    if (searchParams?.available === 'true') {
        conditions.stock = { $ne: 0 };
    }

    const res = await ProductModel.find(conditions).catch(err => notFound());
    const products = getTransformedProductsForCards(res);

    if (products == null || products.length == 0 || !products) {
        return (
            <Container>
                <div className="py-16 flex justify-center items-center flex-col gap-4">
                    <AiOutlineClose size={24} />
                    <p>Couldn{"'"}t find any product, try disabling filters</p>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p,i) => (
                    <ProductCard key={i} productProps={p as IProductCard} />
                ))}
            </ul>
        </Container>
    )
}