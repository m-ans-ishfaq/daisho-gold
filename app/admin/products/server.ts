"use server";

import { ProductModel } from "@/app/models/product";
import { dbConnect } from "@/lib/dbConnect";

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