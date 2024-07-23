import Image from "next/image";
import Link from "next/link";
import { DaishoGoldLogo } from "../assets";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook, FaPhone, FaTwitter } from "react-icons/fa6";

const footerLinks = [
    [
        {
            label: "Frequently Asked Questions",
            slug: "/about-us#faqs"
        },
        {
            label: "Rules And Regulations For Customers",
            slug: "/about-us#rules-and-regulations"
        },
        {
            label: "About Store",
            slug: "/about-us#store"
        },
        {
            label: "Contact Us",
            slug: "/about-us#contact-us"
        }
    ],
    [
        {
            label: "Featured Products",
            slug: "/#products"
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
        href: "https://www.instagram.com/daishogoldpk/"
    },
    {
        Icon: FaFacebook,
        href: "https://web.facebook.com/people/Daisho-Gold/61557842257625/"
    },
    {
        Icon: FaWhatsapp,
        href: "tel:+81 80-3327-9070"
    }
];

export function Footer() {
    return (
        <footer>
            <div className="text-m-scale-1 sm:text-m-scale-0 p-4 py-12 flex justify-center">
                <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                        {/* Logo */}
                        <Link href="/" className="flex flex-col gap-4 sm:gap-2 cursor-pointer">
                            <Image src={DaishoGoldLogo} alt="Daisho Gold Logo" className="w-[44px] object-contain" />
                            <span className="font-bold text-xl">
                                DAISHO GOLD
                            </span>
                        </Link>
                        <p>
                            Bike parts and accessories<br />
                            At best price
                        </p>
                    </div>
                    {footerLinks.map((list, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            {list.map(({ label, slug }, j) => (
                                <Link key={j} href={slug} className="hover:text-red-500 hover:underline">
                                    {label}
                                </Link>
                            ))}
                        </div>
                    ))}
                    {/* Social Links */}
                    <div className="lg:ml-auto flex flex-col gap-2">
                        <div className="lg:ml-auto flex gap-4">
                            {socialLinks.map(({ Icon, href }, i) => (
                                <Link key={i} href={href} className="hover:text-red-500">
                                    <Icon size={32} />
                                </Link>
                            ))}
                        </div>
                        <p className="text-left lg:text-right">Follow us at social media</p>
                        <div className="flex flex-col lg:items-end text-right">
                            <p className="flex gap-2">
                                <FaPhone size={16} />
                                <span><a href="tel:+818033279070">+81 80-3327-9070</a></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="flex justify-center items-center gap-2 py-4 border-t">
                <FaMapMarkerAlt size={16} />
                <span>Ibaraki prefecture koga city morokawa 934-14, Japan.</span>
            </p>
        </footer>
    )
}