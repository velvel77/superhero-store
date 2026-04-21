'use client';
import { FormState, subscribeNewsletter } from '@/app/contact/action';
import { Zap, Send } from 'lucide-react';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialState: FormState = {};

export default function ShopNewsLetter() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialState);

  useEffect(() => {
    if (state.success) toast.success("You're subscribed to our newsletter!");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <section
      id="newsletter-section"
      className="scroll-mt-18 overflow-clip diagonal-stripes relative flex justify-between border-y-2 border-ui-border bg-secondary-500 px-4 py-16"
    >
      <div className="absolute -left-20 -top-20 w-80 h-80 opacity-10 animate-rotate">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={Math.round(100 + 100 * Math.cos((i * Math.PI * 2) / 16))}
              y2={Math.round(100 + 100 * Math.sin((i * Math.PI * 2) / 16))}
              stroke="white"
              strokeWidth="4"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between w-full max-w-260 mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="text-basic-100 border border-basic-100 p-2 size-10 rounded-sm" />
          <div>
            <h2 className="uppercase font-bold text-basic-100 italic">Join the league</h2>
            <p className="text-basic-300 uppercase text-[.7rem]">
              Get early access to new drops & exclusive hero deals
            </p>
          </div>
        </div>
        <Form className="flex border rounded-sm border-ui-border/80" action={action}>
          <label htmlFor="email-field" className="sr-only">
            Sign up to our newsletter via email
          </label>
          <input
            id="email-field"
            name="email"
            className="outline-0 p-2 text-sm text-basic-100 placeholder:text-basic-200"
            required
            type="email"
            placeholder="hero@email.com"
          />
          <button
            className="p-2 flex w-20 group items-center gap-2 bg-basic-100 text-secondary-500"
            type="submit"
            disabled={pending}
          >
            <div className="text-sm font-bold flex items-center gap-2">
              <Send className="size-3 group-hover:rotate-45 transition-all duration-200" />
              <span className="group-hover:tracking-widest italic transition-all duration-200">
                {pending ? 'Enlisting...' : 'Enlist'}
              </span>
            </div>
          </button>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: 'bg-basic-800 text-basic-100 border border-ui-border',
            }}
          />
        </Form>
      </div>
    </section>
  );
}
