import { FAQS } from "@/app/assets/faqs";
import Accordion from "@/components/ui/accordion";
import { ContactUsForm } from "./containers/form";

export default function AboutUsPage()
{
    return (
        <main>
            <div className="p-4 flex justify-center">
                <div className="container px-0 lg:px-8 flex flex-col gap-4">
                    <div>
                        content
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
                </div>
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
        </main>
    )
}