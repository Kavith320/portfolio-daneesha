import { 
  BiLogoReact, 
  BiLogoNodejs, 
  BiLogoMongodb, 
  BiLogoTypescript, 
  BiLogoHtml5, 
  BiLogoCss3, 
  BiLogoTailwindCss, 
  BiLogoGit, 
  BiLogoGithub,
  BiLogoPostgresql
} from "react-icons/bi";
import { 
  SiNextdotjs, 
  SiExpress, 
  SiPostman, 
  SiDocker, 
  SiMysql, 
  SiJavascript,
  SiRedux,
  SiSocketdotio
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const developerInfo = {
  name: "Daneesha Disanayake",
  title: "Full Stack Developer",
  specialty: "MERN Stack Specialist",
  subTitle: "Building high-performance, beautiful, and accessible web applications.",
  bio: "I am a dedicated undergraduate Computer Science student and Full Stack Developer specializing in the MERN stack. Passionate about building robust backend architectures and sleek, animated frontends, I strive to create web experiences that are not only functional but visually captivating.",
  goals: "My goal is to leverage modern cloud services, scalable database design, and premium UI practices to write clean, maintainable code. I am actively seeking internship and full-time opportunities where I can solve complex engineering challenges.",
  studies: "Pursuing a B.S. in Computer Science at Tech State University, focusing on Software Engineering and Distributed Systems.",
  resumeUrl: "/resume/Daneesha_Disanayake_Resume.pdf",
  email: "daneesha.disanayake.dev@gmail.com",
  github: "https://github.com/daneeshadisnayake",
  linkedin: "https://www.linkedin.com/in/daneesha-disanayake-173406391/",
  twitter: "https://twitter.com/daneeshadev",
  avatarUrl: "https://res.cloudinary.com/dos0n84b0/image/upload/v1784532552/portfolio_assets/e33nvpsuvu5tw8n3jnph.jpg",
  heroVideoUrl: "https://res.cloudinary.com/dos0n84b0/video/upload/v1784534999/portfolio_assets/vtweypvrclsa3nvi3mmj.mp4",
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", icon: BiLogoHtml5, level: "Advanced" },
      { name: "CSS3", icon: BiLogoCss3, level: "Advanced" },
      { name: "JavaScript", icon: SiJavascript, level: "Advanced" },
      { name: "TypeScript", icon: BiLogoTypescript, level: "Intermediate" },
      { name: "React.js", icon: BiLogoReact, level: "Advanced" },
      { name: "Next.js", icon: SiNextdotjs, level: "Intermediate" },
      { name: "Tailwind CSS", icon: BiLogoTailwindCss, level: "Advanced" },
      { name: "Redux Toolkit", icon: SiRedux, level: "Intermediate" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: BiLogoNodejs, level: "Advanced" },
      { name: "Express.js", icon: SiExpress, level: "Advanced" },
      { name: "REST APIs", icon: SiPostman, level: "Advanced" },
      { name: "Socket.io", icon: SiSocketdotio, level: "Intermediate" },
    ]
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: BiLogoMongodb, level: "Advanced" },
      { name: "MySQL", icon: SiMysql, level: "Intermediate" },
      { name: "PostgreSQL", icon: BiLogoPostgresql, level: "Intermediate" },
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: BiLogoGit, level: "Advanced" },
      { name: "GitHub", icon: BiLogoGithub, level: "Advanced" },
      { name: "VS Code", icon: VscVscode, level: "Advanced" },
      { name: "Postman", icon: SiPostman, level: "Advanced" },
      { name: "Docker", icon: SiDocker, level: "Intermediate" },
    ]
  }
];

