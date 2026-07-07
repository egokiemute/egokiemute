export const blogPosts = [
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
