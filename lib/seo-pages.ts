export type SeoPage = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  disclaimer?: string;
  relatedSlugs?: string[];
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoPages: SeoPage[] = [
  {
    slug: "adhd-meeting-notes",
    title: "ADHD Meeting Notes for Busy Workdays",
    metaDescription:
      "ADHD-friendly meeting notes for young professionals who want to stay present, reduce note-taking friction, and find action items later.",
    eyebrow: "ADHD meeting notes",
    h1: "ADHD-friendly meeting notes for the call you need to remember later.",
    intro:
      "Some meetings end with a familiar feeling: you know something important was said, but the exact action, owner, or decision has already blurred. Just Summit is being designed as a private audio recall layer for busy workdays.",
    primaryKeyword: "ADHD meeting notes",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "meeting-notes-for-adhd",
      "forgot-meeting-action-items",
      "ai-note-taker-for-adhd",
      "ai-meeting-recorder",
    ],
    highlights: [
      "ADHD-friendly workflow language without medical claims",
      "Designed to reduce note-taking friction during calls and meetings",
      "Private audio recall direction for action items, decisions, and follow-ups",
    ],
    sections: [
      {
        title: "Why meeting notes can fall apart",
        body:
          "When you are listening, responding, switching context, and trying to type at the same time, important decisions can slip past. Just Summit is being designed to make capture feel less like another task.",
      },
      {
        title: "Built for after the call",
        body:
          "The goal is searchable recall: decisions, action items, names, and useful context you can check later without replaying a whole meeting or relying on memory alone.",
      },
      {
        title: "Careful status, clear expectations",
        body:
          "Just Summit Headphones are in presale and development. ADHD-friendly describes the workflow direction and intended audience fit, not a guaranteed personal result.",
      },
    ],
    faqs: [
      {
        question: "Is Just Summit an ADHD app?",
        answer:
          "Just Summit is a headphone-first audio recall product direction. It is being positioned for ADHD-friendly workdays, but it is not healthcare advice or a diagnostic tool.",
      },
      {
        question: "How can this help with meeting notes?",
        answer:
          "The intended workflow is to reduce manual note-taking pressure, capture useful spoken moments, and make action items easier to find later.",
      },
    ],
  },
  {
    slug: "meeting-notes-for-adhd",
    title: "Meeting Notes for ADHD Professionals",
    metaDescription:
      "A practical ADHD-friendly guide to meeting notes for young professionals who need decisions, follow-ups, and useful context after the call.",
    eyebrow: "Meeting notes for ADHD",
    h1: "Meeting notes for ADHD-friendly workdays should not demand perfect focus.",
    intro:
      "Many young professionals do not lose the meeting because they did not care. They lose it because the workday is crowded, the call moves quickly, and typing everything can pull them out of the conversation.",
    primaryKeyword: "meeting notes for ADHD",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "adhd-meeting-notes",
      "forgot-meeting-action-items",
      "adhd-productivity-tools",
      "ai-headphones-for-meetings",
    ],
    highlights: [
      "Built around staying present instead of typing everything",
      "Aimed at decisions, follow-ups, and working-memory support",
      "Privacy-first direction for sensitive workplace audio",
    ],
    sections: [
      {
        title: "The real job of notes",
        body:
          "For many professionals, notes are not a transcript. They are a way to recover what matters: the promise, the next step, the detail a client mentioned once, or the decision that becomes important later.",
      },
      {
        title: "Stay in the conversation",
        body:
          "An ADHD-friendly meeting workflow should reduce the pressure to write constantly. Just Summit is exploring capture and recall so the listener can stay more present while still keeping useful context.",
      },
      {
        title: "Private by design direction",
        body:
          "Work meetings can include customer information, strategy, personal details, and unfinished ideas. That is why the Just Summit direction favours local-first control and careful sync behaviour.",
      },
    ],
    faqs: [
      {
        question: "Should ADHD-friendly notes be full transcripts?",
        answer:
          "Not always. Full transcripts can help, but many people need actions, decisions, and searchable context more than another long document.",
      },
      {
        question: "Can I use this for client meetings?",
        answer:
          "The product direction includes work conversations, but recording and consent responsibilities depend on your context. Just Summit does not provide legal advice.",
      },
    ],
  },
  {
    slug: "adhd-productivity-tools",
    title: "ADHD Productivity Tools for Hybrid Work",
    metaDescription:
      "Explore ADHD-friendly productivity tools for hybrid work, meeting recall, action items, and private audio capture.",
    eyebrow: "ADHD productivity tools",
    h1: "ADHD-friendly productivity tools should make the workday easier to recover.",
    intro:
      "Calendars, task managers, and note apps are useful, but they often depend on catching the right detail at the right moment. Just Summit is being designed for the spoken parts of work that usually disappear.",
    primaryKeyword: "ADHD productivity tools",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "adhd-meeting-notes",
      "meeting-notes-for-adhd",
      "neurodivergent-meeting-notes",
      "privacy-first-ai-notetaker",
    ],
    highlights: [
      "Supports the meeting and audio layer of productivity",
      "Designed for hybrid calls, client discussions, and spoken context",
      "Complements task managers instead of replacing them",
    ],
    sections: [
      {
        title: "Productivity breaks when context disappears",
        body:
          "A task manager can hold the action item only after someone captures it. The hardest part is often remembering what was agreed, why it mattered, and where to look afterwards.",
      },
      {
        title: "Audio recall fills a missing layer",
        body:
          "Just Summit is being built for meeting memory, calls, lectures, and useful spoken details. The aim is to connect what you heard with what you need to do later.",
      },
      {
        title: "A careful early product",
        body:
          "The product is pre-production. The site should describe intended workflows, preorder terms, and privacy direction plainly while final features are confirmed.",
      },
    ],
    faqs: [
      {
        question: "Is Just Summit a task manager?",
        answer:
          "No. It is being designed as an audio recall product. It can support productivity by helping people find spoken context and action items later.",
      },
      {
        question: "Why target young professionals?",
        answer:
          "Early-career and hybrid workers often carry many calls, notes, clients, tools, and context shifts in one day. That makes audio recall a practical workflow problem.",
      },
    ],
  },
  {
    slug: "ai-note-taker-for-adhd",
    title: "AI Note Taker for ADHD-Friendly Meeting Recall",
    metaDescription:
      "What to look for in an AI note taker for ADHD-friendly workdays: privacy, action items, meeting recall, and low-friction capture.",
    eyebrow: "AI note taker for ADHD",
    h1: "An AI note taker for ADHD-friendly work should capture what your day makes easy to miss.",
    intro:
      "The best AI note taker is not the one that creates the longest transcript. For busy young professionals, the value is in decisions, action items, context, and a way back into the meeting when memory gets fuzzy.",
    primaryKeyword: "AI note taker for ADHD",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "adhd-meeting-notes",
      "meeting-notes-for-adhd",
      "ai-meeting-recorder",
      "privacy-first-ai-notetaker",
    ],
    highlights: [
      "Focuses on recall, not only raw transcription",
      "Designed for calls, meetings, lectures, and spoken ideas",
      "Privacy-first product direction for sensitive work audio",
    ],
    sections: [
      {
        title: "Look for action-first recall",
        body:
          "An ADHD-friendly note taker should make it easy to find what changed, who owns the next step, and what context matters. A long transcript can be useful, but it should not become another inbox.",
      },
      {
        title: "Low-friction capture matters",
        body:
          "Meeting bots and phone apps can be useful, but they add setup and attention cost. Just Summit is exploring headphones because they are already part of calls, focus time, and listening.",
      },
      {
        title: "Privacy and consent still matter",
        body:
          "Work audio can be sensitive. The product direction favours clear user control, secure storage, authenticated pairing, and transparent sync behaviour as the build develops.",
      },
    ],
    faqs: [
      {
        question: "Is an AI note taker useful for ADHD-friendly workflows?",
        answer:
          "It can be, if it reduces note-taking friction and helps people recover actions and context later. The product should avoid promising individual outcomes.",
      },
      {
        question: "Why not just use a meeting bot?",
        answer:
          "Meeting bots are useful for scheduled video calls. A headphone-first workflow can also support in-person moments, calls, lectures, podcasts, and moving conversations.",
      },
    ],
  },
  {
    slug: "forgot-meeting-action-items",
    title: "Forgot Meeting Action Items? Build Better Recall",
    metaDescription:
      "For young professionals who forget meeting action items, Just Summit is building ADHD-friendly audio recall for decisions and follow-ups.",
    eyebrow: "Forgot action items",
    h1: "Forgot the meeting action items? The problem might be the capture workflow.",
    intro:
      "You can leave a meeting motivated and still lose the exact next step before the day ends. Just Summit is being designed for the gap between hearing something important and being able to use it later.",
    primaryKeyword: "forgot meeting action items",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "adhd-meeting-notes",
      "meeting-notes-for-adhd",
      "ai-headphones-for-meetings",
      "ai-meeting-recorder",
    ],
    highlights: [
      "Designed around decisions, owners, follow-ups, and context",
      "Helps position audio recall around a real workday pain",
      "Links ADHD-friendly language with meeting-specific search intent",
    ],
    sections: [
      {
        title: "Action items are easy to miss",
        body:
          "They often appear in the final two minutes, inside a side comment, or while you are already thinking about the next call. That makes manual notes fragile.",
      },
      {
        title: "Searchable recall is the useful layer",
        body:
          "The intended Just Summit workflow is to capture useful spoken moments and make them easier to search later, so the workday does not depend on perfect recall.",
      },
      {
        title: "A practical preorder promise",
        body:
          "Just Summit should keep this promise narrow while the product develops: private audio recall for useful spoken work moments, with clear preorder terms and build updates.",
      },
    ],
    faqs: [
      {
        question: "Why do action items get lost after meetings?",
        answer:
          "Often because meetings move quickly, attention is split, and the action item is spoken once. This page describes a product workflow, not a healthcare explanation.",
      },
      {
        question: "Can Just Summit send tasks to my tools?",
        answer:
          "The current public direction is capture, summaries, search, and recall. Final integrations will be confirmed as the product develops.",
      },
    ],
  },
  {
    slug: "neurodivergent-meeting-notes",
    title: "Neurodivergent Meeting Notes for Busy Professionals",
    metaDescription:
      "A privacy-first approach to neurodivergent meeting notes, designed around audio recall, working-memory support, and action items.",
    eyebrow: "Neurodivergent meeting notes",
    h1: "Neurodivergent meeting notes should support the way work actually feels.",
    intro:
      "Meetings ask people to listen, speak, decide, remember, and document at the same time. Just Summit is being designed for professionals who want a lower-friction way to keep useful spoken context.",
    primaryKeyword: "neurodivergent meeting notes",
    disclaimer:
      "General product information only. Just Summit is not healthcare advice, a diagnostic tool, or a promise of individual outcomes.",
    relatedSlugs: [
      "adhd-meeting-notes",
      "adhd-productivity-tools",
      "privacy-first-ai-notetaker",
      "on-device-transcription",
    ],
    highlights: [
      "Inclusive positioning for ADHD-friendly and neurodivergent workflows",
      "Privacy-first direction for sensitive meeting context",
      "Designed for calls, lectures, client meetings, and spoken decisions",
    ],
    sections: [
      {
        title: "The meeting load is real",
        body:
          "A meeting can require attention, social processing, task switching, memory, and fast decisions at once. Good notes should reduce that load rather than add another performance layer.",
      },
      {
        title: "Useful notes are recoverable notes",
        body:
          "Just Summit is exploring capture and recall so useful spoken context can be found after the moment has passed, without turning every meeting into a typing exercise.",
      },
      {
        title: "Keep sensitive context under control",
        body:
          "The product direction is privacy-first and local-first, with secure storage and controlled sync described clearly as the build matures.",
      },
    ],
    faqs: [
      {
        question: "Is this only for ADHD?",
        answer:
          "No. The positioning is ADHD-friendly, but the broader workflow can matter to many people who find meetings and recall demanding.",
      },
      {
        question: "What makes meeting notes neurodivergent-friendly?",
        answer:
          "Lower-friction capture, clear recall, searchable context, and privacy control can make the workflow more practical for different working styles.",
      },
    ],
  },
  {
    slug: "ai-headphones",
    title: "AI Headphones for Private Audio Recall",
    metaDescription:
      "Learn how Just Summit Headphones are being built as privacy-first AI headphones for meetings, calls, lectures, podcasts, and searchable recall.",
    eyebrow: "AI headphones",
    h1: "AI headphones for people who listen to learn.",
    intro:
      "Just Summit Headphones are being designed for a simple job: help you keep the useful things you hear, then find them again later. The product direction combines everyday headphones with planned capture, summarisation, and searchable recall workflows.",
    primaryKeyword: "AI headphones",
    highlights: [
      "Designed for meetings, calls, lectures, podcasts, and study sessions",
      "Privacy-first product direction with on-device-first processing principles",
      "Planned companion app for summaries, search, and recall",
    ],
    sections: [
      {
        title: "What makes headphones an AI product?",
        body:
          "The value is not only in playback quality. The intended workflow is capture, organise, summarise, and retrieve useful audio moments without forcing you to take notes while listening.",
      },
      {
        title: "Where Just Summit fits",
        body:
          "The first-batch goal is to prove a wearable audio workflow that feels natural: listen as usual, mark or capture what matters, and use structured summaries later instead of replaying long recordings.",
      },
      {
        title: "A careful note on status",
        body:
          "Just Summit Headphones are in presale and development. Feature descriptions describe product direction and target behaviour, not a guarantee of final shipped specifications.",
      },
    ],
    faqs: [
      {
        question: "Are Just Summit Headphones available now?",
        answer:
          "They are available for presale. The product is being built and the first-batch delivery window is currently estimated for Q4 2026.",
      },
      {
        question: "Do AI headphones need the cloud?",
        answer:
          "Not necessarily. Just Summit is being designed around privacy-first, on-device-first processing principles, with controlled sync where useful.",
      },
    ],
  },
  {
    slug: "ai-meeting-recorder",
    title: "AI Meeting Recorder for Private Meeting Notes",
    metaDescription:
      "Explore the Just Summit approach to AI meeting recording: wearable capture, structured summaries, privacy-first design, and searchable meeting recall.",
    eyebrow: "AI meeting recorder",
    h1: "A wearable AI meeting recorder, designed for the moments worth keeping.",
    intro:
      "Most meeting recorders ask you to manage another device or another app. Just Summit is exploring a headphone-led workflow for capturing the parts of meetings, calls, and discussions that become useful later.",
    primaryKeyword: "AI meeting recorder",
    highlights: [
      "Capture direction for full sessions or selected moments",
      "Planned summaries that make long audio easier to revisit",
      "Private-by-default principles for sensitive work conversations",
    ],
    sections: [
      {
        title: "Why meetings need a different capture workflow",
        body:
          "The best point in a meeting is often obvious only after the conversation moves on. A wearable recorder can reduce note-taking friction while keeping the person focused on the discussion.",
      },
      {
        title: "Designed around consent and control",
        body:
          "Meeting capture must be used responsibly. The product direction favours clear user control, secure storage, authenticated pairing, and transparent handling of recorded or summarised material.",
      },
      {
        title: "Search beats replay",
        body:
          "The goal is not to create a bigger pile of recordings. The goal is searchable meeting recall: actions, decisions, useful quotes, and context that can be found without replaying hours of audio.",
      },
    ],
    faqs: [
      {
        question: "Is Just Summit only for meetings?",
        answer:
          "No. Meetings are one important use case, but the same recall workflow is intended for calls, lectures, podcasts, study, and field conversations.",
      },
      {
        question: "Will Just Summit store meeting audio in the cloud?",
        answer:
          "The product direction is local-first and privacy-first. Final sync behaviour will be described clearly as the product develops.",
      },
    ],
  },
  {
    slug: "privacy-first-ai-notetaker",
    title: "Privacy-First AI Notetaker for Audio Recall",
    metaDescription:
      "Just Summit is building a privacy-first AI notetaker direction for wearable audio, local processing, encrypted storage, and controlled sync.",
    eyebrow: "Privacy-first AI notetaker",
    h1: "A privacy-first AI notetaker should start with control.",
    intro:
      "AI notes can be useful, but audio is sensitive. Just Summit is being built around a privacy-first direction so recorded, transcribed, and summarised material stays under the user's control.",
    primaryKeyword: "privacy-first AI notetaker",
    highlights: [
      "On-device-first processing principles",
      "Secure local storage and authenticated pairing as design priorities",
      "Controlled mobile-app synchronisation where useful",
    ],
    sections: [
      {
        title: "Privacy is part of the product, not an afterthought",
        body:
          "A useful notetaker may handle work calls, personal thoughts, lectures, or private discussions. That makes local control, encryption, and clear user choices central to the design.",
      },
      {
        title: "Local-first does not mean isolated",
        body:
          "The intended architecture can still support app sync, search, and review. The difference is that cloud dependence should not be the default assumption for sensitive listening workflows.",
      },
      {
        title: "Clear choices as the product develops",
        body:
          "As the headphones move through prototype and first-batch work, Just Summit will explain privacy choices in plain language so buyers know how audio, summaries, storage, and sync are handled.",
      },
    ],
    faqs: [
      {
        question: "What does privacy-first mean for an AI notetaker?",
        answer:
          "It means designing for local control, careful data handling, encryption, authenticated pairing, and clear choices before adding any cloud dependency.",
      },
      {
        question: "Can privacy-first AI still be useful?",
        answer:
          "Yes. Many useful workflows can happen on device or with controlled local sync, especially for capture, transcription, summarisation, and search.",
      },
    ],
  },
  {
    slug: "on-device-transcription",
    title: "On-Device Transcription for Wearable Audio",
    metaDescription:
      "Understand the Just Summit direction for on-device transcription, deferred processing, battery-aware AI, and secure wearable audio recall.",
    eyebrow: "On-device transcription",
    h1: "On-device transcription makes wearable audio more private and more useful.",
    intro:
      "Transcription is powerful, but sending every sensitive audio moment away for processing is not always the right tradeoff. Just Summit is exploring on-device-first transcription and summarisation for wearable audio recall.",
    primaryKeyword: "on-device transcription",
    highlights: [
      "Local-first processing direction for sensitive audio",
      "Battery-aware and thermal-aware design considerations",
      "Deferred processing where real-time transcription is not necessary",
    ],
    sections: [
      {
        title: "Why on-device matters",
        body:
          "Local processing can reduce exposure of sensitive audio, improve user control, and make the product less dependent on network conditions when capture happens.",
      },
      {
        title: "The embedded constraints are real",
        body:
          "Wearable audio systems must account for battery life, thermal load, memory limits, packet loss, storage limits, and recovery after power loss. Those constraints shape the final experience.",
      },
      {
        title: "Deferred processing can be a feature",
        body:
          "Not every moment needs instant transcription. Some audio can be captured securely and processed later when power, thermals, and user context make more sense.",
      },
    ],
    faqs: [
      {
        question: "Is on-device transcription always real time?",
        answer:
          "No. Real-time processing is one option, but deferred processing can be more practical for battery, heat, and reliability.",
      },
      {
        question: "Why use headphones for transcription?",
        answer:
          "Headphones are already close to the audio experience. That makes them a natural place to explore capture, marking, and recall workflows.",
      },
    ],
  },
  {
    slug: "ai-headphones-for-meetings",
    title: "AI Headphones for Meetings and Calls",
    metaDescription:
      "Just Summit Headphones are being built for meeting recall: capture useful moments, create structured summaries, and search what mattered later.",
    eyebrow: "AI headphones for meetings",
    h1: "AI headphones for meetings should help you stay present.",
    intro:
      "The best meeting notes do not come from staring at a keyboard. Just Summit is being designed to help people listen, capture the useful moments, and retrieve them later without losing the conversation.",
    primaryKeyword: "AI headphones for meetings",
    highlights: [
      "Designed for calls, in-person discussions, lectures, and working sessions",
      "Capture direction for full conversations or selected moments",
      "Searchable recall instead of manual meeting-note archaeology",
    ],
    sections: [
      {
        title: "Meeting notes without leaving the meeting",
        body:
          "A headphone-led workflow can let the listener stay engaged while marking or capturing what matters. The intended outcome is structured recall, not distraction.",
      },
      {
        title: "Useful for hybrid work and learning",
        body:
          "Calls, lectures, podcasts, and project discussions all share the same problem: valuable context disappears quickly. Searchable audio recall helps turn that context into something reusable.",
      },
      {
        title: "Built for careful rollout",
        body:
          "The product is still early. The presale page separates current status from planned behaviour so customers understand what is designed, what is being built, and what is still being proven.",
      },
    ],
    faqs: [
      {
        question: "Can AI headphones replace written meeting notes?",
        answer:
          "They can reduce note-taking friction, but the practical aim is to supplement good meeting habits with searchable summaries and recall.",
      },
      {
        question: "Are these headphones for work or learning?",
        answer:
          "Both. The same capture and recall pattern can support meetings, calls, lectures, podcasts, and study sessions.",
      },
    ],
  },
  {
    slug: "ai-voice-recorder",
    title: "AI Voice Recorder for Wearable Audio Recall",
    metaDescription:
      "Compare AI voice recorder features and learn how Just Summit Headphones are being built for private, searchable audio recall.",
    eyebrow: "AI voice recorder",
    h1: "AI voice recorder features that actually matter before you buy.",
    intro:
      "A useful AI voice recorder should capture the right audio, summarise it clearly, and help you find it later. Just Summit is exploring a headphone-first path for meetings, lectures, calls, podcasts, and voice notes.",
    primaryKeyword: "AI voice recorder",
    highlights: [
      "Wearable capture direction for spontaneous audio moments",
      "Structured summaries and search planned, not only raw transcripts",
      "Privacy-first, on-device-first design principles",
    ],
    sections: [
      {
        title: "Recording workflow matters",
        body:
          "Tabletop recorders work well when deliberately placed in a room. Wearable capture is better suited to calls, lectures, and ideas that happen while moving.",
      },
      {
        title: "Summaries beat raw transcripts",
        body:
          "Long transcripts are useful for auditing, but most buyers need decisions, actions, themes, and searchable memory.",
      },
      {
        title: "Check status before buying",
        body:
          "Just Summit Headphones are in presale, with a £49 reservation option, a 30-day money-back guarantee, and an estimated Q4 2026 first-batch delivery window.",
      },
    ],
    faqs: [
      {
        question: "Is an AI voice recorder the same as an AI note taker?",
        answer:
          "Not always. A recorder focuses on capture. A note taker usually adds summaries, action points, and search.",
      },
      {
        question: "Why reserve Just Summit instead of buying a recorder now?",
        answer:
          "Just Summit is for buyers who want a headphone-first, privacy-first direction and are comfortable joining an early hardware presale.",
      },
    ],
  },
  {
    slug: "ai-note-taker-for-in-person-meetings",
    title: "AI Note Taker for In-Person Meetings",
    metaDescription:
      "A practical buyer guide to AI note takers for in-person meetings, with a privacy-first Just Summit Headphones preorder option.",
    eyebrow: "In-person meeting notes",
    h1: "AI note taker for in-person meetings, not just video calls.",
    intro:
      "Many AI note takers are strongest inside Zoom, Teams, or Google Meet. Just Summit is being built for the broader capture problem: desks, lectures, calls, site meetings, and the moments that do not happen inside a browser tab.",
    primaryKeyword: "AI note taker for in-person meetings",
    highlights: [
      "Designed for useful audio beyond scheduled video calls",
      "Headphone-first workflow for calls, lectures, and moving conversations",
      "Clear presale terms before checkout",
    ],
    sections: [
      {
        title: "In-person capture has different constraints",
        body:
          "A good in-person note taker needs quick capture, clear user control, good audio handling, and a workflow that does not make the conversation feel awkward.",
      },
      {
        title: "Wearable capture reduces setup friction",
        body:
          "Headphones can support calls, focused listening, and capture in one form factor, reducing the number of separate devices needed for recall.",
      },
      {
        title: "Trust comes before checkout",
        body:
          "Just Summit states the £49 deposit, £250 later balance, 30-day refund promise, and Q4 2026 estimated first-batch delivery before payment.",
      },
    ],
    faqs: [
      {
        question: "Can AI note takers be used in person?",
        answer:
          "Some can, depending on device, consent, and local rules. Just Summit is being designed for useful audio capture across in-person and remote contexts.",
      },
      {
        question: "Do I still need to tell people I am recording?",
        answer:
          "You should follow the rules and expectations that apply to your context. Just Summit does not provide legal advice.",
      },
    ],
  },
  {
    slug: "private-ai-transcription",
    title: "Private AI Transcription for Audio Notes",
    metaDescription:
      "Learn why private AI transcription matters and how Just Summit Headphones are being designed around on-device-first audio processing principles.",
    eyebrow: "Private AI transcription",
    h1: "Private AI transcription should be the default for sensitive audio.",
    intro:
      "Audio can contain company plans, personal details, customer information, and half-formed ideas. Just Summit is being built around an on-device-first direction for people who want useful audio recall without casual cloud dependence.",
    primaryKeyword: "private AI transcription",
    highlights: [
      "On-device-first product direction",
      "Controlled app synchronisation planned where useful",
      "Designed for sensitive meetings, calls, lectures, and personal learning",
    ],
    sections: [
      {
        title: "Cloud tools are convenient but not always ideal",
        body:
          "Cloud transcription can be powerful, but sensitive users should understand upload, retention, deletion, model training, and sharing behaviour before trusting a tool.",
      },
      {
        title: "Local-first changes the trust conversation",
        body:
          "A local-first architecture can reduce unnecessary exposure by keeping more processing and storage under the user's control.",
      },
      {
        title: "Final details still need confirmation",
        body:
          "Just Summit is pre-production. Final hardware, software, sync, and storage details will be confirmed as the build matures.",
      },
    ],
    faqs: [
      {
        question: "Does private AI transcription mean no cloud at all?",
        answer:
          "Not necessarily. It means the product should be clear about what happens locally, what syncs, and what remains under user control.",
      },
      {
        question: "Is Just Summit fully specified yet?",
        answer:
          "No. Just Summit Headphones are pre-production, and final hardware and software details will be confirmed before shipping.",
      },
    ],
  },
  {
    slug: "transcription-headphones",
    title: "Transcription Headphones for AI Audio Recall",
    metaDescription:
      "Explore the emerging transcription headphones category and reserve Just Summit Headphones with a £49 deposit.",
    eyebrow: "Transcription headphones",
    h1: "Transcription headphones for calls, lectures, podcasts, and memory.",
    intro:
      "Transcription headphones are an emerging category: headphones that do more than play audio. The promise is simple: listen as normal, then keep the parts worth remembering.",
    primaryKeyword: "transcription headphones",
    highlights: [
      "Headphone-first capture and recall direction",
      "Planned AI summaries and searchable audio memory",
      "£49 reservation option for early buyers",
    ],
    sections: [
      {
        title: "From playback to recall",
        body:
          "People already use headphones for meetings, calls, podcasts, audiobooks, and focus. Adding capture and structured recall turns listening time into a searchable knowledge layer.",
      },
      {
        title: "Built around real listening behaviour",
        body:
          "Just Summit is being designed for full-session capture as well as marked moments, because not every valuable point is obvious before it is spoken.",
      },
      {
        title: "A preorder for early buyers",
        body:
          "The £49 reservation is the lower-friction option for buyers who want a first-batch place while the hardware moves through prototype and production.",
      },
    ],
    faqs: [
      {
        question: "Are transcription headphones common?",
        answer:
          "The category is still emerging. That creates a search opportunity, but buyers need clear product status and preorder terms.",
      },
      {
        question: "What does the £49 payment cover?",
        answer:
          "It reserves an early unit. The remaining £250 is due 60 days before shipping, making the deposit-path total £299.",
      },
    ],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