export const projects = [
  {
    title: "ApexTask - Collaborative Task Manager",
    description: "A real-time, collaborative project management board featuring drag-and-drop workspace lanes, dynamic socket events, and team activity feeds.",
    image: "/projects/apextask.png",
    github: "https://github.com/daneeshadisnayake/apextask",
    demo: "https://apextask-demo.vercel.app",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "Tailwind CSS"],
    features: [
      "Real-time card movements across lanes using socket connections.",
      "Workspace invite links and member management with custom permissions.",
      "Rich markdown card descriptions and nesting checkbox lists.",
      "Detailed activity log for every workspace action."
    ]
  },
  {
    title: "NovaCart - Modern E-Commerce Platform",
    description: "A premium shopping experience featuring stripe checkout, instant search filter queries, custom product dashboards, and robust session cart management.",
    image: "/projects/novacart.png",
    github: "https://github.com/daneeshadisnayake/novacart",
    demo: "https://novacart-demo.vercel.app",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "Stripe API", "Tailwind CSS"],
    features: [
      "Stripe payment integration with secure webhook transaction logs.",
      "Fully responsive admin analytics dashboard tracking sales and inventory.",
      "JWT and cookie-based authentication with OAuth sign-ins.",
      "Optimized images and lazy-loaded reviews for high performance."
    ]
  },
  {
    title: "ChromaChat - Interactive Chat Application",
    description: "A sleek, animation-heavy chat interface containing dynamic rooms, customizable profiles, emoji reactions, and read-receipt features.",
    image: "/projects/chromachat.png",
    github: "https://github.com/daneeshadisnayake/chromachat",
    demo: "https://chromachat-demo.vercel.app",
    tags: ["React", "Express", "Node.js", "MongoDB", "Framer Motion", "Socket.io"],
    features: [
      "Private and group message channels with typing indicators.",
      "Interactive emojis and reactions using smooth Framer Motion spring curves.",
      "File and image sharing using AWS S3 bucket uploads.",
      "Message history search and custom notification controls."
    ]
  },
  {
    title: "DevPulse - MDX Blogging Platform",
    description: "A fast, SEO-friendly tech blog supporting interactive markdown components, newsletter sub, syntax highlights, and read time counters.",
    image: "/projects/devpulse.png",
    github: "https://github.com/daneeshadisnayake/devpulse",
    demo: "https://devpulse-demo.vercel.app",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "MongoDB"],
    features: [
      "Write articles in markdown and embed live React playground components.",
      "Syntax-highlighted code blocks with copy-to-clipboard actions.",
      "Automatic dynamic sitemap and robots.txt generations.",
      "Newsletter integration with automatic email campaigns."
    ]
  }
];

export const experience = [
  {
    company: "ByteWave Technologies",
    role: "Full Stack Developer Intern",
    duration: "June 2025 - Present",
    description: [
      "Architected REST APIs for corporate portal, reducing page load latency by 20%.",
      "Built interactive customer feedback dashboard using MERN stack, Tailwind CSS, and Recharts.",
      "Refactored state management to Redux Toolkit, decreasing codebase size and improving bug isolation.",
      "Configured Docker containers for development environment, saving team members 2 hours per workspace setup."
    ]
  },
  {
    company: "Tech State Web Studio",
    role: "Junior Web Developer",
    duration: "September 2024 - May 2025",
    description: [
      "Maintained and updated customer-facing web platforms utilizing Node.js, Express, and MongoDB.",
      "Translated Figma designs into responsive, accessible, pixel-perfect HTML/CSS layout templates.",
      "Collaborated with graphic designers to implement CSS transitions and keyframe animations.",
      "Optimized databases using custom MongoDB query indexing, speeding up dashboard queries by 30."
    ]
  }
];

export const education = [
  {
    institution: "Tech State University",
    degree: "B.S. in Computer Science",
    duration: "2023 - 2027 (Expected)",
    details: "GPA: 3.82/4.0. Active member of Computer Science Association and Web Development Club.",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems (SQL & NoSQL)",
      "Software Engineering Principles",
      "Operating Systems",
      "Distributed Systems",
      "User Interface Design"
    ]
  }
];

export const certificates = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "December 2025",
    link: "https://aws.amazon.com",
    image: "/certificates/aws-cloud.png"
  },
  {
    title: "Meta Front-End Developer Professional",
    issuer: "Meta (via Coursera)",
    date: "August 2025",
    link: "https://coursera.org",
    image: "/certificates/meta-frontend.png"
  },
  {
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB University",
    date: "April 2025",
    link: "https://mongodb.com",
    image: "/certificates/mongodb-associate.png"
  }
];
