"use client";
import Image from "next/image";
import { NewsletterBg } from "../../../assets";
import { useState } from "react";
import { SubscribeToNewsletter } from "../../newsletter/server";
import { toast } from "@/components/ui/use-toast";

export function Newsletter()
{
    const [email, setEmail] = useState('');

    async function submit(e:any) {
        e.preventDefault();
        try {
            await SubscribeToNewsletter(email);
            toast({
                title: "Thanks for subscribing to your newsletter",
                description: "We will keep you update about our latest products"
            });
            setEmail('');
        } catch(err) {
            toast({
                variant: 'destructive',
                title: "Sorry, but the operation failed!"
            });
        }
    }

    return (
        <section id="newsletter" className="relative p-4 py-40 flex justify-center">
            <form onSubmit={(e) => submit(e)} className="container px-0 flex justify-center items-center">
                <div className="absolute z-[1] w-full h-full top-0 left-0 bg-black" />
                <Image src={NewsletterBg} alt="" className="absolute z-[2] opacity-30 w-full h-full top-0 left-0 object-cover object-center" />
                <div className="w-full text-center relative z-[3] flex flex-col justify-center items-center gap-2 text-white">
                    <h2 className="text-3xl font-bold">
                        SUBSCRIBE TO OUR NEWSELETTER
                    </h2>
                    <p>
                        KEEP UP TO DATE WITH LATEST PRODUCTS
                    </p>
                    <div className="w-full max-w-xl mt-2 flex justify-center">
                        <input
                            required
                            type="email"
                            className="ml-4 outline-none container bg-white text-black px-4 py-2 rounded-l-sm"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button type="submit" className="mr-4 bg-red-500 text-white hover:bg-yellow-500 px-4 py-2 rounded-r-sm">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}