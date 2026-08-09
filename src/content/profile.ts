import type { Education, Language, Profile, Role, SkillGroup } from "@/types/content";

export const profile: Profile = {
  name: "Sumaita Faria Karim Adrita",
  shortName: "Sumaita Faria Karim",
  title: "Business Analyst & Product Owner",
  tagline:
    "I bridge the gap between vision and execution — turning ambitious ideas into intelligent, human-centered digital products.",
  location: "Tampere, Finland",
  email: "sumaitafariakarim@gmail.com",
  phone: "+358 41 721 3971",
  linkedin:
    "https://www.linkedin.com/in/sumaita-faria-karim-adrita-86253420a/",
  summary: [
    "I help organizations bridge the gap between vision and execution, transforming ambitious ideas into intelligent, human-centered digital products. With proven experience leading initiatives across IoT, HealthTech, Textile and BAaaS domains, I act as a cross-functional connector from concept to launch — delivering precision, empathy and measurable results.",
    "I believe modern business analysis goes beyond documentation. It is about driving clarity, fostering collaboration, and enabling continuous adaptation in a world where technology evolves faster than organizations.",
  ],
  focusAreas: [
    "Product Ideation & Ownership",
    "AI-Driven Digital Transformation",
    "Requirement Engineering (BRD, SRS, FDD, RTM)",
    "MVP & Phasing Strategy",
    "UI/UX Collaboration",
    "Process Automation (BPMN)",
    "Stakeholder Engagement",
    "Presales Strategy",
  ],
};

export const roles: Role[] = [
  {
    company: "Médecins Sans Frontières (MSF)",
    position: "Fundraising Team Lead",
    location: "Tampere, Finland",
    start: "Apr 2024",
    end: "Present",
    context:
      "Leading a face-to-face fundraising team for an international humanitarian organisation.",
    highlights: [
      "Led a high-performing fundraising team of 7 from Tampere to exceed annual revenue targets by 15% through strategic planning and donor engagement.",
      "Managed cross-functional collaboration to streamline fundraising operations and enhance donor communication workflows.",
      "Trained and mentored team members on best practices in donor relations, argumentation, sales pitch and event coordination.",
    ],
    domains: ["Nonprofit", "Donor Analytics", "Team Leadership"],
  },
  {
    company: "Brain Station 23",
    position: "Business Analyst",
    location: "Dhaka, Bangladesh",
    start: "Jan 2022",
    end: "Jul 2023",
    context:
      "Owned requirements and delivery for enterprise clients across multiple regulated domains.",
    highlights: [
      "Delivered BRD, SRS and FDDs for enterprise clients according to QMS and CMMI standards.",
      "Created user journeys, mind maps and wireframes to improve stakeholder alignment.",
      "Conducted As-Is / To-Be analysis and MVP definition.",
      "Acted as solution consultant for Energy, HealthTech, Textile and IoT clients.",
      "Drove cross-functional collaboration and served as a key point of contact between clients and the development team.",
      "Managed the product backlog, set priorities and drove value delivery through an iterative Agile process.",
      "Standardized AI-assisted documentation and wireframing for presales; collaborated with Presales and Marketing on case studies and demos.",
      "Mentored 2 junior business analysts through a 3-month internship, providing leadership in both technical skills and professional growth.",
      "Built reusable front-end prototypes and process templates.",
    ],
    domains: ["IoT", "ERP", "HealthTech", "Textile", "Energy", "Fintech"],
  },
  {
    company: "Brain Station 23",
    position: "Trainee Business Analyst",
    location: "Dhaka, Bangladesh",
    start: "Sep 2021",
    end: "Jan 2022",
    context:
      "First analyst role, supporting a large-scale live product alongside senior analysts.",
    highlights: [
      "Provided first-line support for a large-scale live project.",
      "Developed foundational skills in business analysis and documentation.",
      "Learned key concepts in UI/UX design and Agile methodologies.",
      "Assisted senior analysts in gathering and documenting business requirements through SRS and BRD.",
      "Created user stories and wireframes using Figma, Miro and Draw.io.",
      "Participated in Agile practices, supporting sprint activities with Jira and Trello.",
      "Conducted research on industry trends to support requirement analysis.",
    ],
    domains: ["Agile", "UI/UX", "Documentation"],
  },
];

export const education: Education[] = [
  {
    degree: "MSc",
    field: "Business and Technology — Industrial Engineering and Management",
    institution: "Tampere University",
    location: "Tampere, Finland",
    start: "2023",
    end: "2025",
    gpa: "4.23 / 5.0",
    detail:
      "Graduated with a Master's degree focused on the intersection of industrial engineering, business strategy and technology management.",
    thesis: {
      title: "Optimizing Resource Planning in Hybrid Knowledge Work",
      credits: 30,
      grade: "4/5 (very good)",
      url: "https://trepo.tuni.fi/handle/10024/232515",
    },
  },
  {
    degree: "BSc",
    field: "Information and Communication Engineering",
    institution: "Bangladesh University of Professionals (BUP)",
    location: "Dhaka, Bangladesh",
    start: "2017",
    end: "2021",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Business Intelligence",
    items: ["Power BI", "DAX", "Power Query (M)", "Data Modelling", "Excel"],
  },
  {
    // Named "Requirements" rather than "Documentation" so it does not collide
    // with the "Documentation Tools" group below.
    category: "Analysis & Requirements",
    items: ["BRD", "SRS", "FDD", "RTM", "As-Is / To-Be", "BPMN", "User Stories"],
  },
  {
    category: "Design & Prototyping",
    items: ["Figma", "draw.io", "Miro", "Lucidchart", "Uizard", "Excalidraw"],
  },
  {
    category: "Project & Collaboration",
    items: ["Jira", "Trello", "OpenProject", "Confluence", "GitHub", "ClickUp"],
  },
  {
    category: "Documentation Tools",
    items: ["MS 365", "Google Workspace", "Notion", "PlantUML"],
  },
  {
    category: "AI Tools",
    items: [
      "ChatGPT Plus",
      "Claude",
      "Lovable.dev",
      "Napkin.ai",
      "Gamma.app",
      "Cursor",
      "Windsurf",
    ],
  },
];

/**
 * Industries delivered in — deliberately not a skill group.
 *
 * These are not tools or techniques, so they get their own treatment rather
 * than sitting in the skills grid beside Figma and Jira. Sourced from the
 * resume's Domains line plus Energy, which appears in the Business Analyst
 * role but not in that line.
 */
export const domains: string[] = [
  "IoT",
  "ERP",
  "Fintech",
  "HealthTech",
  "Textile",
  "Energy",
];

export const languages: Language[] = [
  { name: "Bengali (Bangla)", level: "Native" },
  { name: "English", level: "Advanced", note: "IELTS 7.5 overall" },
  { name: "Finnish", level: "Elementary", note: "Finnish 01" },
  { name: "Hindi", level: "Elementary" },
];
