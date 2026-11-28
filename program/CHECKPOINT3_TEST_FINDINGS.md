# Office Sprint checkpoint 3: test findings

Tested 27 November 2026 by Claude, on localhost against the shared database, with the test organization "TEST Checkpoint 3 Co". **The five high and ten medium findings were fixed the same evening** (founder: "Yes, apply all five", then "Yes apply all ten"), with one more of yours, in `intelligence` only, uncommitted; each says what changed and how it was checked. Five of the low findings were fixed too (founder: "Yes, apply all five"); the other ten are still open. Your own comments from the live pass go in "Your observations" at the end.

## How it was tested

- **People:** the contact (itschinedum@gmail.com, registered as a participant from the admin) and five participants (`itschinedum+p1` to `+p5`), on a custom time.
- **Participant 1 did everything through the real screens:** registration, sign-in, Before Monday, Onboarding, each day live, after its session and after the week closed, all five tools and all five PDFs, and Your results.
- **The others' work was written to the database** in the same shape the tools save, with overlaps on purpose (a shared pain point, the same tasks, a readiness statement people disagree on). The contact finished Monday and Tuesday only.
- **The clock was moved by changing the test sprint's dates**, so each state (before, live, done for today, closed) could be reached in one evening.
- **Admin:** This week, Download all work, Discovery highlights drafted from a made-up call, Themes and Next steps drafted by the AI service, every slide of the presentation, the advisory call, Mark as held, private notes, Release and Withdraw.
- **The contact:** the dashboard during the week and after, Open your report, Add to calendar, and phone sizes.
- **Every report figure was checked by hand against the raw answers** (for example 71% of tasks to AI = 15 of 21; 4 of 11 pieces with nobody looking after them; chosen pain points averaging 4.6 / 3.6 / 3.6). All correct.

## High: fixed 2026-11-27

1. **The Readiness Scorecard PDF belongs to the Challenge, not the sprint.** Both the PDF from the tool and the one from Your results read "AI Stakeholder Challenge · Day 2" in the header and footer, and say "Write all three in your Readiness Scorecard Worksheet, each with a day", a worksheet the sprint does not have. Sprint mode changed the screen but not the PDF (`utils/challenge/readinessSummaryPdf.js` has no sprint mode; `readinessPdfFromSaved()` and the tool both call it). **Fixed:** the builder takes a sprint option. The sprint's PDF reads "AI Stakeholder Office Sprint · Tuesday" in the header and footer, and "Give each of your three moves a day." The Challenge's PDF is unchanged. Checked by reading the text of the PDF from Your results.

2. **The report states as fact something the answers contradict.** The Governance slide ("Rules your people did not write") and the AI Governance foundation ("nobody wrote rules on … asking a manager when unsure") say nobody wrote a rule that participant 1 did write: "When unsure, I ask my manager first." The "rules nobody wrote" are the AI's suggestion, but the report and the next-steps draft present them as a counted finding. In front of leadership, one wrong "nobody" undermines the rest. **Fixed:** they are now "Rules worth adding" on the slide, in the Governance page and in the Themes panel, which says they are suggestions to check against the policy parts. The themes draft must check every policy part before suggesting one, and the next-steps draft is told never to write that nobody wrote them. Saved reports keep their old foundation text until it is drafted again or edited.

3. **The contact's report does not work on a phone.**
   - At 375 px wide, Download PDF sits off the right edge of the screen and cannot be reached.
   - The slides shrink to a strip about 360 px wide, with text too small to read.
   - Even at 711 px, the top bar wraps: "Back to your dashboard" runs to three lines, and "Full screen" and "Download PDF" to two.

   Contacts are likely to open the dashboard link on a phone. **Fixed:**
   - Under 768 px, the contact's report opens as a scrolling page: the same report window as the admin page, with a small PDF button in the bar.
   - Under 640 px, the bar keeps to icons.
   - The PDF still prints the slides.
   - Checked at 375, 820 and 1280 px.

