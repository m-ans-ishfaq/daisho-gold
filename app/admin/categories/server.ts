"use server";

import { CategoryModel } from "@/app/models/category";
import { dbConnect } from "@/lib/dbConnect";

export async function addCategory(title: string, image:string)
{
    try {
        dbConnect();
        const newCategory = new CategoryModel({ title, image });
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