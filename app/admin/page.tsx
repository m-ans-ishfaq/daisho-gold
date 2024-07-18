import Link from 'next/link';
import { RiAppsLine, RiShoppingCartLine, RiFileListLine, RiCoupon2Line } from 'react-icons/ri';

const cards = [
    {
        label: 'Categories',
        Icon: RiAppsLine,
        slug: 'categories'
    },
    {
        label: 'Products',
        Icon: RiShoppingCartLine,
        slug: 'products'
    },
    {
        label: 'Orders',
        Icon: RiFileListLine,
        slug: 'orders'
    },
    {
        label: 'Coupons',
        Icon: RiCoupon2Line,
        slug: 'coupons'
    }
];

export default function Admin()
{
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4">
                {cards.map(({Icon, label, slug}, i) => (
                    <Link className='border rounded-md p-4 hover:bg-black hover:text-white flex flex-col gap-4 items-center' href={"/admin/" + slug} key={i}>
                        <Icon size={32} />
                        <p className='font-semibold text-lg'>{label}</p>
                    </Link>
                ))}
            </div>
        </main>
    )
}