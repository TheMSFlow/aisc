/**
 * Single source of truth for The Awakening blog taxonomy.
 *
 * Every entry: { id, label, shortLabel, description, seo: { title, description }, blurb }
 * - `seo` feeds generateMetadata on the category landing page
 * - `blurb` is the on-page intro under the category heading
 *
 * IDs appear in URLs and in article frontmatter. Never rename an id without
 * adding a redirect; add new entries freely.
 */

export const INDUSTRIES = {
  business: {
    id: "business",
    label: "Business & Corporate",
    shortLabel: "Business",
    description:
      "Executives and owners leading companies through the AI transition.",
    seo: {
      title: "AI Leadership for Business & Corporate Leaders",
      description:
        "Briefings for executives and business owners on leading with AI: clarity, governance, and the territory opening in your market before your competitors claim it.",
    },
    blurb:
      "Your competitors are not waiting for clarity. These briefings cover what AI means for the businesses you run, the people you lead, and the decisions only you can make.",
  },
  faith: {
    id: "faith",
    label: "Faith & Ministry",
    shortLabel: "Faith",
    description:
      "Pastors, bishops, and ministry leaders stewarding communities through the AI era.",
    seo: {
      title: "AI Leadership for Faith & Ministry Leaders",
      description:
        "Briefings for pastors and ministry leaders on AI: protecting your people from what is coming, redeeming your time, and leading your community with clarity.",
    },
    blurb:
      "Your congregation will meet AI with or without your guidance. These briefings help you lead that encounter instead of reacting to it.",
  },
  government: {
    id: "government",
    label: "Government & Politics",
    shortLabel: "Government",
    description:
      "Public officials, policy leaders, and campaign teams navigating AI in the public sphere.",
    seo: {
      title: "AI Leadership for Government & Public Sector Leaders",
      description:
        "Briefings for public officials and policy leaders on AI governance, public trust, and the decisions the public sphere cannot delegate to vendors.",
    },
    blurb:
      "The public sphere is where ungoverned AI does its most visible damage. These briefings cover the judgment calls that cannot be outsourced.",
  },
  creators: {
    id: "creators",
    label: "Creator Economy & Media",
    shortLabel: "Creators",
    description:
      "Influencers, media leaders, and creators whose platform is their institution.",
    seo: {
      title: "AI Leadership for Creators & Media Leaders",
      description:
        "Briefings for creators and media leaders on AI: protecting your voice, multiplying your output, and claiming territory in a market AI just reopened.",
    },
    blurb:
      "AI made content abundant, which made a trusted voice scarce. These briefings are about leading your audience, not just feeding it.",
  },
  healthcare: {
    id: "healthcare",
    label: "Healthcare",
    shortLabel: "Healthcare",
    description:
      "Healthcare executives and clinical leaders balancing AI's promise against its risk.",
    seo: {
      title: "AI Leadership for Healthcare Leaders",
      description:
        "Briefings for healthcare executives on AI: governance where the stakes are human, time redeemed from administration, and leading clinicians through the transition.",
    },
    blurb:
      "Nowhere are the stakes of ungoverned AI higher than where patients are involved. These briefings cover leading the transition safely.",
  },
  education: {
    id: "education",
    label: "Education",
    shortLabel: "Education",
    description:
      "School leaders, administrators, and academic executives leading institutions through AI.",
    seo: {
      title: "AI Leadership for Education Leaders",
      description:
        "Briefings for education leaders on AI: policy your institution actually needs, faculty who are already using it, and preparing students for what is coming.",
    },
    blurb:
      "Your students and faculty adopted AI before your institution wrote a policy. These briefings help you lead from in front of that reality.",
  },
  nonprofit: {
    id: "nonprofit",
    label: "Nonprofit",
    shortLabel: "Nonprofit",
    description:
      "Nonprofit executives doing more mission with fewer resources through AI.",
    seo: {
      title: "AI Leadership for Nonprofit Leaders",
      description:
        "Briefings for nonprofit executives on AI: multiplying limited teams, protecting donor trust, and claiming the leverage AI offers mission-driven work.",
    },
    blurb:
      "No sector benefits more from abundance of intelligence than the one that never had abundance of anything. These briefings cover the leverage.",
  },
  finance: {
    id: "finance",
    label: "Finance",
    shortLabel: "Finance",
    description:
      "Financial services leaders navigating AI under regulation and fiduciary duty.",
    seo: {
      title: "AI Leadership for Finance Leaders",
      description:
        "Briefings for financial services leaders on AI: fiduciary-grade governance, regulatory exposure, and the advantage that goes to the first fluent leadership team.",
    },
    blurb:
      "In finance, AI is both the largest opportunity on the board agenda and the largest unpriced risk. These briefings cover both sides.",
  },
};

