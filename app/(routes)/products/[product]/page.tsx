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

export default async function Page({ params }: { params: { product: string } })
{
    const productId = getProductIdFromURL(params.product);
    await dbConnect();
    const product = await ProductModel.findById(productId).catch(err => notFound());
    if (!product) notFound();

    const category = await CategoryModel.findById(product.category).catch(err => {});
    const { title, stock, images, description, price, _id } = product;

    let rating = 0, sold = 0, reviews = 0;
    const stars = new Array(5).fill(0).map((x,i) => i+1 < rating);

    return (
        <main className="mt-8 flex justify-center p-4">
            <div className="container space-y-4">
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="">
                        <ImagesGallery images={product.images} />
                    </div>
                    <div className="lg:col-span-2 space-y-4">
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

            </div>
        </main>
    )
}