import Section from "@/components/layout/Section";

const NOT = [
  {
    title: "Not one-on-one consulting.",
    body: "Your challenge is private. Your coaching is a group, by design.",
  },
  {
    title: "Not a cheaper way into the challenge.",
    body: "It is the full challenge, delivered privately, plus months of guided execution.",
  },
  {
    title: "Not a course.",
    body: "Nothing to watch and forget. Every session works on your Roadmap and your decisions.",
  },
];

export default function CoachingGroup() {
  return (
    <div className="bg-offwhite">
      <Section id="why-a-group" spacing="compact" width="default">
        <div className="max-w-4xl">
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            Why a group
          </p>
          <blockquote className="font-ptsans text-4xl italic leading-[1.05] tracking-tight text-dark-blue sm:text-5xl lg:text-6xl">
            You begin privately. You continue among leaders working through
            the same Roadmap.
          </blockquote>
          <div className="mt-10 grid gap-6 text-base font-light leading-relaxed text-dark-blue/65 sm:grid-cols-2 sm:gap-10">
            <p>
              Your questions still get answered directly. Your situation still
              gets attention. What the group adds is everything you would not
              think to ask: the leader two weeks ahead of you in Phase 2, the
              blocker someone else hit before you reached it.
            </p>
            <p>
              Your thinking sharpens as you watch other leaders navigate the
              same phases in different worlds. Your fluency compounds. The
              territory you declared in the challenge gets built.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-dark-blue/10 pt-10 sm:grid-cols-3">
          {NOT.map((n) => (
            <div key={n.title}>
              <p className="font-ptsans text-lg font-bold uppercase leading-tight tracking-tight text-dark-blue">
                {n.title}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-dark-blue/60">
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
