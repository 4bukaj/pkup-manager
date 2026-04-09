import type { Report } from '../../../types/report';

export interface GenerateReportProps {
  reports: Report[];
  isReportsLoading: boolean;
}

export interface MonthOption {
  value: string;
  label: string;
  month: number;
  year: number;
}

export interface StatusBannerProps {
  hasMissingSettings: boolean;
  errorMessage: string | null;
  isCompleted: boolean;
  activeStep: number | null;
}

export interface ActionButtonProps {
  hasMissingSettings: boolean;
  showReport: boolean;
  isLoading: boolean;
  isError: boolean;
  isViewing: boolean;
  onViewReport: () => void;
  onGenerateReport: () => void;
}

export interface MonthSelectorProps {
  value: string;
  options: MonthOption[];
  onChange: (value: string) => void;
}
