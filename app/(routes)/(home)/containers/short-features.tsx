import { FaCheck } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { BsCashStack } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import Image from "next/image";
import { GoldWalletImg } from "@/app/assets";
import Link from "next/link";

const shortFeatures = [
    {
        Icon: FaCheck,
        label: "100% AUTHENTIC PARTS",
        bgColor: "bg-red-500"
    },
    {
        Icon: GoArrowSwitch,
        label: "EASY TO RETURN",
        bgColor: "bg-yellow-500"
    },
    {
        Icon: BsCashStack,
        label: "DISCOUNTS CASHBACK",
        bgColor: "bg-blue-500"
    },
    {
        Icon: RiCouponLine,
        label: "REASONABLE PRICES",
        bgColor: "bg-green-500"
    },
];

export function ShortFeatures() {
    return (
        <div className="mt-4 p-4 flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container px-0">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left md:gap-8 gap-4 lg:gap-8">

                    <Image className="w-40 object-contain" src={GoldWalletImg} alt="Gold wallet image" />

                    <div className="space-y-2">
                        <div>
                            <h4 className="font-semibold text-primary-yellow">
                                Featuring Gold Wallet
                            </h4>
                            <h2 className="font-bold text-neutral-600 text-2xl">
                                3% CASHBACK ON EVERY PURCHASE
                            </h2>
                        </div>
                        <p className="text-neutral-500">
                            Don&apos;t miss out on this amazing offer! <br />
                            <Link href="#shop-now" className="font-medium hover:text-primary-red text-primary-yellow">
                                Shop Now
                            </Link>
                            {" "}to enjoy 3% cashback on every purchase and get exclusive discounts today! Start saving on high-quality bike parts and more.
                        </p>
                    </div>

                </div >
                <div className="flex items-center w-full">
                    <div className="w-full grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 h-min justify-center gap-4">
                        {shortFeatures.map(({ Icon, bgColor, label }, i) => (
                            <div
                                key={i}
                                className={`cursor-pointer hover:bg-black hover:text-white transition-all duration-300 w-full flex items-center gap-4 rounded-full bg-neutral-100 px-4 py-2`}
                            >
                                <div className={bgColor + " rounded-full w-8 h-8 flex justify-center items-center text-white text-xl"}>
                                    <Icon />
                                </div>
                                <span className="font-semibold text-sm">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}