4. **Editing finished work quietly un-finishes it.** Adding one word to a submitted AI policy turned "Done" back into "Ready to submit". The work then drops out of the report and shows as "Started" in the admin until it is submitted again. The only sign is a small grey line. Someone polishing their policy at 11:50 PM on Wednesday, then closing the tab, leaves the report one policy short. The same rule applies to every tool (the save route clears `completed_at` on any save that is not a finish). **Fixed:**
   - My AI Policy, the Data Audit and Value Creation stay finished after an edit, while they are still complete.
   - An edit that leaves them incomplete un-finishes them, and every tool then shows an amber line: "Not finished any more. Finish it again so it counts." Completing it again counts again without pressing Finish.
   - Checked on the Data Audit: an edited first step stayed finished; emptying it un-finished it with the amber line; typing it back counted again.

5. **Answers drop out of the report without the founder seeing them.**
   - **Themes:** 12 of the 47 tasks, pain points and pieces of information fit no theme. The Themes panel never shows them, so they cannot be moved into a theme. One of them was participant 2's first choice ("Matching bank payments to invoices by hand").
   - **Governance:** only the top 6 rules reach the slide (`rules.slice(0, 6)`). Because they are sorted by how many wrote them, the rules under half, the ones the slide is meant to flag "Split: worth settling together", are the first to be cut. In this run, "Say when AI helped with the work" (2 people) was saved but never appeared. **Fixed:**
   - **Themes panel:** under each kind, a folded "Not in any theme (N)" list shows those answers, each with "Add to…" (a theme or a new one). The saved summary says how many answers are in no theme.
   - **Governance:** the slide shows up to 8 rules, in two columns past 5. The panel names any rules beyond 8.
   - **Also found while checking:** at 6 rules, the slide had already been clipping its last rules on laptops. Now 8 fit, checked with an 8th test rule.
   - **All 21 slides checked at 1280 px:** none clips.

## Medium: fixed 2026-11-27

6. **Opening a day page marks a person as "Started".** The tools save an empty record as soon as the page loads, so the admin's This week table shows "Started" for someone who only looked. **Fixed:** the tool's first report, which is just it loading, is not saved. Checked: opening Wednesday saved nothing; the first real change saved. **Also found and fixed:** when work went back to exactly what was last saved (re-rate, then cancel), the save hook kept the in-between state queued and saved it over the finished work. It now drops it.

7. **Names typed into answers reach the AI service.** The Data Audit warns "Never type names, phone numbers…", but nothing stops it. A test entry "Customer complaints log, kept by Mrs Okafor on 08031234567" was saved as typed. It appears in the person's PDF, in Download all work, and in the Themes panel. The phone number was masked as "[number]" before the AI service, but "Mrs Okafor" was sent. The policy says the AI service "receives answers without names", which holds for participants' names but not for names they type. **Fixed:** a title followed by a name ("Mrs Okafor", "Dr Bello", "Pastor…", "Alhaji…") is now masked as "[name]" before answers are sent, with job titles such as "Chief Executive" left alone (`lib/officeSprint/personalDetails.js`). The Data Audit and Value Creation show an amber line under a field that looks like a name or contact detail: "This looks like a name or contact detail. Describe it instead." It warns and never blocks. A bare first name still cannot be spotted.

8. **The discovery highlights are drafted in the third person, but the report speaks to "you".** The report reads "Your objectives: Cut the time *they* spend re-typing orders", and "What you have tried: *They* bought Copilot licences…". The draft also filed the answers to "What do you want to achieve from the sprint" under "Their objectives" and left "What they want from the sprint" empty, so the opportunities' "Serves" links point at sprint wishes, not company objectives. **Fixed:** the draft writes with no "they" or "their" for the organization, and files answers about the sprint under "What they want from the sprint". Re-drafted from the same call: "Cut the time spent re-typing orders" is under the sprint field, the objectives are empty because the call gave none, and the name and phone were still left out. **Then the "Serves" tag was removed** (founder, after a critique: "Yes remove the tag"). It only matched company objectives word for word, so it was often empty, broke when the highlights were edited, and could overclaim. Now the next-steps draft says the link in the opportunity's own text, only when it is real ("This answers what you asked for on the call: less time re-typing orders"). The panel's "Serves" choice is gone too, and older saved reports simply stop showing it. Checked with a fresh draft: two of the 8 opportunities name a link, the rest none, and all 21 slides fit at 1280 px.

