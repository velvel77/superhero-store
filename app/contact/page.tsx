import { error } from "console";
import { Resend } from "resend";

export default async function ContactPage() {
    async function send() {
        "use server";
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev",
                to: "idahenriettakia@gmail.com",
                subject: "Hej, kontakt",
                text: "Tack för ditt meddelande!",
            }),
        });

        const result = await response.json();
        console.log("status:", response.status);
        console.log("result:", JSON.stringify(result));
    }
    return (
        <form action={send}>
            <button type="submit">Send</button>
        </form>
    )
}