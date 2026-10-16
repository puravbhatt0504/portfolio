export const siteConfig = {
  name: "Purav Bhatt",
  shortName: "Purav",
  title: "Purav Bhatt | Full-Stack Product Developer",
  role: "Full-Stack Product Developer",
  description:
    "Interactive portfolio for Purav Bhatt, a full-stack product developer building polished Next.js, TypeScript, and Flutter experiences.",
  availability: "Open to full-time roles, contract work, and product collaborations.",
  email: "pbhatt340@gmail.com",
  linkedin: "https://www.linkedin.com/in/pb0504/",
  resumeUrl: "/resume.pdf",
  services: [
    {
      title: "Frontend Experiences",
      description:
        "Marketing sites, portfolio builds, and product surfaces with motion, clarity, and conversion in mind.",
    },
    {
      title: "Full-Stack Delivery",
      description:
        "Next.js, TypeScript, and backend workflows connected into maintainable products that can keep shipping.",
    },
    {
      title: "Ops and Admin Tools",
      description:
        "Dashboards, internal tools, and business workflows that stay usable under real team pressure.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Clarify the business goal",
      description:
        "Start from the outcome we want the interface or system to drive, not just the features list.",
    },
    {
      step: "02",
      title: "Shape the interaction model",
      description:
        "Map layout, motion, and information hierarchy so the product feels confident before the polish pass.",
    },
    {
      step: "03",
      title: "Build for real usage",
      description:
        "Translate the concept into production-ready code with data flow, responsiveness, and maintainability in place.",
    },
    {
      step: "04",
      title: "Polish and tighten",
      description:
        "Use motion, micro-details, and QA to make the final result feel premium instead of merely finished.",
    },
  ],
};

export type FeaturedProject = {
  name: string;
  tag: string;
  desc: string;
  image: string;
  repo?: string;
  live?: string;
  demoVideo?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "Marka",
    tag: "Flutter · Next.js · Supabase",
    desc: "Workforce platform in daily use by a fire-services company: two Flutter apps and a Next.js admin portal with live GPS tracking, biometric check-in, OCR receipt scanning, and payroll.",
    image: "/projects/marka.jpg",
    live: "https://employee-manager-final.vercel.app",
    demoVideo: "/marka-demo.mp4",
  },
  {
    name: "RelayQ",
    tag: "Node.js · BullMQ · Postgres · AWS",
    desc: "Multi-tenant background-job service that survives workers being killed mid-flight: 33k jobs/min, and 0 lost or duplicated across 10k jobs under chaos testing.",
    image: "/projects/relayq.jpg",
    repo: "https://github.com/puravbhatt0504/relayq",
    live: "https://relayq-demo.onrender.com/demo",
    demoVideo: "/relayq-demo.mp4",
  },
  {
    name: "PulseBoard",
    tag: "Socket.io · Redis · Postgres · AWS CDK",
    desc: "Real-time collaborative Kanban with live cursors and shared editing, deployed to ECS Fargate behind CloudFront with infrastructure as code and AI features on Bedrock.",
    image: "/projects/pulseboard.jpg",
    repo: "https://github.com/puravbhatt0504/pulseboard",
    live: "https://pulseboard-fmbj.onrender.com",
    demoVideo: "/pulseboard-demo.mp4",
  },
  {
    name: "Urban Policy Simulation",
    tag: "Simulation · AI · Python",
    desc: "Agent-based simulation platform for testing zoning, transit, and housing policy on real city data before it is enacted, with AI-generated scenarios and explanations.",
    image: "/projects/urban-policy-simulation.png",
    repo: "https://github.com/simulationsys/urban-policy-simulation",
  },
];
