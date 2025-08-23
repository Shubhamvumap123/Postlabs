import React from "react";
import { motion, useInView } from "framer-motion";

function AnimWords({
  text,
  as: Tag = "div",
  className = "",
  ariaLabel,
  speed = 0.25, // mirrors data-speed
}: {
  text: string;
  as?: any;
  className?: string;
  ariaLabel?: string;
  speed?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const words = React.useMemo(() => text.split(/\s+/), [text]);

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={ariaLabel || text}
      data-animation="text"
      data-speed={speed}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.03, duration: 0.35, ease: "easeOut" }}
          className="inline-block relative"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export default function FeatureCards() {
  return (
    <section
      className="relative overflow-hidden z-[1] bg-[var(--_neutrals---cream)] text-[var(--_primary---black)]"
      aria-label="Contact Section"
    >
      {/* Inject the minimal CSS variables + some one-off styles to match the original exactly */}
      <style>{`
        :root {
          --_neutrals---cream: #fff7e6; /* fallback for the original var */
          --_primary---black: #0a0a0a;  /* fallback for the original var */
        }
        .cta-link {
          @apply inline-block underline underline-offset-4 decoration-transparent hover:decoration-current transition;
        }
      `}</style>

      {/* Grid Block: For Investors */}
      <div className="grid grid-cols-[20px_1fr_1fr_20px] md:grid-cols-[40px_1fr_1fr_40px] lg:grid-cols-[20%_1fr_1fr_20%] gap-0 border-b border-black/10">
        <div className="col-start-2 col-span-2 py-10 lg:py-16" id="w-node-c15d94b9-0fd6-8d46-7845-1b52e3b32fc3-9f7050be">
          <AnimWords
            as="h1"
            className="text-3xl md:text-4xl font-semibold leading-tight mb-3"
            ariaLabel="For Investors"
            text="For Investors"
            speed={0.25}
          />

          <AnimWords
            className="contact-text max-w-[560px] mb-5 text-base leading-[130%]"
            ariaLabel="We’re raising capital to scale fast. If you’re an investor who believes in the future of independent Canadian media, we’d love to speak with you."
            text="We’re raising capital to scale fast. If you’re an investor who believes in the future of independent Canadian media, we’d love to speak with you."
          />

          <motion.a
            href="mailto:invest@postlabs.com"
            className="cta-link text-base"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            data-animation="fadeup"
          >
            invest@postlabs.com
          </motion.a>
        </div>
      </div>

      {/* Grid Block: For Builders */}
      <div className="grid grid-cols-[20px_1fr_1fr_20px] md:grid-cols-[40px_1fr_1fr_40px] lg:grid-cols-[20%_1fr_1fr_20%] gap-0 border-b border-black/10">
        <div className="col-start-2 col-span-2 py-10 lg:py-16" id="w-node-_175dec5a-7319-e46a-37ab-3a79ddfb6555-9f7050be">
          <AnimWords
            as="h1"
            className="text-3xl md:text-4xl font-semibold leading-tight mb-3"
            ariaLabel="For Builders"
            text="For Builders"
            speed={0.25}
          />

          <AnimWords
            className="contact-text max-w-[560px] mb-5 text-base leading-[130%]"
            ariaLabel="We’re hiring. If you’re passionate about media, technology, and the future of Canada’s digital ecosystem, come build with us. We’re always looking for great people. Check out our jobs page for current opportunities."
            text="We’re hiring. If you’re passionate about media, technology, and the future of Canada’s digital ecosystem, come build with us. We’re always looking for great people. Check out our jobs page for current opportunities."
          />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="max-w-[560px] mb-5"
          >
            <a
              href="https://paint-racer-443.notion.site/Open-Positions-1d64c709c91980cd910eeef05978c45e"
              target="_blank"
              rel="noreferrer"
              className="inline-link underline underline-offset-4"
            >
              jobs page
            </a>
          </motion.p>

          <motion.a
            href="mailto:careers@postlabs.com"
            className="cta-link text-base"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            data-animation="fadeup"
          >
            careers@postlabs.com
          </motion.a>
        </div>
      </div>

      {/* Floating Grid (decorative) */}
      <div className="pointer-events-none grid grid-cols-4 gap-0 w-full max-w-full mx-auto">
        <div className="h-0" id="w-node-_8661b10f-b532-dfc2-ef9a-697dfe026003-fe026002" />
        <div className="h-0" id="w-node-_8661b10f-b532-dfc2-ef9a-697dfe026004-fe026002" />
        <div className="h-0" id="w-node-_8661b10f-b532-dfc2-ef9a-697dfe026005-fe026002" />
        <div className="h-0" id="w-node-b85dc1fd-600b-0140-f64a-68d9b2577a19-fe026002" />
      </div>

      {/* Footer Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[700px] overflow-visible -z-10">
        <div
          className="w-[110%] h-full block overflow-visible -z-10"
          style={{
            backgroundImage:
              "linear-gradient(168deg, rgba(217,217,217,0) 33%, rgba(235,223,117,0.46) 60%, rgba(255,230,0,0.6) 85%)",
            backgroundRepeat: "repeat",
            backgroundPosition: "0 0",
            backgroundSize: "auto",
          }}
        />
        <div
          className="absolute bottom-0 w-[600px] h-[1000px] -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0 100%, rgba(255,230,0,0.6), rgba(0,0,0,0) 58%)",
          }}
        />
      </div>
    </section>
  );
}
