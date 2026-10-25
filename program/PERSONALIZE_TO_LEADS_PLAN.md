# /personalize emails into `leads`, and every email on the shared design: plan for approval

**Written 2026-10-25, for the founder's approval (rule 21). Nothing is built yet.**

- **First version** (the same day): stop storing finished wizards and send a sealed recommendation. **Set aside** at the founder's word: "This looks like a less efficient strategy. How about leave as is and only add the email and name to leads after the personalize feature is done running."
- **This version** is his approach, with the refinements he accepted ("Yes please"), plus his addition: "All emails should follow the new theme as well."

The standing rule is `WORKING_RULES.md` rule 29: every email or phone capture outside a program writes to `leads`.

---

## 1. What stays exactly as it is

- **The wizard at `/personalize`**: questions, prompt, model, fallback, results screen.
- **Every finished wizard is still stored in `aisc_personalize`**: the seat, currency, the three typed answers, the recommendation, a hashed internet address and the browser. The table stays. From now on it is the record of **anonymous wizard sessions**: it holds no contact details. The 3 rows it holds today (22 October) have none either.
- **The email step's safeguards**: the session id the browser receives is what lets it ask for that one recommendation by email, and each session can be emailed once.

## 2. What changes at the email step

**The form** ("Email me this recommendation" on the results screen):
- adds **First name** (required), beside the email, as on the readiness gate;
- adds the optional, unticked **"email me later" box**, with the same words as the readiness check: "Email me practical notes on AI for leaders, and news of the studio's programs. I can stop them at any time.";
- adds the hidden honeypot field and the time on the form, as every public form has;
- adds a link to the new policy page (section 4).

**intelligence** (`api/public/aisc/personalize/email`):
1. Runs the shared public-form guards: honeypot and timing, the per-visitor limit, the name check, the email check, and the check that the email's domain takes mail.
2. Reads the session by its id, as now. If it was already emailed, it says so and sends nothing.
3. **Claims the session before sending** (marks it as emailed in one guarded step), so two quick clicks cannot send two emails. Today it sends first and marks afterwards. If sending fails, the claim is given back.
4. Sends the recommendation email.
5. **Writes one `leads` row** through the shared helper:
   - source `aisc_personalize`, site `aisc`, page `/personalize`;
   - the first name and email;
   - the "email me later" choice with its exact wording;
   - where the visitor came from (`attribution`, `referrer`, `country`);
   - delivered `personalize_recommendation`;
   - in `details`, the session id (so the lead can be matched to its answers in `aisc_personalize`), the seat and the recommendation's headline.
6. **Writes no email into `aisc_personalize`**: only that the session was emailed, and when. The table's `email` column simply stays empty. No SQL is needed.

**One home for the box's wording.** Its words move out of the readiness files into a shared `leads` file in intelligence. A small public address returns them, and the `/personalize` page reads them there, as the readiness page already does. The readiness check keeps working as it is.

## 3. Every email on the shared design

**From code.** Of the 22 places that send email, 21 already use the shared design (`emailTheme.js`, with the dark-mode fix). The one that does not is the **`/personalize` recommendation email** (`sendRecommendationEmail.js`), which has its own copy of an older look. It moves onto the shared design:
- **Layout kept:** the recommended engagement in a dark card, the alternative in a bordered card, The Awakening in a soft card, and a button for each.
- **Words kept**, plus one greeting line now that the first name is known: "Hi {first name}, here is the recommendation from your answers."

**From Supabase.** The sign-in emails (the code a participant types to sign in) are sent by Supabase from two templates in its dashboard, **Magic Link** (existing accounts) and **Confirm signup** (new accounts). They cannot be changed from code. The plan prepares both as ready-to-paste templates in the shared design, in `intelligence/docs/email-templates/`, each keeping Supabase's code placeholder `{{ .Token }}`. The founder:
1. copies the current templates somewhere safe;
2. pastes the new ones (Supabase: Authentication, then Emails, then Templates);
3. signs in once with his own account to see the result.

