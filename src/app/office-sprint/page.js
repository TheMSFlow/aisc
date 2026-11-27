import { Newsreader } from "next/font/google";
import OfficeSprintHeader from "@/components/office-sprint/OfficeSprintHeader";
import OfficeSprintWeek from "@/components/office-sprint/OfficeSprintWeek";
import SprintMotion from "@/components/office-sprint/SprintMotion";
import OfficeSprintReport from "@/components/office-sprint/OfficeSprintReport";
import {
  OfficeSprintHero,
  OfficeSprintPains,
  OfficeSprintDays,
  OfficeSprintBehind,
  OfficeSprintFit,
  OfficeSprintOutside,
  OfficeSprintFAQ,
} from "@/components/office-sprint/OfficeSprintSections";

// The report's title face, on this page only (founder, 2026-11-27: the page
// and its sample report rebuilt in the report's executive style).
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const TITLE = "AI Stakeholder Office Sprint | Michael Steve";
const DESCRIPTION =
  "For organizations that know AI matters, but not what to do next. Three live sprints of 45 minutes for 5 to 20 key people, Monday to Wednesday, then a report for your leadership on Thursday: where AI fits, what stands in the way, how your people respond and the AI policy they would keep.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/office-sprint",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/office-sprint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function OfficeSprintPage() {
  return (
    <div className={`${newsreader.variable} os-page`}>
      <SprintMotion />
      <OfficeSprintHeader />
      <main>
        <OfficeSprintHero />
        <OfficeSprintPains />
        <OfficeSprintDays />
        <OfficeSprintWeek />
        <OfficeSprintReport />
        <OfficeSprintBehind />
        <OfficeSprintFit />
        <OfficeSprintOutside />
        <OfficeSprintFAQ />
      </main>
      {/* No footer, as on /coaching: the page exists to take applications. */}
    </div>
  );
}
