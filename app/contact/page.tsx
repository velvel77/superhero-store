import ContactForm from "@/components/ui/contact-form";
import NewsletterForm from "@/components/ui/newsletter-form";

export const metadata = {
    title: "Superhero Store - Contact",
    description: "Welcome to contact us or subscribe to our newsletter",
}

export default function ContactPage() {

    return (
        <>
            < ContactForm />

            <NewsletterForm />
        </>
    )
}