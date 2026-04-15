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
    // console.log("API key exists:", !!process.env.RESEND_API_KEY)

    // This will console log audience ID used for newsletter
    // const { data } = await resend.audiences.list();
    // console.log("audiences:", JSON.stringify(data));

    if (!message) {
        return { error: "Message is missing" }
    }


    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.CONTACT_TO_EMAIL!,
        subject: `${name} via Superhero Store`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
        console.log("Error when submitting:", error)
        return { error: "Something went wrong, try again" }
    }

    revalidatePath("/contact/")
    return { success: true };

}

export async function subscribeNewsletter(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email") as string;
    if (!email) {
        return { error: "No email provided" }
    }

    const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    if (error) {
        return { error: "Failed to subscribe, please try again" }
    }
    return { success: true };
}