9. **The Delegation Tool's rating step still uses the Challenge's jargon.** The sliders read "Human Intelligence Demand", and the matrix reads "LOW HID (1–2)", "HIGH HID (3–5)" and "HIGH AI (4–5)". Only the results table and the PDF were changed to "AI fit" and "Human judgment". **Fixed (sprint only):** the sliders read "AI fit" and "Human judgment", the matrix "Less judgment (1–2)", "More judgment (3–5)", "Strong AI fit (4–5)" and "Weak AI fit (1–3)", and the running list "AI fit 4 · Judgment 3". **Also fixed:** cancelling a re-rate with every task rated now goes back to the results, as Update Rating does, so the work stays finished. The Challenge has the same behaviour and was left alone.

10. **The report can be released before the advisory call is marked held.** The contact's card then says "the same slides your leadership saw at the advisory call", which is untrue if the call has not happened. The release prompt does not mention it. **Fixed:** releasing before the call is held still works, but the prompt says "The advisory call is not marked as held yet. Release … anyway?", and the card reads "Your report is ready." until the call is held. Both checked.

11. **"6 took part" counts registrations.** When only participant 1 had done anything, the report read "6 took part. 0 finished all three sprints." "6 registered" would be accurate. **Fixed:** "6 registered. 5 finished all three sprints.", and the exhibit reads "Who registered".

12. **"Your answers are seen only as group totals, never one by one"** (Before Monday and Onboarding) is broader than the policy. The policy says the organization sees totals and "we see each person's work". "Your organization sees your answers only as group totals" would match it. **Fixed** with that wording (`lib/officeSprint/beforeMonday.js`), which also reaches the contact's "confirmed" forward message.

13. **The Value Creation PDF leaves out "What is happening to this work?"** for each pain point, though people chose it and the report counts it. **Fixed:** the table has a "What is happening" column. Checked in the PDF's text.

14. **The advisory panel still mentions the questionnaire:** "Not given yet in the questionnaire or the discovery highlights." **Fixed:** "Not given yet in the discovery highlights."

15. **One opportunity implies leadership will see personal policies.** The draft "Merge the five draft policies into one signed policy" suggests the individual policies are available to combine, against "never one person's … policy". The AI draft should be told to build the shared policy from the themes, not from the policies. **Fixed:** the next-steps draft is told to build shared rules from the themes and counts and never to suggest combining or reviewing people's own policies or answers. Re-drafted: no such opportunity, and no "nobody wrote" claim. Not saved over the test report's next steps.

## Yours: fixed 2026-11-27

30. **On the contact's dashboard the briefing card sat between the sprint cards** (founder: "The sprint related cards should always appear first then every other card follows"). **Fixed:** on every home, the sprint comes first, whole width: the day tiles, then the sprint the person runs or takes part in. Then the status's own panels (VIP Briefing, learning, Labs), then Recommended (`components/home/StatusHome.jsx`). Checked on the contact's home. A participant who also has another status now sees their sprint panel first and whole width, not in the side column; that case was not on screen in this test.

## Low (five fixed 2026-11-27, the rest open)

