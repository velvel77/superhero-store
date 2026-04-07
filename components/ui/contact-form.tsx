"use client";

import sendMessage from "@/app/contact/action";
import Form from "next/form";
import { useActionState, useOptimistic } from "react";


export default function ContactForm() {
    const [state, action, pending] = useActionState(sendMessage, {});
    const [optimisticState, setOptimistic] = useOptimistic(state);

    async function handleAction(formData: FormData) {
        setOptimistic({ success: true });
       
        action(formData);
    }

    if (optimisticState.success) {
        
        return <p>Your message was sent, we'll get back to you soon.</p>
    }

    return (
        <Form action={handleAction}>
            <label htmlFor="name" >Name</label>
            <input type="text" name="name" required />
            <label htmlFor="email">E mail</label>
            <input type="email" name="email" required />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="" required ></textarea>
            {optimisticState.error && <p style={{ color: "red" }}>{optimisticState.error}</p>}
            <button type="submit" disabled={pending}>{pending ? "Sending..." : "Send"}</button>
        </Form>
    )
}