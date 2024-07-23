import mongoose from "mongoose";
import { IProductDocument } from "../models/product";

export const getTransformedProductsForCards = (products: (mongoose.Document<unknown, {}, IProductDocument> & IProductDocument & Required<{
    _id: unknown;
}>)[]) => {
    return products.map(({ _id, images, stock, price, title, category, bike }) => ({
        _id,
        image: '/products/' + images[0],
        isCouponAvailable: false,
        outOfStock: stock == 0,
        price,
        title,
        currency: "PKR",
        category,
        bike
    }));
}