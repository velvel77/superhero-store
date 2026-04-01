"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendMessage(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!message) {

        console.error("Invalid message");
        return;
    }



    // const newMessage = {
    //     name,
    //     email,
    //     message
    // }

    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "idahenriettakia@gmail.com",
        subject: "Kontaktmeddelande från Superhero Store",
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
        console.error("Failed o send message:", error);
        return;
    }

    revalidatePath("/contact/")
    redirect("/contact/")


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