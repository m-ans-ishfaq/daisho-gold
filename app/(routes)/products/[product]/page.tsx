import { CategoryModel } from "@/app/models/category";
import { ProductModel } from "@/app/models/product";
import { ReviewModel } from "@/app/models/review";
import { getProductIdFromURL } from "@/app/utils/getProduct";
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
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserModel } from "@/app/models/user";
import { WhatsappIcon } from "@/app/components/whatsapp";

export default async function Page({ params }: { params: { product: string } }) {
    const productId = getProductIdFromURL(params.product);

    await dbConnect();

    const [session, product, reviews, otherProductsRes, category] = await Promise.all([
        getServerSession(authOptions),
        ProductModel.findById(productId).catch(err => notFound()),
        ReviewModel.find({ productId }).catch(err => []),
        getProductsForCards(null, [productId]).catch(err => []),
        ProductModel.findById(productId).populate('category').catch(err => null),
    ]);

    if (!product) notFound();

    const { title, stock, images, description, price, _id } = product;
    const { category: productCategory } = category || { category: { title: 'Misc' } };
    const otherProducts = JSON.parse(otherProductsRes as string) as IProduct[];
    
    const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
    const stars = new Array(5).fill(0).map((_, i) => i < rating);

    let userReview:any;
    if (session?.user && session.user.role == "customer") {
        const user = await UserModel.findById(session?.user.id, { email: 1 });
        userReview = reviews.find(review => review.email === user?.email);
    }
    //@ts-ignore
    const categoryTitle = productCategory.title;

    const getStars = (stars:number) => new Array(stars).fill(0).map((_, i) => i < rating)

    return (
        <>
        <main className="mt-8 flex justify-center p-4">
            <div className="container px-0 flex flex-col gap-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="">
                        <ImagesGallery images={images} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-neutral-400">
                            <Link href="/" className="hover:text-black">Home</Link>{" / "}
                            {productCategory ? (
                                <Link
                                    className="hover:text-black"
                                    href={`/products/category/${decodeURIComponent(categoryTitle)}`}
                                >
                                    {categoryTitle}
                                </Link>
                            ) : <></>}{" / "}
                            <span>{title}</span>
                        </h4>
                        <h1 className="text-4xl font-semibold">
                            {title}
                        </h1>
                        <PriceTag priceInUsd={price} />
                        <p className="flex gap-1 items-center">
                            <span className="mr-2">{rating.toFixed(1)} Rating</span>
                            {stars.map((isColored, i) => (
                                <FaStar size={16} key={i} className={isColored ? 'text-yellow-500' : 'text-neutral-300'} />
                            ))} 
                        </p>
                        <p className="text-neutral-400">{0} Sold, {reviews.length} Reviews</p>
                        <QuantityInput productId={_id as string} stock={stock} />
                        <p>{description}</p>
                    </div>
                </div>

                <div className="border-t py-4 mt-8 space-y-4">
                    <h2 className="font-bold text-2xl">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            {reviews.length === 0 ? (
                                <div>
                                    <p>There are no reviews, be the first one to leave a review!</p>
                                </div>
                            ) : (
                                reviews.map((review, i) => (
                                    <div key={i} className="space-y-2 p-2 pr-4 rounded-sm">
                                        <div className="flex gap-2">
                                            <h4><span className="font-bold">{review.fullName}</span></h4>
                                            <p className="flex items-center gap-1">
                                                {getStars(review.rating).map((isColored, i) => (
                                                    <FaStar size={16} key={i} className={isColored ? 'text-yellow-500' : 'text-neutral-300'} />
                                                ))}
                                            </p>
                                        </div>
                                        <p>{review.review}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                            <ReviewForm 
                                productId={_id as string} 
                                id={userReview?._id as string} 
                                review={userReview?.review} 
                                rating={userReview?.rating} 
                            />
                        </div>
                    </div>
                </div>
                
                {otherProducts.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="font-bold text-2xl">Other Products</h2>
                        <OtherProducts products={otherProducts} />
                    </div>
                )}
            </div>
        </main>
        <WhatsappIcon />
        </>
    );
}
