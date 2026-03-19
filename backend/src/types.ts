export interface IJiraIssue {
  key: string;
  summary: string;
  description: string;
}

export interface UserSettings {
  atlasian_key?: string;
  employee_name?: string;
  position?: string;
  department?: string;
  supervisor_name?: string;
}

export interface ReportData {
  reportPeriod: string;
  reportDate: string;
  employeeName: string;
  position: string;
  department: string;
  supervisorName: string;
  preparatoryWork?: string;
  programmingTasks?: string[];
  attachments?: string[];
  researchWork?: string;
  logoSvg?: string;
}
