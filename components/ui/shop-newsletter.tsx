import { Zap, Send } from 'lucide-react';

export default function ShopNewsLetter() {
  return (
    <section className="diagonal-stripes flex justify-between border-b-2 border-base-white bg-effect-red px-4 py-16">
      <div className="flex justify-between w-full max-w-260 mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="text-base-white border border-base-white p-2 size-10 rounded-sm" />
          <div>
            <h2 className="uppercase font-bold text-white italic">Join the league</h2>
            <p className="text-base-white/70 uppercase text-[.6rem]">
              Get early access to new drops & exclusive hero deals
            </p>
          </div>
        </div>
        <form className="flex border-2 border-white/80" action="">
          <input className="outline-0 p-2 text-sm text-white" required type="email" placeholder="hero@email.com" />
          <button
            className="p-2 flex items-center gap-2 hover:bg-base-white/90 bg-base-white text-effect-red"
            type="submit"
          >
            <Send className="size-3" /> <span className="text-sm font-bold italic">Enlist</span>
          </button>
        </form>
      </div>
    </section>
  );
}
