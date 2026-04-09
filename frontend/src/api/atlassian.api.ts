import type { IJiraIssue } from '@/types/gemini.types';

import api from '.';

const BASE_PATH = '/api/atlassian';

export const fetchJiraIssues = async (
  month?: number,
  year?: number
): Promise<IJiraIssue[]> => {
  const params = month && year ? { month, year } : undefined;
  const response = await api.get(`${BASE_PATH}/issues`, { params });

  return response.data;
};
