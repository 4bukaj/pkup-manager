import type { IJiraIssue } from '@/types/gemini.types';
import api from '.';

const BASE_PATH = '/api/atlassian';

export const fetchJiraIssues = async (): Promise<IJiraIssue[]> => {
  const response = await api.get(`${BASE_PATH}/issues`);

  return response.data;
};
