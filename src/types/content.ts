/**
 * Content contracts.
 *
 * Every piece of content on this site is typed before it is written, so the
 * data model is explicit and the compiler catches an incomplete entry. This is
 * the same discipline as specifying a data dictionary before building a report.
 */

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string[];
  focusAreas: string[];
}

export interface Role {
  company: string;
  position: string;
  location: string;
  start: string;
  end: string | "Present";
  /** Rendered as the lead sentence for the role. */
  context: string;
  highlights: string[];
  domains?: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
  thesis?: {
    title: string;
    credits: number;
    grade: string;
    url: string;
  };
  gpa?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
  note?: string;
}

/** Where a portfolio project currently stands. Honesty here is deliberate. */
export type ProjectStatus = "planned" | "in-progress" | "complete";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  domain: string;
  status: ProjectStatus;
  /** One-sentence statement of the decision the dashboard exists to drive. */
  decision: string;
  summary: string;
  /** The technical skill this project exists to prove. */
  centreOfGravity: string;
  tools: string[];
  metrics: ProjectMetric[];
  caseStudy: CaseStudySection[];
  /** Findings the report is designed to surface. */
  findings: string[];
  /**
   * Link to this project's folder in the GitHub repository — the only
   * destination a project has. There is deliberately no `liveUrl`: Power BI's
   * Publish to web requires a work or school account, so these reports will
   * never have public URLs, and a field that can never be filled is the same
   * dead weight `repoPath` was.
   */
  repoUrl?: string;
}
