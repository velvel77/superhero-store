import { subscribeNewsletter } from "@/app/contact/action";
import Form from "next/form";

export default function NewsletterForm(){
    return(
        <Form action={subscribeNewsletter}>
            <label htmlFor="email">Subscribe to newsletter</label>
            <input type="email" name="email" placeholder="Your e mail..." required />
            <button type="submit">Subscribe</button>
        </Form>
    )
}