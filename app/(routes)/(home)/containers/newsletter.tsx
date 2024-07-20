import Image from "next/image";
import { NewsletterBg } from "../../../assets";

export function Newsletter()
{
    return (
        <section id="newsletter" className="relative p-4 py-40 flex justify-center">
            <div className="container flex justify-center items-center">
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
                            type="email"
                            className="outline-none font-semibold container bg-white text-black px-4 py-2 rounded-l-sm"
                            placeholder="Your Email Address"
                        />
                        <button className="bg-red-500 text-white hover:bg-yellow-500 px-4 py-2 rounded-r-sm">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}