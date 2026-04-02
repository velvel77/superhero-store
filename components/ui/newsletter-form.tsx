"use client";
import { subscribeNewsletter } from "@/app/contact/action";
import Form from "next/form";
import toast, { Toaster } from "react-hot-toast";

export default function NewsletterForm() {

    const notify = () => toast("You're subscribed to our newsletter!")

    return (
        <Form action={subscribeNewsletter}>
            <label htmlFor="email">Subscribe to newsletter</label>
            <input type="email" name="email" placeholder="Your e mail..." required />
            <button type="submit" onClick={notify}>Subscribe</button>
            <Toaster />
        </Form>
    )
}