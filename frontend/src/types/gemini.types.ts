export interface IJiraIssue {
  key: string;
  summary: string;
  description: string;
}

export type IIssuesSummary = Record<number, string>;