**Out of reach:** payment receipts sent by Paystack itself use Paystack's design.

## 4. A policy page for "Find your path"

`/policy/find-your-path`, the same shape as `/policy/ai-readiness-check`, with no WhatsApp section and no retention section, linked from the email form. Drafted in `program/FIND_YOUR_PATH_POLICY.md` and added to the sitemap. It says plainly that:
- **your answers are stored when you finish**, even if you ask for no email;
- **your answers are sent to Anthropic**, whose AI (Claude) writes the recommendation. A policy for this page must name it.
- your first name and email are kept only if you ask for the email, and used for nothing else unless you tick the box;
- it names the other services that handle the data (Resend, Supabase, Vercel), and your choices, as in the readiness policy.

## 5. Files

**intelligence**

| File | Change |
|---|---|
| `src/app/api/public/aisc/personalize/email/route.js` | Guards, claim before sending, the `leads` row, no email in `aisc_personalize` |
| `src/lib/aisc/personalize/schema.js` | The email body gains the first name, the box, where the visitor came from, and the honeypot fields. The first name is optional on the server, so the live site keeps working between the two deployments |
| `src/lib/aisc/personalize/sendRecommendationEmail.js` | Onto `emailTheme.js`, with the greeting |
| `src/lib/leads/leads.js` | Adds the `aisc_personalize` source, and lets a row be written as already delivered |
| `src/lib/leads/optIns.js` (new) | The box wordings, in one place. `src/lib/readiness/scorecard.js` takes them from here |
| `src/app/api/public/leads/opt-ins/route.js` (new) | Returns the box wordings to the AISC site |
| `docs/email-templates/magic-link.html`, `confirm-signup.html` (new) | The two Supabase templates, for the founder to paste |

**aisc**

| File | Change |
|---|---|
| `src/components/personalize/EmailRecommendation.jsx` | First name, the box, the honeypot and timing, where the visitor came from, the policy link |
| `src/app/personalize/page.js` and the flow components | Read the box wording on the server and pass it down |
| `src/app/policy/find-your-path/page.js` (new), `program/FIND_YOUR_PATH_POLICY.md` (new), `src/app/sitemap.js` | The policy page, its draft, the sitemap |

**No new table, no SQL, no new setting.**

## 6. What a visitor notices

- **The email form** asks for a first name, offers the optional box, and links to the policy.
- **The recommendation email** greets them by name and takes the shared look.
- **Sign-in emails** take the shared look once the templates are pasted.
- **Nothing else changes.** The wizard is the same.

## 7. What could break, and why it should not

- **The email step is a tested flow.** Its safeguards stay: the session id, one email per session. It gains the claim before sending, the same pattern as the readiness check.
- **Order of pushing: intelligence first.** Because the first name is optional on the server, the live AISC site keeps working during the few minutes before its own deployment. Leads written in that window would have no name.
- **The Supabase templates:** a missing `{{ .Token }}` would send a sign-in email without its code. The prepared templates keep it, the old ones are copied first, and the founder signs in once to check.
- **The readiness check** only changes where its box wording is kept, not the words. The drift check against Day 2 is unaffected.

## 8. After it is live

1. One live test on `/personalize` with `?src=test`, sent to the founder's own address with his go-ahead: the lead row (name, country, the box), the session marked as emailed with no email in it, and the email on his phone.
2. The founder pastes the two Supabase templates and signs in once.
3. `ARCHITECTURE.md` and `LINK_MAP.md` are brought up to date.

---

## 9. Built, 2026-10-25

Approved: "Approved as written. Build it." Not pushed.

**Built as planned**, with these notes:
- **The greeting** joins the email's existing opening line: "Hi Michael, here is the recommendation you asked to keep. It reflects the answers you gave." Without a name it reads exactly as before.
- **The old form keeps working between the two deployments.** A request without a first name is the form live before this change; it skips the new traps and is let through on the strength of the session id, as before. A request from the new form carries a first name and runs every check.
- **The two policy pages share their frame** (`src/components/policy/PolicyText.jsx`). The readiness policy's words are unchanged.
- **The Supabase templates** are made by `intelligence/scripts/build-email-templates.mjs` from the shared design. Run it again whenever `emailTheme.js` changes.
- **The box wording** lives in `intelligence/src/lib/leads/optIns.js`. The readiness scorecard passes it on through a relative path, because the drift check loads that file with plain Node.

