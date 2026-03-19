import type { Report } from '../../../types/report';

export interface ReportCTAProps {
  currentMonthName: string;
  monthlyReport: Report | undefined;
  isReportsLoading: boolean;
}
