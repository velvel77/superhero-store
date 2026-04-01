"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export default async function sendMessage(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!message) {

        console.error("Invalid message");
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // const newMessage = {
    //     name,
    //     email,
    //     message
    // }

    const { data, error } = await resend.emails.send({
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