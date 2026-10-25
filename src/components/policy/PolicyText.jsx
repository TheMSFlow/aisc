import Link from "next/link";

// The shared frame and text parts of the policy pages under /policy: the
// wordmark, a narrow article, and the heading, paragraph, list and bold styles.
// No site footer and no briefings on these pages (founder, 2026-10-25).

export function PolicyPage({ title, lastUpdated, children }) {
  return (
    <main className="flex min-h-screen flex-col bg-offwhite">
      <div className="px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-ptsans text-lg tracking-wide text-dark-blue sm:text-xl">
          AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
        </Link>
      </div>

      <article className="w-full px-5 pb-24 pt-10 sm:px-6 md:pt-16 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="text-balance font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl">
            {title}
          </h1>
          {children}
          <p className="mt-10 border-t border-dark-blue/10 pt-6 text-sm text-dark-blue/50">
            Last updated {lastUpdated}
          </p>
        </div>
      </article>
    </main>
  );
}

export function Lead({ children }) {
  return <p className="mt-6 text-lg leading-relaxed text-dark-blue/70">{children}</p>;
}

export function Heading({ children }) {
  return (
    <h2 className="mt-14 font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
      {children}
    </h2>
  );
}

export function P({ children }) {
  return <p className="mt-4 text-base leading-relaxed text-dark-blue/75">{children}</p>;
}

export function List({ children }) {
  return (
    <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-base leading-relaxed text-dark-blue/75 marker:text-msaccent">
      {children}
    </ul>
  );
}

export function B({ children }) {
  return <strong className="font-semibold text-dark-blue">{children}</strong>;
}

export function ContactLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-msaccent underline underline-offset-2 hover:text-dark-blue"
    >
      {children}
    </a>
  );
}
