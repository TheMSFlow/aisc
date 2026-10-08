import Link from "next/link";

export default function AuthorBlock() {
  return (
    <div className="mt-14 flex items-center gap-4 border-t border-dark-blue/10 pt-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark-blue font-ptsans text-sm font-bold text-white">
        MS
      </div>
      <div>
        <p className="font-ptsans text-base font-bold uppercase tracking-tight text-dark-blue">
          Michael Steve
        </p>
        <p className="text-sm font-light text-dark-blue/60">
          AI Clarity Consultant and founder of the{" "}
          <Link
            href="/"
            className="text-msaccent underline decoration-msaccent/40 underline-offset-2 hover:decoration-msaccent"
          >
            AI Stakeholder Challenge
          </Link>
          . Helping leaders move from AI awareness to AI leadership.
        </p>
      </div>
    </div>
  );
}
