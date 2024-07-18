"use server";

import { ProductModel } from "@/app/models/product";
import { dbConnect } from "@/lib/dbConnect";

export async function addCategory(title: string, image:string)
{
    try {
        dbConnect();
        const newCategory = new ProductModel({ title, image,  stock });
        const res = await newCategory.save();
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}

export async function editCategory(id: string, title: string, image:string)
{
    try {
        dbConnect();
        const res = await CategoryModel.findOneAndUpdate({ _id: id }, { title, image });
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteCategory(id: string)
{
    try {
        dbConnect();
        const res = await CategoryModel.findOneAndDelete({ _id: id });
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}