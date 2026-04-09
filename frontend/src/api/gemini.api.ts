import type { IJiraIssue } from '@/types/gemini.types';

import api from '.';

const BASE_PATH = '/api/gemini';

export const getIssuesSummary = async (issues: IJiraIssue[]) => {
  const response = await api.post(`${BASE_PATH}/summarize-issues`, { issues });

  return response.data;
};
