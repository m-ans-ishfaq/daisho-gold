"use server";

import { ProductModel } from "@/app/models/product";
import { UserModel } from "@/app/models/user";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function getFullnameById(id: string)
{
    await dbConnect();
    // Case of admin
    if (id === "1") return "Admin";
    try {
        const user = await UserModel.findById(id, { fullName: 1 });
        return user?.fullName;
    } catch(err) {
        console.error(err);
    }
}

export async function getUserById(id: string)
{
    await dbConnect();
    // Case of admin
    if (id === "1") return null;
    try {
        const user = await UserModel.findById(id);
        return JSON.stringify(user);
    } catch(err) {
        console.error(err);
    }
}

export async function addToCart(id: string, productId: string, quantity: number)
{
    await dbConnect();
    try {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        const existingCartItem = user.cart.find(
            (item) => item.productId.toString() === productId
        );

        const product =  await ProductModel.findById(productId);
        if (!product) throw new Error();

        if (existingCartItem) {
            if ((existingCartItem.quantity + quantity) <= product.stock) {
                existingCartItem.quantity += quantity;
            } else {
                throw new Error();
            }
        } else {
            user.cart.push({
                //@ts-ignore
                productId: new mongoose.Types.ObjectId(productId),
                quantity,
                dateAdded: new Date(),
            });
        }
        await user.save();
        return true;
    } catch(err) {
        console.error(err);
        return false
    }
}