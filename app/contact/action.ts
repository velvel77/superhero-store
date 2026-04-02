"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
    success?: boolean;
    error?: string;
}

export default async function sendMessage(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!message) {
        return { error: "Message is missing" }
    }


    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "idahenriettakia@gmail.com",
        subject: `${name} via Superhero Store`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
        return { error: "Something went wrong, try again" }
    }

    revalidatePath("/contact/")
    return { success: true };

}

export async function subscribeNewsletter(formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    if (!email) {
        console.error("No email provided");
        return;

    }

    const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    if (error) {
        console.error("Failed to subscribe bc ", error)
        return;
    }
}