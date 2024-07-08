import Image from "next/image";
import Link from "next/link";
import { DaishoGoldLogo } from "../assets";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook, FaTwitter } from "react-icons/fa6";

const footerLinks = [
    [
        {
            label: "Frequently Asked Questions",
            slug: "/faqs"
        },
        {
            label: "Terms of Services",
            slug: "/terms-of-services"
        },
        {
            label: "Privacy Policy",
            slug: "/privacy-policy"
        },
        {
            label: "Customer Support",
            slug: "/help"
        },
    ],
    [
        {
            label: "Featured Products",
            slug: "#"
        },
        {
            label: "Check Cart",
            slug: "/cart"
        },
        {
            label: "Order History",
            slug: "/order-history"
        },
        {
            label: "Current Orders",
            slug: "/current-orders"
        }
    ]
];

const socialLinks = [
    {
        Icon: FaInstagram,
        href: "#"
    },
    {
        Icon: FaFacebook,
        href: "#"
    },
    {
        Icon: FaTwitter,
        href: "#"
    },
    {
        Icon: FaYoutube,
        href: "#"
    },
    {
        Icon: FaWhatsapp,
        href: "#"
    }
];

export function Footer()
{
    return (
        <footer className="p-4 py-12 flex justify-center">
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col gap-2 cursor-pointer">
                        <Image src={DaishoGoldLogo} alt="Daisho Gold Logo" className="w-[44px] object-contain" />
                        <span className="font-bold text-xl">
                            DAISHO GOLD
                        </span>
                    </Link>
                    <p>
                        Bike parts and accessories<br/>
                        At best price
                    </p>
                </div>
                {footerLinks.map((list,i) => (
                    <div key={i} className="flex flex-col gap-4">
                        {list.map(({label, slug}, j) => (
                            <Link key={j} href={slug} className="hover:text-red-500 hover:underline">
                                {label}
                            </Link>
                        ))}
                    </div>
                ))}
                {/* Social Links */}
                <div className="lg:ml-auto flex gap-4">
                    {socialLinks.map(({Icon, href}, i) => (
                        <Link href={href} className="hover:text-red-500">
                            <Icon size={32} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}