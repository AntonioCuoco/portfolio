import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <div id="contact" className="flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-4 md:p-6 border rounded-[16px] md:rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-3 md:gap-4">
                <h1 className="text-3xl md:text-4xl font-tanker">Contact Me</h1>
                <p className="text-base md:text-xl">Fill out the form below to get in touch with me.</p>
            </div>
            <ContactForm />
        </div>
    )
}