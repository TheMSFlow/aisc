"use client";

import { MessageCircle } from "lucide-react";
import Button from "../global/Button";

/**
 * The invitation to The Awakening, the free live session, on the briefings
 * hub. Everyone who attends joins its WhatsApp group first (founder,
 * 2026-10-25), so the button is the group's invite link.
 *
 * `inviteUrl` is THE_AWAKENING_WHATSAPP_INVITE_URL, read on the server by
 * app/awakening/page.js. While it is unset, nothing is drawn.
 *
 * Evergreen by rule: no dates, schedules, prices or countdowns here.
 * The heading avoids the name because the hub itself is titled
 * "The Awakening"; the body names the session.
 */
export default function AwakeningInvite({ inviteUrl, className = "" }) {
  if (!inviteUrl) return null;

  return (
    <aside
      className={`rounded-3xl border border-dark-blue/10 bg-lilac px-6 py-9 sm:px-10 sm:py-10 ${className}`}
    >
      <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/50">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-msaccent" />
            Free · Live
          </p>
          <h2 className="text-balance font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
            Read the briefings. Then join me live.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-blue/70">
            The Awakening is a free private briefing I run live, on the
            realities AI has created for leaders and what you need to do about
            it. The session link and everything you need are shared in its
            WhatsApp group.
          </p>
        </div>
        <Button
          href={inviteUrl}
          variant="dark"
          iconLeft={MessageCircle}
          className="w-fit shrink-0 px-6 py-3"
        >
          Join the WhatsApp group
        </Button>
      </div>
    </aside>
  );
}
