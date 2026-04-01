import sendMessage from "@/app/contact/action";
import Form from "next/form";

export default function ContactForm() {
    return (
        <Form action={sendMessage}>
            <label htmlFor="name" >Name</label>
            <input type="text" name="name" />
            <label htmlFor="email">E mail</label>
            <input type="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea name="message" id=""></textarea>
            <button type="submit">Send message</button>
        </Form>
    )
}