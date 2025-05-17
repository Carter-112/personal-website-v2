// Section type definitions
export interface BaseSection {
  id: string;
  type: string;
  title: string;
  order: number;
  content?: string;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  subtitle: string;
  content: string;
}

export interface AboutSection extends BaseSection {
  type: 'about';
  content: string;
}

export interface ContentSection extends BaseSection {
  type: 'content';
  content: string;
}

export interface SkillsSection extends BaseSection {
  type: 'skills';
  skills: Array<{ name: string; level: number }>;
}

export interface ProjectsSection extends BaseSection {
  type: 'projects';
  projects: Array<{ title: string; description: string; image: string }>;
}

export interface ContactSection extends BaseSection {
  type: 'contact';
  content: string;
  email: string;
  phone: string;
}

export type Section = HeroSection | AboutSection | ContentSection | SkillsSection | ProjectsSection | ContactSection;
