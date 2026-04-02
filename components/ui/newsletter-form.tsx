"use client";
import { FormState, subscribeNewsletter } from "@/app/contact/action";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialState: FormState = {};

export default function NewsletterForm() {
    const [state, action, pending] = useActionState(subscribeNewsletter, initialState)

    useEffect(() => {
        if (state.success) toast.success("You're subscribed to our newsletter!");
        if (state.error) toast.error(state.error);
    }, [state])

    return (
        <Form action={action}>
            <label htmlFor="email">Subscribe to newsletter</label>
            <input type="email" name="email" placeholder="Your e mail..." required />
            <button type="submit" disabled={pending} >Subscribe</button>
            <Toaster />
        </Form>
    )
}