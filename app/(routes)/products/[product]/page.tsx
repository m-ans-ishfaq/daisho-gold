import { CategoryModel } from "@/app/models/category";
import { ProductModel } from "@/app/models/product";
import { getProductIdFromURL } from "@/app/utils/getProduct"
import { ImagesGallery } from "@/components/ui/gallery";
import { dbConnect } from "@/lib/dbConnect";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceTag } from "./components/price";
import { FaStar } from "react-icons/fa6";
import { QuantityInput } from "./components/quantity";
import { getProductsForCards } from "@/app/admin/products/server";
import { IProduct, ProductCard } from "@/app/components/product-card";
import { OtherProducts } from "./components/otherProducts";
import { ReviewForm } from "./components/giveReviewForm";

export default async function Page({ params }: { params: { product: string } })
{
    const productId = getProductIdFromURL(params.product);
    await dbConnect();
    const product = await ProductModel.findById(productId).catch(err => notFound());
    if (!product) notFound();
    let resToOtherProducts = await getProductsForCards(null, [product._id] as string[]).catch(err => {});
    const otherProducts = JSON.parse(resToOtherProducts as string) as IProduct[];

    const category = await CategoryModel.findById(product.category).catch(err => {});
    const { title, stock, images, description, price, _id } = product;

    let rating = 0, sold = 0, reviews = [];
    const stars = new Array(5).fill(0).map((x,i) => i+1 < rating);

    return (
        <main className="mt-8 flex justify-center p-4">
            <div className="container space-y-4">
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="">
                        <ImagesGallery images={product.images} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-neutral-400">
                            <Link href="/" className="hover:text-black">Home</Link>{" / "}
                            {category ? (
                                <Link className="hover:text-black" href={`/products/category/${decodeURIComponent(category.title as string)}`}>
                                    {category.title}
                                </Link>
                            ) : <></>}{" / "}
                            <span>{title}</span>
                        </h4>
                        <h1 className="text-4xl font-semibold">
                            {title}
                        </h1>
                        <PriceTag priceInUsd={price} />
                        <p className="flex gap-1 items-center">
                            <span className="mr-2">{rating + " Rating "}</span>
                            {stars.map((isColored, i) => (
                                <FaStar size={16} key={i} className={isColored ? 'text-yellow-500' : 'text-neutral-300'} />
                            ))} 
                        </p>
                        <p className="text-neutral-400">{0} Sold, {0} Reviews</p>
                        <QuantityInput productId={_id as string} stock={stock} />
                        <p>{description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo neque perspiciatis vitae assumenda voluptatibus iure modi dignissimos ratione quam ipsam eaque ex, dolore cumque at obcaecati ipsa explicabo tenetur! Sunt repudiandae, natus explicabo ratione sapiente debitis molestiae voluptate hic inventore? Asperiores hic ipsum adipisci sapiente fugiat, velit consequatur praesentium! Officiis?</p>
                    </div>
                </div>

                <div className="border-t py-4 mt-8 space-y-4">
                    <h2 className="font-bold text-2xl">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviews.length == 0 ? (
                            <div>
                                <p>There are no reviews, be the first one to leave a review !</p>
                            </div>
                        ) : <></>}
                        <div>
                            <ReviewForm productId={_id as string}  />
                        </div>
                    </div>
                </div>
                
                {otherProducts ? <div className="mt-8 space-y-4">
                    <h2 className="font-bold text-2xl">Other Products</h2>
                    <OtherProducts products={otherProducts} />
                </div> : <></>}

            </div>
        </main>
    )
}