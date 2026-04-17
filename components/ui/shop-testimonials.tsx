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
    <section
      id="testimonials-section"
      className="scroll-mt-18 bg-basic-700 border-y-2 border-ui-border benday-dots px-4 py-16"
    >
      <div className="w-full max-w-260 mx-auto">
        <header className="p-4 relative grid items-center">
          <div className="absolute h-7 w-1 bg-effect-light-blue"></div>
          <h2 className="text-basic-100 font-bold uppercase italic">HERO TESTIMONIALS</h2>
          <small className="text-basic-300">Field-tested. Hero-approved.</small>
        </header>
        <div className="flex gap-5">
          {testimonials.map((testimonial) => (
            <div
              className="testimonial-hover relative flex flex-col gap-4 text-sm border-2 border-ui-border bg-basic-600 p-4"
              key={testimonial.id}
            >
              <div className="flex">
                {[...Array(testimonial.raiting)].map((_, i) => (
                  <Star aria-hidden className="fill-current text-primary-500 size-4" key={i} />
                ))}
              </div>
              <Quote className="size-6 text-effect-light-blue text-secondary/30 absolute top-4 right-4" />
              <p className="text-basic-100">"{testimonial.review}"</p>
              <div className="border-t border-ui-border pt-4">
                <h3 className="text-basic-100 font-bold uppercase italic">{testimonial.author}</h3>
                <small className="text-basic-300">{testimonial.about}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
