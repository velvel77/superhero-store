import { Star, Quote } from 'lucide-react';

// Mock data
const testimonials = [
  {
    id: 1,
    raiting: 5,
    review: 'The Shadow Ops suit saved my life during the Nexus incident. Worth every credit.',
    author: 'Captain Meridian',
    about: 'League Alpha — Field Commander',
  },
  {
    id: 2,
    raiting: 5,
    review: 'Best gauntlets on the market. The plasma charge holds 3x longer than competitors.',
    author: 'Volt Striker',
    about: 'Solo Vigilante — Metro City',
  },
  {
    id: 3,
    raiting: 5,
    review: 'The Mk-IV visor has thermal, night vision, AND threat assessment. Game changer.',
    author: 'Phantom Weaver',
    about: 'Covert Ops — Shadow Division',
  },
];

export default function ShopTestimonials() {
  return (
    <section className=" bg-(--color-effect-blue) border-y-2 border-white benday-dots px-4 py-16">
      <div className="w-full max-w-260 mx-auto">
        <header className="p-4 relative grid items-center">
          <div className="absolute h-7 w-1 bg-(--color-effect-light-blue)"></div>
          <h2 className="text-white font-bold uppercase italic">HERO TESTIMONIALS</h2>
          <small className="text-(--color-text-muted)">Field-tested. Hero-approved.</small>
        </header>
        <div className="flex gap-5">
          {testimonials.map((testimonial) => (
            <div
              className="testimonial-hover relative flex flex-col gap-4 text-xs border-2 border-(--color-text-muted) bg-(--color-effect-gray) p-4"
              key={testimonial.id}
            >
              <div className="flex">
                {[...Array(testimonial.raiting)].map((_, i) => (
                  <Star className="fill-current text-(--color-effect-yellow) size-4" key={i} />
                ))}
              </div>
              <Quote className="size-6 text-(--color-effect-light-blue) text-secondary/30 absolute top-4 right-4" />
              <p className="text-white">"{testimonial.review}"</p>
              <div className="border-t border-(--color-text-muted) pt-4">
                <h3 className="text-white font-bold uppercase italic">{testimonial.author}</h3>
                <small className="text-(--color-text-muted)">{testimonial.about}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
