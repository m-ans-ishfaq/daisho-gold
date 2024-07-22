import { FaCheck } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { BsCashStack } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";

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
        label: "COUPONS AND CASHBACK",
        bgColor: "bg-blue-500"
    },
    {
        Icon: RiCouponLine,
        label: "REASONABLE PRICES",
        bgColor: "bg-green-500"
    },
]

export function ShortFeatures()
{
    return (
        <div className="mt-8 p-4 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 container px-0">
                {shortFeatures.map(({Icon, bgColor, label}, i) => (
                    <div key={i} className="cursor-pointer hover:bg-black hover:text-white transition-all duration-300 w-full flex items-center gap-4 rounded-full bg-neutral-100 px-4 py-2">
                        <div className={bgColor + " rounded-full w-8 h-8 flex justify-center items-center text-white text-xl"}>
                            <Icon />
                        </div>
                        <span className="font-semibold">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}