export const AUDIENCES = {
  chiefs: {
    id: "chiefs",
    seatId: "chief",
    label: "Chiefs",
    shortLabel: "Chiefs",
    description:
      "Leaders with responsibility, influence, and resources. CEOs, founders, senior pastors, public leaders.",
    seo: {
      title: "AI Briefings for Chiefs & C-Suite Leaders",
      description:
        "Executive briefings on AI for leaders who own the decision: clarity without the jargon, governance before the exposure, and the mandate your seat requires.",
    },
    blurb:
      "You do not need to understand AI like an engineer. You need to understand it like a leader. These briefings are written for the seat where the decision stops.",
  },
  "leaders-of-leaders": {
    id: "leaders-of-leaders",
    seatId: "leader_of_leaders",
    label: "Leaders of Leaders",
    shortLabel: "Leaders of Leaders",
    description:
      "VPs, directors, and owners of small teams. Squeezed between the mandate above and the team below.",
    seo: {
      title: "AI Briefings for Leaders of Leaders",
      description:
        "Briefings for VPs, directors, and team owners on AI: frameworks to execute with, language to translate upward, and clarity to lead downward.",
    },
    blurb:
      "You translate strategy downward and reality upward, and AI just changed both directions. These briefings give you the framework, not the hype.",
  },
  "emerging-leaders": {
    id: "emerging-leaders",
    seatId: "emerging",
    label: "Emerging Leaders",
    shortLabel: "Emerging",
    description:
      "Junior managers, early founders, and rising leaders building influence before the title arrives.",
    seo: {
      title: "AI Briefings for Emerging Leaders",
      description:
        "Briefings for rising leaders on AI: become the most fluent person in the room, earn influence before the title, and claim territory early.",
    },
    blurb:
      "The fastest route to influence you do not yet have is fluency the room does not yet have. These briefings are your head start.",
  },
};

// THEMES are the user-facing browse dimension (July 2026). They superseded
// formats, which had only three values and left governance and leadership
// homeless. Every post carries exactly one theme.
export const THEMES = {
  "ai-clarity": {
    id: "ai-clarity",
    label: "AI Clarity",
    shortLabel: "Clarity",
    description:
      "An honest picture of AI: what it is, what it is not, and what it means for the seat you hold.",
    seo: {
      title: "AI Clarity for Leaders | What AI Actually Is",
      description:
        "Briefings that give leaders an honest picture of AI: plain language, no hype, no vendor spin, and a clear read on what this moment asks of your seat.",
    },
    blurb:
      "The clarity pieces. Each one changes how you see AI, your exposure, and your moment, so the position you hold is one you built rather than borrowed.",
  },
  "ai-fluency": {
    id: "ai-fluency",
    label: "AI Fluency",
    shortLabel: "Fluency",
    description:
      "Working with AI deliberately, in ways that are effective, efficient, ethical, and safe.",
    seo: {
      title: "AI Fluency for Leaders | Direct AI With Confidence",
      description:
        "Practical briefings that build AI fluency: how to direct AI, what to delegate, how to verify what comes back, and the standards that keep it safe.",
    },
    blurb:
      "The fluency pieces. Playbooks, not theory: each one is a sequence of moves a leader can run this week to work with AI deliberately.",
  },
  "ai-value": {
    id: "ai-value",
    label: "AI Value",
    shortLabel: "Value",
    description:
      "How to spot the money AI opens in your world and claim it before anyone else does.",
    seo: {
      title: "AI Value for Leaders | Turn AI Into Money and Margin",
      description:
        "Value briefings for leaders: how to spot where AI turns into revenue, margin, and new offers in your world, and how to claim that ground first.",
    },
    blurb:
      "The money pieces. Nobody knows your world better than you, so each one trains you to spot the value AI just opened in it, and to claim it deliberately.",
  },
  "ai-governance": {
    id: "ai-governance",
    label: "AI Governance",
    shortLabel: "Governance",
    description:
      "The exposure already inside your organization: data, risk, policy, oversight, and the standards only leadership can set.",
    seo: {
      title: "AI Governance for Leaders | Direction Before Exposure",
      description:
        "Briefings on governing AI: the risk already inside your organization, what never goes into a tool, how to vet vendors, and the oversight your seat owns.",
    },
    blurb:
      "The governance pieces. AI is already inside your organization, directed or drifting. Each briefing covers a line leadership has to draw before something draws it for you.",
  },
  "ai-leadership": {
    id: "ai-leadership",
    label: "AI Leadership",
    shortLabel: "Leadership",
    description:
      "The position your seat requires, the direction your people need, and what happens when neither is declared.",
    seo: {
      title: "AI Leadership | The Position Your Seat Requires",
      description:
        "Briefings on leading through AI: taking a position instead of holding an opinion, directing your team, and setting the agenda before someone sets it for you.",
    },
    blurb:
      "The leadership pieces. Clarity is what you see; leadership is what you do about it. Each briefing is about the position you take and the direction you set.",
  },
};

