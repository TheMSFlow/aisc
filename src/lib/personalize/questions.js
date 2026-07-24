// The journey: one multiple-choice anchor plus three open prompts.
// Used by the wizard UI and by the prompt builder, so wording lives here once.
// Open prompts adapt to the seat answer where the default wording would not
// fit (someone not leading a team should never be asked what they lead).

export const SEAT_QUESTION = {
  id: "seat",
  eyebrow: "Your seat",
  question: "Which of these sounds most like your seat?",
  options: [
    {
      id: "chief",
      label: "I set the direction. Others execute what I decide.",
    },
    {
      id: "leader_of_leaders",
      label: "I answer in both directions. Results above me, a team below me.",
    },
    {
      id: "emerging",
      label: "I carry real responsibility, and I am still building my influence.",
    },
    {
      id: "individual",
      label: "I am not leading a team right now. I am here for myself.",
    },
  ],
};

export const OPEN_PROMPTS = [
  {
    id: "leads",
    eyebrow: "What you lead",
    question: "Tell us about what you lead.",
    hint: "Who looks to you for direction, and roughly how many of them are there? A sentence or two is enough.",
    required: true,
    maxLength: 600,
    variants: {
      emerging: {
        eyebrow: "Where you stand",
        question: "Tell us about where you stand.",
        hint: "The work you carry, who relies on you, and who you answer to. A sentence or two is enough.",
      },
      individual: {
        eyebrow: "Your world",
        question: "Tell us about your world.",
        hint: "The work you do, the people around you, whatever shapes your days. A sentence or two is enough.",
      },
    },
  },
  {
    id: "pressing",
    eyebrow: "Why now",
    question: "What made you start paying attention to AI?",
    hint: "A pressure you feel, a question people keep bringing to you, a worry, an opportunity you sense. Say it plainly. You do not need to know anything about AI to answer.",
    required: true,
    maxLength: 600,
    variants: {
      individual: {
        hint: "A pressure you feel, a worry, an opportunity you sense, or just a feeling that things are shifting. Say it plainly. You do not need to know anything about AI to answer.",
      },
    },
  },
  {
    id: "picture",
    eyebrow: "How you picture it",
    question: "How do you picture this working for you?",
    hint: "Just you, or people alongside you? Private, or with other leaders? A focused week, or support over the months that follow? Share anything you already know you want.",
    required: true,
    maxLength: 600,
    variants: {
      individual: {
        hint: "At your own pace, or alongside others? A focused week, or support over the months that follow? Share anything you already know you want.",
      },
    },
  },
];

// Resolve the prompts for a given seat, applying wording variants.
export function getPrompts(seat) {
  return OPEN_PROMPTS.map((p) => {
    const v = p.variants?.[seat];
    return v ? { ...p, ...v } : p;
  });
}

export const SEAT_IDS = SEAT_QUESTION.options.map((o) => o.id);
