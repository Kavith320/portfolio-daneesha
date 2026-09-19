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
  stats: [
    { value: "2+", label: "Years Coding" },
    { value: "10+", label: "Projects Built" },
    { value: "5+", label: "Technologies" },
  ],
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
    title: "Smart Aquarium Monitoring & Controlling System",
    description: "An IoT-based embedded solution automating aquarium environmental conditions using an ESP8266 microcontroller, Node.js backend, and Next.js frontend.",
    image: "",
    github: "https://lnkd.in/gBzM6bW6",
    demo: "",
    tags: ["IoT", "ESP8266", "Node.js", "Next.js", "MQTT"],
    features: [
      "Real-time temperature, light, water level & flow monitoring",
      "Automated control of water pump, aeration motor & lighting",
      "Scheduled smart feeding with manual override",
      "Remote monitoring via web dashboard with alert notifications"
    ]
  },
  {
    title: "Modern Full-Stack Restaurant Application",
    description: "A clean, responsive web app that helps restaurant owners manage menus, orders, and reservations all in one place with a premium glass-morphism UI.",
    image: "",
    github: "",
    demo: "",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "SQLite"],
    features: [
      "Menu Builder: Drag-and-drop dishes, set prices, and categorize items.",
      "Order Dashboard: Real-time order tracking for kitchen staff.",
      "Reservation System: Calendar view with automatic slot management.",
      "Analytics: Simple sales reports and popular-dish insights."
    ]
  }
];

export const experience = [
  {
    company: "Dialog Axiata PLC",
    role: "Customer Service Agent",
    duration: "Jul 2023 - Oct 2023",
    description: [
      "Worked full-time on-site in Gampaha, Western Province, Sri Lanka."
    ]
  }
];

export const education = [
  {
    institution: "University of Vavuniya",
    degree: "Bachelor of Information Communication Technology honours, Information Technology",
    duration: "Jun 2023 – Jun 2027",
    details: "Activities and societies: Member of LEO Club",
    coursework: [
      "Full-Stack Development",
      "Project Management"
    ]
  },
  {
    institution: "Rathnavali Balika Vidyalaya – Gampaha",
    degree: "High School Education",
    duration: "Jan 2017 – Jan 2021",
    details: "",
    coursework: []
  }
];

export const certificates = [
  {
    title: "Introduction to MongoDB",
    issuer: "Simplilearn",
    date: "May 2026",
    link: "https://www.simplilearn.com",
    image: ""
  },
  {
    title: "The Full Stack",
    issuer: "Meta (Coursera)",
    date: "Apr 2026",
    link: "https://coursera.org/verify/ZUGN44FG9FLN",
    image: ""
  }
];
