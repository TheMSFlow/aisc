import Image from "next/image";

const APPLY_URL =
  "https://intelligence.michaelsteve.com/form/opportunity/ai-apprentice";



export default function ApprenticeHero() {
  return (
    <section className="flex w-full flex-col">
      {/* BANNER — full bleed, reference aspect, floors at a readable height */}
      <div className="gradient-200 relative w-full shrink-0 overflow-hidden aspect-[16/4.3]">
        {/* graduates: flush to the floor, clipped slightly by the left edge */}
        <div className="absolute bottom-0 left-[-1.5%] h-[72%]">
          <Image
            src="/aica/graduates.png"
            alt="Three graduates of the AI Career Apprentice programme"
            width={900}
            height={1100}
            priority
            className="h-full w-auto select-none object-contain object-bottom"
          />
        </div>

        {/* wordmark */}
        <div className="absolute inset-x-0 top-[16%] flex justify-center px-4">
          <div className="text-center">
            <p className="font-ptsans font-normal tracking-[0.46em] text-white text-[1.875vw] md:text-[1.67vw] w-fit mx-auto">
              Michael Steve&rsquo;s
            </p>

            <div className="relative mx-auto mt-[0.35em] w-fit">
              <Image
                src="/aica/graduate-file.png"
                alt=""
                aria-hidden="true"
                width={220}
                height={220}
                className="pointer-events-none absolute left-[-11%] top-[-2%] w-[26%] -rotate-12 select-none"
              />
              <Image
                src="/aica/career-launch.png"
                alt=""
                aria-hidden="true"
                width={220}
                height={220}
                className="pointer-events-none absolute right-[-13%] top-[30%] w-[24%] select-none"
              />
              <h1 className="relative leading-[1.18] tracking-tight text-lilac/85 text-[7.15vw] w-fit">
                <span className="block font-inter font-bold">AI Career</span>
                <span className="block font-inter font-medium">Apprentice</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Apply, top-right of the banner. Floored rather than scaled with
            the viewport like everything else here: it is a tap target, and a
            proportional one would render at about 4px of text on a phone.
            Hidden below sm, where the banner is a ~105px strip and this would
            land on the wordmark. The mobile CTA sits under the vision. */}
        <a
          href={APPLY_URL}
          className="absolute right-6 top-6 hidden items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-msaccent transition-colors hover:bg-lilac focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex"
        >
          Apply Now
        </a>

        <div className="absolute bottom-2 sm:bottom-4 right-4 flex flex-col sm:flex-row items-center gap-1 lg:gap-2">
          <span className="font-semibold text-white text-[0.375rem] sm:text-[1.25vw] md:text-[1.1vw] xl:text-xs">
            Sponsored by
          </span>
          <div className="flex flex-row gap-1">
            <Image
              src="/aica/sponsor_aisc.svg"
              alt="AI Stakeholder Challenge"
              width={16}
              height={16}
              className="xl:h-[24] xl:w-[24] select-none"
            />
            <Image
              src="/aica/sponsor_ms.svg"
              alt="Michael Steve"
              width={16}
              height={16}
              className="xl:h-[24] xl:w-[24] select-none"
            />
          </div>
        </div>
      </div>

      {/* VISION — shares the viewport with the banner */}
      <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
        <p className="mx-auto w-full max-w-4xl text-dark-blue text-lg leading-[1.55] sm:text-2xl lg:text-[2rem] lg:leading-normal">
          Our vision is to build the next generation of AI Stakeholders by
          equipping aspiring leaders with the{" "}
          <U href="#the-awakening" tone="text-msaccent decoration-msaccent">
            mindset
          </U>{" "}
          and{" "}
          <U href="#ai-career-labs" tone="text-warning decoration-warning">
            skillset
          </U>{" "}
          to be more attractive to employers,{" "}
          <U href="#the-mentorship" tone="text-dark-blue decoration-dark-blue">
            productive in any ecosystem
          </U>{" "}
          and an{" "}
          <U href="#the-apprenticeship" tone="text-[#1A5C45] decoration-[#1A5C45]">
            asset to the best organizations
          </U>
          .
        </p>
      </div>

      {/* CTA below md: the banner is too short to hold a corner button until
          768px, so it sits under the vision statement instead. */}
      <div className="px-5 pb-10 md:hidden">
        <a
          href={APPLY_URL}
          className="gradient-200 inline-flex w-full items-center justify-center rounded-lg py-3 px-8 font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent focus-visible:ring-offset-2 sm:w-auto"
        >
          Apply Now
        </a>
      </div>
    </section>
  );
}

// The underline is carried straight from the reference. Each phrase links to
// the section that delivers it, and both the words and the rule take that
// section's colour, so the destination is legible before the click. All four
// clear AA on white: msaccent is the tightest at 4.64:1.
function U({ href, tone, children }) {
  return (
    <a
      href={href}
      className={`rounded-sm underline decoration-2 underline-offset-[6px] ${tone} transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent focus-visible:ring-offset-2`}
    >
      {children}
    </a>
  );
}
