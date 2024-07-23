import Link from "next/link";

const AUContainer = ({ title, desc, hide }: { title: string; desc: string; hide: boolean; }) => (
    <div className={`flex flex-col justify-between gap-4 ${hide ? 'hidden lg:flex' : ''}`}>
        <div className="space-y-2">
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="text-justify">{desc}</p>
        </div>
        <div>
            <Link href="/about-us#store" className="font-semibold border-b-2 transition-all border-dashed duration-300 hover:border-b-primary-red border-b-primary-yellow pb-1">
                Read More
            </Link>
        </div>
    </div>
)

const AUContainers = ({ hide }: { hide: boolean }) => (
    <>
        <AUContainer {...{hide}} title="We love what we do" desc="We have the best staff which is highly educated. They work for our company to provide our customers with the best quality products. They work hard to satisfy the needs of our customers and have been helping us grow our company for the last 37 years.Our staff is highly cooperative and always tries to perform their best." />
        <AUContainer {...{hide}} title="Our working process" desc="All our digital and online platforms are handovered to professionals.our digital platforms receive your order and sends your order to the warehouse staff, they send the package to the shipping company. We make sure to provide you with your order within 3-5 working days.." />
    </>
)

export function WordsAboutUs()
{
    return (
        <section id="words-about-us" className="flex justify-center px-4 py-20 bg-neutral-50">
            <div className="container grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-20">
                
                <div className="space-y-2 flex flex-col justify-center">
                    <h4 className="capitalize text-primary-yellow font-bold">
                        Some words about us
                    </h4>
                    <h2 className="text-4xl font-medium">
                        Well-coordinated teamwork speaks About Us
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:hidden">
                    <AUContainers hide={false} />
                </div>

                <AUContainers hide={true} />

            </div>
        </section>
    )
}