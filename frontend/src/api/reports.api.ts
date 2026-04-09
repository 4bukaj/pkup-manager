import type { IIssuesSummary } from '@/types/gemini.types';
import type { Report } from '@/types/report';

import api from '.';

const BASE_PATH = '/api/reports';

export const generatePdf = async (
  summary: IIssuesSummary,
  month?: number,
  year?: number
): Promise<Report> => {
  const response = await api.post<{
    report: Report;
    downloadUrl: string | null;
  }>(`${BASE_PATH}/generate`, { summary, month, year });

  return response.data.report;
};

export const getReports = async (): Promise<Report[]> => {
  const response = await api.get<{ reports: Report[] }>(`${BASE_PATH}/all`);
  return response.data.reports;
};

export const getReportDownloadUrl = async (
  reportId: string
): Promise<string> => {
  const response = await api.get<{ downloadUrl: string }>(
    `${BASE_PATH}/${reportId}/download`
  );
  return response.data.downloadUrl;
};

export const deleteReport = async (reportId: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${reportId}`);
};
