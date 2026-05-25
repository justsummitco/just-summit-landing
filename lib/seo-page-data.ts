export type ComparisonPageContent = {
  slug: string;
  title: string;
  description: string;
  competitor: string;
  h1: string;
  intro: string;
  bestFor: string[];
  comparisonRows: Array<{
    label: string;
    justSummit: string;
    competitor: string;
  }>;
  caveats: string[];
};

export const comparisonPages: Record<string, ComparisonPageContent> = {
  "plaud-alternative": {
    slug: "plaud-alternative",
    title: "Plaud Alternative | Private AI Meeting Notes",
    description:
      "A careful Plaud alternative comparison for buyers considering wearable or headphone-first AI meeting notes.",
    competitor: "Plaud",
    h1: "Plaud alternative for private, headphone-first meeting notes.",
    intro:
      "Plaud has helped define the AI recording-device category. Just Summit is different: it is a pre-production headphone-first product direction for buyers who want capture, listening, and recall in one wearable form factor.",
    bestFor: [
      "Buyers who want headphones rather than a separate recorder",
      "People comparing privacy-first audio workflows",
      "Early adopters comfortable with a hardware presale",
    ],
    comparisonRows: [
      {
        label: "Form factor",
        justSummit:
          "Over-ear headphones being designed for listening, calls, and capture.",
        competitor: "Dedicated AI recording devices and wearable recorders.",
      },
      {
        label: "Product status",
        justSummit:
          "Pre-production presale with Q4 2026 estimated first-batch delivery.",
        competitor: "Established product line with commercially available devices.",
      },
      {
        label: "Privacy direction",
        justSummit:
          "On-device-first principles and controlled app synchronisation planned.",
        competitor:
          "Review Plaud's current privacy, cloud, and subscription terms before buying.",
      },
      {
        label: "Payment",
        justSummit: "£49 reservation or £249 full preorder through Stripe.",
        competitor: "Device and plan pricing varies by product and region.",
      },
    ],
    caveats: [
      "Just Summit is not claiming feature parity with Plaud today.",
      "Final Just Summit hardware and software details may change before shipping.",
      "This page is a buyer guide, not legal or technical certification.",
    ],
  },
  "otter-ai-alternative": {
    slug: "otter-ai-alternative",
    title: "Otter.ai Alternative | Wearable AI Meeting Capture",
    description:
      "Compare Otter-style meeting transcription with Just Summit's private, wearable AI headphones direction.",
    competitor: "Otter.ai",
    h1: "Otter.ai alternative when meetings do not only happen in video calls.",
    intro:
      "Otter.ai is known for meeting transcription software. Just Summit is not trying to be another browser tab. It is a headphone-first hardware project for capturing useful audio across calls, lectures, podcasts, and in-person moments.",
    bestFor: [
      "People who want capture outside scheduled video meetings",
      "Buyers who prefer hardware plus companion app recall",
      "Teams or individuals evaluating privacy-first workflows",
    ],
    comparisonRows: [
      {
        label: "Core model",
        justSummit: "Wearable headphones and companion app direction.",
        competitor: "Software transcription and meeting assistant workflow.",
      },
      {
        label: "Capture context",
        justSummit: "Designed for calls, lectures, podcasts, and marked moments.",
        competitor:
          "Strongest in scheduled meeting and software-based workflows.",
      },
      {
        label: "Availability",
        justSummit: "Presale, estimated first-batch delivery Q4 2026.",
        competitor: "Available software product.",
      },
      {
        label: "Buyer fit",
        justSummit: "Early hardware buyers who want a wearable capture path.",
        competitor: "Users who need transcription software available now.",
      },
    ],
    caveats: [
      "Otter.ai may be a better fit if you need a mature software tool immediately.",
      "Just Summit is for buyers who want the hardware direction and accept presale timing.",
      "Recording and consent responsibilities depend on your context.",
    ],
  },
  "limitless-alternative": {
    slug: "limitless-alternative",
    title: "Limitless Alternative | AI Wearable For Audio Recall",
    description:
      "A careful Limitless alternative comparison for buyers considering AI wearables, meeting notes, and private audio recall.",
    competitor: "Limitless",
    h1: "Limitless alternative for buyers who want headphone-first audio recall.",
    intro:
      "Limitless has made the AI wearable memory category visible. Just Summit approaches the problem from the headphone side: the device people already use for calls, listening, and focus.",
    bestFor: [
      "Buyers comparing AI wearable memory devices",
      "People who prefer a headphone form factor",
      "Early adopters focused on audio learning and meeting recall",
    ],
    comparisonRows: [
      {
        label: "Wearable type",
        justSummit: "Headphones for listening and planned capture.",
        competitor: "AI wearable focused on memory and transcription workflows.",
      },
      {
        label: "Listening workflow",
        justSummit:
          "Designed around meetings, calls, lectures, podcasts, and audiobooks.",
        competitor:
          "Review Limitless positioning and supported workflows for your use case.",
      },
      {
        label: "Status",
        justSummit: "Pre-production presale.",
        competitor:
          "Product availability and features depend on current Limitless offering.",
      },
      {
        label: "Pricing path",
        justSummit: "£49 deposit path or £249 full-payment preorder.",
        competitor: "Check current device and service pricing.",
      },
    ],
    caveats: [
      "Just Summit is not presented as a like-for-like replacement for Limitless.",
      "The strongest reason to choose Just Summit is the headphone-first direction.",
      "Final Just Summit features will be confirmed as the build progresses.",
    ],
  },
  "fireflies-ai-alternative": {
    slug: "fireflies-ai-alternative",
    title: "Fireflies.ai Alternative | In-Person AI Meeting Notes",
    description:
      "Compare Fireflies-style AI meeting software with Just Summit's wearable, private AI headphones direction.",
    competitor: "Fireflies.ai",
    h1: "Fireflies.ai alternative for in-person and wearable meeting capture.",
    intro:
      "Fireflies.ai is built around AI meeting assistant software. Just Summit is a different path: a pre-production headphone-first product for useful audio that happens across meetings, calls, lectures, and everyday listening.",
    bestFor: [
      "People who need capture beyond meeting bots",
      "Buyers evaluating wearable note-taking hardware",
      "Privacy-conscious users comparing cloud and local-first directions",
    ],
    comparisonRows: [
      {
        label: "Primary workflow",
        justSummit: "Wearable capture and searchable recall planned.",
        competitor:
          "Meeting assistant software for scheduled calls and collaboration workflows.",
      },
      {
        label: "Physical context",
        justSummit:
          "Designed to support in-person and on-the-move audio moments.",
        competitor:
          "Typically strongest inside connected meeting platforms.",
      },
      {
        label: "Product status",
        justSummit: "Early hardware presale, Q4 2026 estimate.",
        competitor: "Available software product.",
      },
      {
        label: "Trust layer",
        justSummit: "Stripe checkout, 30-day money-back guarantee, email updates.",
        competitor:
          "Review current Fireflies plan, privacy, and data handling terms.",
      },
    ],
    caveats: [
      "Use Fireflies.ai if you need a mature meeting assistant now.",
      "Use Just Summit if you want to support a wearable hardware approach and can wait.",
      "This comparison should be kept factual as both products evolve.",
    ],
  },
};
