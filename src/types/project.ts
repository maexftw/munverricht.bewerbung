/**
 * TypeScript Data Models & Contracts for Projects, Flagship Case Study, and Career Timeline
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

// -------------------------------------------------------------
// Flagship ASL Ademco Domain Models
// -------------------------------------------------------------

export interface FlagshipPillarDetail {
  id: string;
  number: number;
  title: string;
  description: string;
  tech: string;
  icon?: string;
  highlights: string[];
}

export interface ReActStep {
  cycle: number;
  thought: string;
  action: string;
  tool: string;
  args: Record<string, unknown>;
  observation: Record<string, unknown> | Array<Record<string, unknown>> | string;
  verified: boolean;
}

export interface ReActTrace {
  id: string;
  title: string;
  query: string;
  cycles: ReActStep[];
  finalAnswer: string;
  totalCycles: number;
}

export interface D1SqlSchemaColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  description: string;
}

export interface D1SqlSchema {
  tableName: string;
  description: string;
  ddl: string;
  columns: D1SqlSchemaColumn[];
  sampleRowsCount: number;
}

export interface D1SqlQuery {
  id: string;
  title: string;
  stage: string;
  query: string;
  params: string[];
  explanation: string;
  resultSummary: string;
  mockExecutionTimeMs: number;
  mockResults: Array<Record<string, unknown>>;
}

export interface KpiMetric {
  label: string;
  value: string;
  detail: string;
  unit?: string;
  category: 'performance' | 'catalog' | 'guardrail' | 'quality';
}

export interface FlagshipAttributionInfo {
  prototype: string;
  engineering: string[];
}

export interface FlagshipCaseStudyData {
  client: string;
  clientUrl: string;
  role: string;
  timeframe: string;
  summary: string;
  problem: string;
  pillars: FlagshipPillarDetail[];
  reactTraces: ReActTrace[];
  sqlSchemas: D1SqlSchema[];
  sqlQueries: D1SqlQuery[];
  metrics: KpiMetric[];
  attribution: FlagshipAttributionInfo;
}

// -------------------------------------------------------------
// Secondary Projects Domain Models
// -------------------------------------------------------------

export type ProjectCategory = 'edge' | 'ai' | 'infra';
export type ProjectGenreFilter = 'all' | 'edge' | 'ai' | 'infra';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface SecondaryProject {
  id: string;
  title: string;
  client: string;
  year: string;
  domain: string;
  category: ProjectCategory;
  description: string;
  objectives: string[];
  architecture: string;
  architecturePillars?: string[];
  stack: string[];
  metrics: string;
  keyLearnings: string;
  highlights: string[];
  links?: ProjectLink[];
}

// -------------------------------------------------------------
// Profile Timeline & Skills Matrix Models
// -------------------------------------------------------------

export interface TimelineMilestone {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
  isCurrent?: boolean;
}

export interface SkillItem {
  name: string;
  level?: 'expert' | 'advanced' | 'proficient';
  highlighted?: boolean;
  tags?: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  category: string;
  description?: string;
  skills: string[];
  items?: SkillItem[];
}
