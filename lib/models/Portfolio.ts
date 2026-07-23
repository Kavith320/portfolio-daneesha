import mongoose, { Schema } from "mongoose";

const DeveloperInfoSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  specialty: { type: String, required: true },
  subTitle: { type: String, required: true },
  bio: { type: String, required: true },
  goals: { type: String, required: true },
  studies: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  email: { type: String, required: true },
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  twitter: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  heroVideoUrl: { type: String }
}, { _id: false });

const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["Advanced", "Intermediate", "Beginner"], required: true }
}, { _id: false });

const SkillCategorySchema = new Schema({
  category: { type: String, required: true },
  items: [SkillItemSchema]
}, { _id: false });

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  github: { type: String, default: "" },
  demo: { type: String, default: "" },
  tags: [String],
  features: [String]
}, { _id: false });

const ExperienceItemSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: [String]
}, { _id: false });

const EducationItemSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  details: { type: String, default: "" },
  coursework: [String]
}, { _id: false });

const CertificateSchema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, default: "" },
  image: { type: String, required: true }
}, { _id: false });

const PortfolioSchema = new Schema({
  developerInfo: { type: DeveloperInfoSchema, required: true },
  skills: [SkillCategorySchema],
  projects: [ProjectSchema],
  experience: [ExperienceItemSchema],
  education: [EducationItemSchema],
  certificates: [CertificateSchema]
}, { timestamps: true });

export const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