// COVERS pick the social video-cover background. Social media only: never
// rendered on the site, never a URL. Five mirror the themes; three are the
// audience-dedicated lines, which on the blog stay Chiefs / Leaders of
// Leaders / Emerging Leaders under AUDIENCES and /awakening/for/*.
//
// `label`      the strapline set at the foot of the cover
// `background` source art, content/backgrounds/<file>. Filename always
//              matches the cover id, so the pipeline never needs a lookup
//              table and no filename carries an apostrophe or a space.
// `headline`   how the headline is set. "light" = white type on a colour
//              field; "gradient-100" / "gradient-200" = gradient type on the
//              paper field; "card" = white type inside a translucent panel
//              over fluted art. See agent-guides/blog/SOCIAL_GUIDE.md.
export const COVERS = {
  "ai-clarity": {
    id: "ai-clarity",
    label: "AI Clarity",
    background: "ai-clarity.jpg",
    headline: "light",
  },
  "ai-fluency": {
    id: "ai-fluency",
    label: "AI Fluency",
    background: "ai-fluency.jpg",
    headline: "light",
  },
  "ai-value": {
    id: "ai-value",
    label: "AI Value",
    background: "ai-value.jpg",
    headline: "light",
  },
  "ai-governance": {
    id: "ai-governance",
    label: "AI Governance",
    background: "ai-governance.jpg",
    headline: "gradient-100",
  },
  "ai-leadership": {
    id: "ai-leadership",
    label: "AI Leadership",
    background: "ai-leadership.jpg",
    headline: "gradient-200",
  },
  "chiefs-briefing": {
    id: "chiefs-briefing",
    label: "The Chief's Briefing",
    background: "chiefs-briefing.jpg",
    headline: "card",
  },
  "second-seat": {
    id: "second-seat",
    label: "The Second Seat",
    background: "second-seat.jpg",
    headline: "card",
  },
  "emerging-leader": {
    id: "emerging-leader",
    label: "Emerging Leader",
    background: "emerging-leader.jpg",
    headline: "card",
  },
};

// Formats. Retired from the user-facing surface July 2026: no routes, no
// chips, no OG eyebrow. Retained in frontmatter as an internal field only.
// insight -> AI Clarity, guide -> AI Fluency, value -> AI Value.
// The "article" format was retired 2026-07 (folded into insight).
export const TYPES = {
  insight: {
    id: "insight",
    label: "Insights",
    shortLabel: "Insight",
    pillar: "AI Clarity",
    description:
      "Pieces that deliver AI Clarity: an honest picture of AI, the exposure of waiting, and what the moment asks of your seat.",
    seo: {
      title: "AI Insights for Leaders | Clarity Without the Hype",
      description:
        "Thought-provoking insights that deliver AI Clarity: what AI actually is, the cost of ungoverned adoption, and what this moment asks of leaders.",
    },
    blurb:
      "The clarity pieces. Each insight changes how you see AI, your exposure, and your moment, so your position is one you built rather than borrowed.",
  },
  guide: {
    id: "guide",
    label: "Guides",
    shortLabel: "Guide",
    pillar: "AI Fluency",
    description:
      "Playbooks that build AI Fluency: working with AI deliberately, in ways that are effective, efficient, ethical, and safe.",
    seo: {
      title: "Practical AI Guides for Leaders | Build Fluency",
      description:
        "Step-by-step guides that build AI Fluency: first moves, working frameworks, and playbooks a leader can run this week.",
    },
    blurb:
      "The fluency pieces. Playbooks, not theory: each guide is a sequence of moves a leader can run this week to work with AI deliberately.",
  },
  value: {
    id: "value",
    label: "Value",
    shortLabel: "Value",
    pillar: "AI Value",
    description:
      "Pieces that deliver AI Value: how to spot the money AI opens in your world and claim it before anyone else does.",
    seo: {
      title: "AI Value for Leaders | Turn AI Into Money and Margin",
      description:
        "Value briefings for leaders: how to spot where AI turns into revenue, margin, and new offers in your world, and how to claim that ground first.",
    },
    blurb:
      "The money pieces. Nobody knows your world better than you, so each one trains you to spot the value AI just opened in it, and to claim it deliberately.",
  },
};

export const ALL_INDUSTRY_IDS = Object.keys(INDUSTRIES);
export const ALL_AUDIENCE_IDS = Object.keys(AUDIENCES);
export const ALL_THEME_IDS = Object.keys(THEMES);
export const ALL_COVER_IDS = Object.keys(COVERS);
export const ALL_TYPE_IDS = Object.keys(TYPES);

export function getIndustry(id) {
  return INDUSTRIES[id] ?? null;
}

export function getAudience(id) {
  return AUDIENCES[id] ?? null;
}

export function getTheme(id) {
  return THEMES[id] ?? null;
}

export function getCover(id) {
  return COVERS[id] ?? null;
}

export function getType(id) {
  return TYPES[id] ?? null;
}
