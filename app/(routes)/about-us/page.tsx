import { FAQS } from "@/app/assets/faqs";
import Accordion from "@/components/ui/accordion";
import { ContactUsForm } from "./containers/form";
import { WordsAboutUs } from "./containers/words-about-us";
import { WhatsappIcon } from "@/app/components/whatsapp";
import { AboutStore } from "./containers/about-store";
import { AboutUsCard } from "./containers/card";
import { RulesAndRegulations } from "./containers/rules-and-regulations";

export default function AboutUsPage()
{
    return (
        <main>
            <div className="p-4 flex justify-center">
                <div className="container px-0 flex flex-col gap-4">
                    <div>
                        <WordsAboutUs />
                        <AboutStore />
                        <div className="pb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AboutUsCard
                                title="Our company history and facts"
                                desc="Daisho gold is a 37 years old international high value company that makes two wheel vehicle engine parts. This company is well known for its high quality and high grade finishing products. Our products are specifically made for each model of the vehicle to provide you with the best products that enhances your bike driving experience better in every way possible."
                            />
                            <AboutUsCard
                                title="Design & development process demonstration"
                                desc="Daisho gold provides you with the best high quality products having the finest finishing to give you the ride experience you have never had before. The products provided by daisho gold are highly durable and are produced by measuring the products on high scale. High grade finishing enhances the riding experience to another level."
                            />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                        <section id="faqs" className="space-y-4">
                            <h2 className="font-bold text-xl">Frequently Asked Questions</h2>
                            <Accordion items={FAQS} />
                        </section>
                        <section id="contact-us" className="space-y-4">
                            <h2 className="font-bold text-xl">Contact Us</h2>
                            <div className="bg-neutral-50 border rounded-md p-4">
                                <ContactUsForm />
                            </div>
                        </section>
                    </div>

                    {/* Maps */}
                    <div className="w-full h-[50vh]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093703!2d144.96305791568005!3d-37.81410767975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9ec8e36eb0!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1600124235520!5m2!1sen!2sau"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>

                    <RulesAndRegulations />
                </div>
            </div>

            <WhatsappIcon />
        </main>
    )
}