"use client";

import sendMessage from "@/app/contact/action";
import Form from "next/form";
import { useActionState } from "react";

export default function ContactForm() {
    const [state, action, pending] = useActionState(sendMessage, {});

    if (state.success) {
        return <p>Your message was sent, we'll get back to you soon.</p>
    }

    return (
        <Form action={action}>
            <label htmlFor="name" >Name</label>
            <input type="text" name="name" />
            <label htmlFor="email">E mail</label>
            <input type="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea name="message" id=""></textarea>
            <button type="submit" disabled={pending}>{pending ? "Sending..." : "Sent"}</button>
        </Form>
    )
}