16. During the week, the contact's Monday tile reads "Closed" while Monday's work is still accepted until Wednesday night. **Fixed:** a day past its due time reads "Due date passed, still open" until the sprint closes. Checked on the contact's home.
17. After closing, the day page still says "Your work saves as you go", and the Overview still says "Your leadership receives the report on Thursday" after Thursday has passed. **Fixed:** "Everything closed [date]. Your leadership hears what the sprint found at the advisory call.", and "Your work saves as you go" no longer shows once closed. Both checked.
18. A locked day sends people back to the Overview with no message.
19. Clicking Mark as held while another save is running does nothing, with no message. Also seen once: a note typed then saved straight before Mark as held did not keep. It could not be repeated, so it may have been the test's own timing; worth a look.
20. The advisory time can be set in the past without a warning. The calendar file's id includes the time, so a moved call becomes a second calendar event, not an update. **Fixed:** the calendar file keeps one id per organization with a newer version each time, so a moved call updates the event (checked: same id, higher version, new time). A past time shows "This time has passed." in the admin; saving still works.
21. AM and PM are written both ways: "8:30 pm WAT" (cards, Overview, advisory) and "8:30 PM WAT" (forms, headers).
22. The learning center menu cuts off the opening time: "Opens Tue 1 Dec, 8:30 pm W…".
23. Foundation slides give their source as "The advisory call", though they are drafted before it. The Discovery highlights slide's subtitle still says "What you told us before the sprint", the phrase replaced by "Discovery highlights". **Fixed:** the source reads "Next steps, from the findings and the discovery call", and the first highlights slide "What you asked for on the discovery call." All 21 slides checked at 1280 px.
24. On a phone, the Delegation Tool's results table hides the Quadrant column behind a sideways scroll.
25. The first registration took about 12 seconds with only a spinner; later ones took 3 to 4 seconds. Probably the local server compiling on first use: check on the live site.
26. After choosing between tied areas in the Readiness Scorecard, the choice buttons stay on screen under the chosen move.
27. Unanimous counts reveal each person's answer: "6 of 6" answered "No" means leadership knows everyone's answer. Themes also show from 2 people. Both are as agreed; flagged only so the choice is deliberate.
28. The admin pages log a hydration error (the menu button). This is already known and affects no data.
29. **Found during the fixes:** the slides follow the window's width, not the slide's own. In a window narrower than 768 px, At a glance (slide 4) and Readiness (slide 6) clip. This matters only when presenting from a narrow window: contacts get the page view at that width, and the PDF prints at full size.
31. **Found during the fixes:** reloading the Delegation Tool mid-rating shows the current task with both sliders back at 3, not its saved rating, so confirming it would overwrite the rating. **Fixed:** in the sprint, the sliders open on the task's saved rating (checked: a reload on task 3 showed its saved 2 and 4).

## Passed

- Registration: the code, a full sprint, a repeat email and a wrong code were each refused with the right message. The 6th registration confirmed the sprint.
- Lowercase or space-padded departments ("operations ") group with "Operations".
- The clock: locks, "Live now", the join link from 15 minutes before, "Done for today", "Your sprint has closed".
- Work is refused after closing ("Your sprint has closed").
- A participant cannot open the report, Download all work, Release, the advisory call or Themes (all refused).
- All five PDFs build, and Your results rebuilds them after closing.
- Every report figure matches the raw answers, and the team rows stay hidden when a team is under 5.
- The Discovery highlights draft left out the staff name and phone number from the call.
- AISC is recommended for 3 foundations by the code rule.
- The private call notes never reach the contact's page, nor the data sent with it.
- Release shows the report on the contact's dashboard with no email. Withdraw hides it again (the page answers "not found").
- Add to calendar gives a correct 30-minute event at 10:00 WAT with the link.
- "Start over" in a finished tool asks "Reset all? Yes / No".
- Download all work returns the workbook with its six sheets.

## Not covered: needs your live pass

- The emails as they arrive in the inbox: welcome, scheduled, five "You're registered", and confirmed (to the contact and to sales@).
- A real Google Meet session, and presenting full screen on Thursday.
- The report's Download PDF (it opens the browser's print dialog, so it was not run here).
- The contact's view-only sprint. The test contact took part, so the view-only screens were not reached.
- A set slot (only a custom time was used), and a participant in another time zone.
- Everything on the live site after it is deployed.

## Test records to delete

- The `sprint_orgs` row "TEST Checkpoint 3 Co" (id `849b7e7c-2c84-49fb-9e7f-918615aa1c98`), with its 6 `sprint_members` rows and their `sprint_work` rows.
- The accounts created by the test: `itschinedum+p1` to `+p5@gmail.com` (auth users and `users` rows).
- **itschinedum@gmail.com already existed** (name "Fruitful", with a Challenge demo seat and a VIP briefing seat). Setting up the VIP account kept it at status `vip`. Delete nothing there unless you mean to.
- The admin's AI drafts (brief, themes, next steps) live in the org row and go with it.

## Your observations

(Added as you test live.)
