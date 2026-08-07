export const blogPosts = [
  {
    slug: "getting-a-real-product-spec-out-of-any-ai-tool",
    title: "Getting a Real Product Spec Out of Any AI Tool",
    date: "2026-08-08",
    readTime: "9 min read",
    category: "Product",
    image: "/assets/user-img.jpeg",
    excerpt:
      "A working prompt kit for turning any AI tool into a spec interrogator. Copy the blocks, fill the brackets, and force every decision out of your head before any code gets generated.",
    tags: ["ai", "product", "prompting", "specs"],
    sections: [
      {
        heading: "Step 0: Before you prompt anything",
        body:
          "Write two sentences by hand. No AI.\n\n[Product name] is a [what kind of thing] that lets [one specific user] do [one specific job]. Today they do it by [current painful method].\n\nIf you can't write those two sentences, you're not ready to spec. Go talk to the user first. Everything below assumes you have them.",
      },
      {
        heading: "Step 1: The interrogation prompt",
        body:
          "Don't ask for a spec straight away. Ask to be questioned first. This is the single highest-value step, and the one almost everyone skips.\n\nPrompt: \"I'm about to write a product spec for something I'm building. Before you write anything, interview me. Here's what I have so far: [paste your two sentences]. Ask me the questions you'd need answered to write a spec precise enough that a developer could build from it without guessing. Ask them one batch at a time, maximum 5 questions per batch, ordered by how much the answer would change the shape of the product. Prioritise questions about: what happens in the unhappy path, what data must exist before the first screen works, what I am deliberately NOT building, who else touches this besides the main user. Do not write the spec yet. Do not suggest features. Just ask.\"\n\nAnswer honestly, including \"I don't know.\" A spec built on invented answers is worse than no spec.",
      },
      {
        heading: "Step 2: The spec generation prompt",
        body:
          "Once the questions run out, paste this.\n\nPrompt: \"Now write the spec, using my answers above. Follow this structure exactly and do not add sections. Rules: plain language, no marketing copy, no adjectives that don't carry information. If something is undecided, write UNDECIDED: <the open question> rather than inventing an answer. No implementation detail unless I gave it to you: describe behaviour, not code. Be specific enough that two different developers would build the same thing from it.\n\nStructure: 1. WHAT IT IS: two sentences, no more. 2. WHO IT'S FOR: one primary user, one job; name secondary users separately. 3. THE CORE LOOP: the single sequence of actions the product exists to support, numbered. 4. DATA MODEL: every entity, its fields, its relationships, flagging which fields are required at creation. 5. SCREENS / SURFACES: a named list, each with its job in one line and what a user can do there. 6. RULES AND EDGE CASES: permissions, states, and what happens when things are empty, duplicated, expired, or fail. 7. OUT OF SCOPE: an explicit list of things this product does NOT do, including the tempting ones. 8. OPEN QUESTIONS: everything marked UNDECIDED, collected.\"",
      },
      {
        heading: "Step 3: Attack your own spec",
        body:
          "The first draft is always too agreeable. Run these separately, one at a time.\n\nFind the holes: \"Read the spec above as a hostile senior engineer who has to build it. List every place where you'd have to make a decision the spec doesn't make for you. Don't fix them, just list them. Be specific about which line is ambiguous.\"\n\nCut it down: \"Which parts of this spec could be removed while still delivering the core loop in section 3? For each, say what breaks if it's removed. I want the smallest version that's still worth shipping.\"\n\nStress the data model: \"Walk three concrete scenarios through the data model in section 4: one happy path, one where a user abandons halfway, and one where two users act on the same record at the same time. Tell me where the model doesn't hold.\"\n\nThen regenerate the spec with the fixes. Two or three rounds is normal.",
      },
      {
        heading: "Step 4: Turn the spec into a build plan",
        body:
          "A spec tells you what. A plan tells you in what order.\n\nPrompt: \"Break this spec into build phases. Constraint: every phase must be independently shippable, it can go live on its own and be worth something, even if the phases after it never get built. If a phase can't ship alone, split it again. For each phase give me: the name and what it delivers, the tasks (each small enough to be one file or one concern), what is deliberately deferred to a later phase, and how I'll know the phase is done. Aim for 3-5 phases. Phase 1 should be auth and the data model. Payments, scale, and polish go last.\"",
      },
      {
        heading: "Step 5: The task prompt for build time",
        body:
          "Never paste the whole spec at build time. Paste this shape instead: the spec slice (only the section for the thing you're building now), the relevant files (the existing code it must match, not the whole repo), the constraints (don't touch migrations, don't add dependencies, follow the conventions in CLAUDE.md), and the exit condition (done means: <specific, checkable>; stop there, don't add anything I didn't ask for).\n\nThe exit condition is what stops the model gold-plating. Most people never write one.",
      },
      {
        heading: "What good looks like",
        body:
          "A spec is working if: the out-of-scope list is longer than you're comfortable with, someone who wasn't in the conversation could build from it, every entity in the data model appears in at least one screen, nothing marked UNDECIDED blocks Phase 1, and you can read the core loop aloud in under 30 seconds.",
      },
      {
        heading: "Common failure modes",
        body:
          "The model wrote a business plan. You gave it market context instead of user behaviour, re-prompt with only the two sentences and the core loop.\n\nEverything sounds great and nothing is specific. You skipped Step 1. The interrogation is what produces detail; generation alone just produces fluency.\n\nThe spec grew every time you touched it. Models add, they rarely subtract, run the \"cut it down\" prompt after every regeneration.\n\nYou accepted an invented answer. Search the doc for anything you don't actually know to be true. That's a decision the model made for you, and you'll discover it in production.\n\nThe phases aren't really independent. If Phase 2 is required for Phase 1 to be usable, they're one phase. Re-split.",
      },
      {
        heading: "The short version",
        body:
          "Two sentences, written by hand. Make it interview you. Generate the spec. Attack it, twice. Split into shippable phases. Build one slice at a time, with an exit condition.\n\nThe generation was never the slow part. Deciding was.",
      },
    ],
  },
  {
    slug: "building-resilient-products",
    title: "Building resilient products under pressure",
    date: "2024-06-18",
    readTime: "6 min read",
    category: "Product",
    image: "/assets/user-img.jpeg",
    excerpt:
      "How to keep quality high while shipping fast. A practical loop for small teams working with tight timelines.",
    tags: ["strategy", "process", "quality"],
    sections: [
      {
        heading: "Start with a narrow definition of done",
        body:
          "Resilience comes from clarity. A scoped definition of done reduces rework, limits churn, and makes decisions easier when schedules are tight.",
      },
      {
        heading: "Build for recovery, not perfection",
        body:
          "Focus on quick rollback paths, observable states, and fast feedback. The best systems fail gracefully and are easy to fix.",
      },
      {
        heading: "Make tradeoffs explicit",
        body:
          "Write down what you are not doing. It aligns stakeholders and protects the team from scope creep in the final stretch.",
      },
    ],
  },
  {
    slug: "designing-interfaces-with-constraint",
    title: "Designing interfaces with real constraints",
    date: "2024-05-27",
    readTime: "5 min read",
    category: "Design",
    image: "/assets/profile-img.png",
    excerpt:
      "Constraints are not a blocker. They are a framework for creating better interfaces with fewer surprises.",
    tags: ["ui", "systems", "delivery"],
    sections: [
      {
        heading: "Embrace the grid early",
        body:
          "A visible layout system reduces debate and makes collaboration smoother across design and engineering.",
      },
      {
        heading: "Use tokens, not one-off values",
        body:
          "Tokenized spacing, type, and color make the UI consistent and easier to scale as features grow.",
      },
      {
        heading: "Prototype for edge cases",
        body:
          "Stress-test your layout with real content. It avoids the surprise of broken layouts when the data gets messy.",
      },
    ],
  },
  {
    slug: "shipping-without-burnout",
    title: "Shipping without burnout",
    date: "2024-05-05",
    readTime: "4 min read",
    category: "Culture",
    image: "/assets/user-image.png",
    excerpt:
      "Shipping is a habit. Sustainable pace protects quality and keeps momentum predictable for the long term.",
    tags: ["teams", "habits", "delivery"],
    sections: [
      {
        heading: "Build a cadence you can repeat",
        body:
          "A lightweight release rhythm removes stress because everyone knows what is expected and when.",
      },
      {
        heading: "Reduce hidden work",
        body:
          "Track the tasks that do not show up on the roadmap. They are often the cause of slowdowns and fatigue.",
      },
      {
        heading: "Protect focus time",
        body:
          "A small block of uninterrupted time is worth more than hours of fragmented attention.",
      },
    ],
  },
  {
    slug: "practical-frontend-architecture",
    title: "A practical approach to frontend architecture",
    date: "2024-04-11",
    readTime: "7 min read",
    category: "Engineering",
    image: "/assets/me.jpg",
    excerpt:
      "A simple architecture reduces friction and keeps teams moving, even when the product is evolving fast.",
    tags: ["frontend", "architecture", "patterns"],
    sections: [
      {
        heading: "Prefer clarity over cleverness",
        body:
          "Readable, boring code scales better than clever patterns when multiple people are contributing.",
      },
      {
        heading: "Localize complexity",
        body:
          "Isolate complex logic behind small boundaries so the rest of the system stays easy to reason about.",
      },
      {
        heading: "Use composition as the default",
        body:
          "Composable components unlock reuse without overfitting to one scenario.",
      },
    ],
  },
];

export const getPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export const getAllPostSlugs = () => blogPosts.map((post) => post.slug);