**Checked on this machine**
- Both sites lint and build. The readiness drift check against Day 2 passes.
- `api/public/leads/opt-ins` returns the box wording, and the readiness scorecard still returns both boxes.
- **The email step, with a made-up session id, so nothing was saved or sent:**
  - a request from another site is refused;
  - a filled honeypot and a too-fast form get a quiet "ok";
  - bad fields come back named;
  - an unknown session is refused, in both the new and the old form shape.
- **The recommendation email, rendered by the real code** with sending replaced by a stand-in: the greeting, the shared look in light, and darkened as phone apps do.
- **In the browser:**
  - the form shows first name, email, the box with the shared wording, the note and the policy link, at desktop and phone widths (`aisc/screenshots/personalize-email-form-*.png`);
  - an address whose domain takes no mail is refused with a message under the field;
  - both policy pages render, with no footer.
- **Three wizard runs** made Claude calls and saved three anonymous sessions in `aisc_personalize`, with no email. They can be deleted.

**Found while testing: the 2-second wait.** The AISC server waits at most 2 seconds for intelligence to save the session. If saving is slower, the page gets no session id and the email button never appears, silently. On this machine, two of three runs went over (1.99 s, and 1.76 s inside intelligence plus the journey there and back). The live site is likely faster, but a cold start could cross it. **Raised to 6 seconds the same day** at the founder's word ("Yes, raise it to 6 seconds."): `STORE_TIMEOUT_MS` in `aisc/src/app/api/personalize/route.js`. Only a slow save ever waits that long.

**Still to do after pushing** (intelligence first): one live test with `?src=test` to the founder's address, with his go-ahead; then paste the two Supabase templates and sign in once.

**The Supabase templates, after the founder sent his current ones** (2026-10-25: "I like your own copy but I sent these once so we don't make any errors"). His templates showed what the first draft would have got wrong. The rebuilt set keeps every working part of his, in the shared design and my wording:
- **Confirm signup** says "Your access is approved". It goes out right after an access request is approved on the spot, and when a priority-access invitee first signs in, so "confirm your email" alone would have missed the point.
- **Magic Link** keeps the "Enter code on this device" button to `{{ .SiteURL }}/callback?email={{ .Email }}`. The sign-in page reads the email from that address. The first draft had dropped it.
- **Invite user** is added (`invite-user.html`), with `{{ .ConfirmationURL }}` as a button and as plain text. The app never sends it; only a dashboard invite does.
- **Both code emails say the code works for 1 hour**, as his Confirm signup did.
- **The build script refuses to write a template that loses one of these parts.** `intelligence/docs/email-templates/README.md` says which file goes into which Supabase template, and how to check after pasting.


**Supabase templates pasted and checked, 2026-10-25.** The founder pasted the three templates and signed in: "The code works." At that point the `/personalize` changes were built but not yet pushed (the live `api/public/leads/opt-ins` and `/policy/find-your-path` still answered 404).

**The box always shows (2026-10-25).** The founder: "In the personalize flow, there's no checkbox when trying to receive the personalization by email." His dev server reads the box's wording from the live intelligence, which did not yet have `api/public/leads/opt-ins`, so the page had no wording and left the box out. At his word ("Yes, add the built-in copy of the wording so the box always shows, with the drift check"):
- `aisc/src/lib/leads/optIns.js` holds a built-in copy of the wording, used by `app/personalize/page.js` whenever intelligence's cannot be read;
- `intelligence/scripts/check-readiness-wording.mjs` now also fails if that copy and `intelligence/src/lib/leads/optIns.js` differ (proved on an altered temporary copy). The server still stores its own wording with each lead.
