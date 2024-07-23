"use server";

import { ProductModel } from "@/app/models/product";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function getProductsForCards(query?: string|null, toExcludeIds?: string[]) {
    try {
        // Connect to the database
        await dbConnect();
        console.dir(toExcludeIds, { depth: null });
        // Build the search criteria
        const searchCriteria:any = {};

        // If a query exists, add a case-insensitive regex match for title and description
        if (query) {
            const regexQuery = new RegExp(query.replace(/\s+/g, '.*'), 'i'); // Replace spaces with '.*' for loose matching
            searchCriteria.$or = [
                { title: regexQuery },
                { description: regexQuery }
            ];
        }

        // If toExcludeIds exist, exclude those product IDs
        if (toExcludeIds && toExcludeIds.length > 0) {
            // @ts-ignore
            searchCriteria._id = { $nin: toExcludeIds.map(id => new mongoose.Types.ObjectId(id)) };
        }

        // Fetch the products based on the search criteria
        const products = await ProductModel.find(searchCriteria).limit(8);
        // Temporarily Transformation
        const transformedProducts = products.map(({ _id, images, stock, price, title }) => ({
            _id,
            image: images[0],
            isCouponAvailable: false,
            outOfStock: stock == 0,
            price,
            title,
            currency: "PKR",
            rating: 0,
            reviews: 0,
            sold: 0
        }));

        // Return the products as a JSON string
        return JSON.stringify(transformedProducts);
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching products'); // Rethrow the error to handle it in the calling code
    }
}

export async function addProduct(title: string, description: string, images:string[], price: number, stock: number, category?: string)
{
    try {
        dbConnect();
        const newProduct = new ProductModel({ title, description, images, price, stock, category });
        const res = await newProduct.save();
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}

export async function editProduct(id: string, title: string, description: string, images:string[], price: number, stock: number, category?: string)
{
    try {
        dbConnect();
        const res = await ProductModel.findOneAndUpdate({ _id: id }, { title, description, images, price, stock, category });
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteProduct(id: string)
{
    try {
        dbConnect();
        const res = await ProductModel.findOneAndDelete({ _id: id });
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}