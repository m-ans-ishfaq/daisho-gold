"use server";

import { getTransformedProductsForCards } from "@/app/lib/product";
import { ProductModel } from "@/app/models/product";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function getProductsForCards(query?: string|null, toExcludeIds?: string[]) {
    try {
        // Connect to the database
        await dbConnect();
        // Build the search criteria
        const searchCriteria:any = {};

        // If a query exists, add a case-insensitive regex match for title and description
        if (query) {
            const regexQuery = new RegExp(query.replace(/\s+/g, '.*'), 'i'); // Replace spaces with '.*' for loose matching
            searchCriteria.$or = [
                { title: regexQuery },
                { description: regexQuery },
                { bike: regexQuery },
                { category: regexQuery }
            ];
        }

        // If toExcludeIds exist, exclude those product IDs
        if (toExcludeIds && toExcludeIds.length > 0) {
            // @ts-ignore
            searchCriteria._id = { $nin: toExcludeIds.map(id => new mongoose.Types.ObjectId(id)) };
        }

        const products = await ProductModel.find(searchCriteria).limit(8);

        const transformedProducts = getTransformedProductsForCards(products);

        return JSON.stringify(transformedProducts);
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching products');
    }
}

// export async function addProduct(title: string, description: string, images:string[], price: number, stock: number, category?: string)
// {
//     try {
//         dbConnect();
//         const newProduct = new ProductModel({ title, description, images, price, stock, category });
//         const res = await newProduct.save();
//         return JSON.stringify(res);
//     } catch (err) {
//         console.error(err);
//     }
// }

// export async function editProduct(id: string, title: string, description: string, images:string[], price: number, stock: number, category?: string)
// {
//     try {
//         dbConnect();
//         const res = await ProductModel.findOneAndUpdate({ _id: id }, { title, description, images, price, stock, category });
//         return JSON.stringify(res);
//     } catch (err) {
//         console.error(err);
//     }
// }

// export async function deleteProduct(id: string)
// {
//     try {
//         dbConnect();
//         const res = await ProductModel.findOneAndDelete({ _id: id });
//         return JSON.stringify(res);
//     } catch (err) {
//         console.error(err);
//     }
// }