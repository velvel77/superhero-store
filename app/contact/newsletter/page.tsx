import Form from "next/form";
import { subscribeNewsletter } from "../action";

export default function NewsletterPage() {
    return (
        <Form action={subscribeNewsletter}>
            <label htmlFor="email">Subscribe to newsletter</label>
            <input type="email" name="email" placeholder="Your e mail..." required />
            <button type="submit">Subscribe</button>
        </Form>
    )
}