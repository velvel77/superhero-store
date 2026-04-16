import { Zap, Send } from 'lucide-react';

export default function ShopNewsLetter() {
  return (
    <section
      id="newsletter-section"
      className="scroll-mt-18 diagonal-stripes flex justify-between border-b-2 border-ui-border bg-secondary-500 px-4 py-16"
    >
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
        <form className="flex border-2 border-ui-border/80" action="">
          <label htmlFor="email-field" className="sr-only">
            Sign up to our newsletter via email
          </label>
          <input
            id="email-field"
            className="outline-0 p-2 text-sm text-basic-100 placeholder:text-basic-200"
            required
            type="email"
            placeholder="hero@email.com"
          />
          <button
            className="p-2 flex items-center gap-2 hover:bg-basic-200 bg-basic-100 text-secondary-500"
            type="submit"
          >
            <Send className="size-3" /> <span className="text-sm font-bold italic">Enlist</span>
          </button>
        </form>
      </div>
    </section>
  );
}
