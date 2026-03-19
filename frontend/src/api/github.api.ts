import api from '.';
import type { IFetchGithubCommits, IGithubOption } from '../types/github.types';

const BASE_PATH = '/api/github';
const OWNER = 'cobrick';

export const fetchGithubOrgs = async (): Promise<IGithubOption[]> => {
  const response = await api.get(`${BASE_PATH}/user-orgs`);

  return response.data.map((org: any) => ({
    id: org.id,
    value: org.login,
  }));
};

export const fetchGithubRepos = async (): Promise<IGithubOption[]> => {
  const response = await api.get(`${BASE_PATH}/repos`, {
    params: {
      owner: OWNER,
    },
  });

  return response.data.map((repo: any) => ({
    id: repo.id,
    value: repo.name,
  }));
};

export const fetchBranches = async () => {
  const response = await api.get(`/${BASE_PATH}/branches`, {
    params: {
      owner: 'cobrick',
      repo: 'frontend',
      username: 'jakub',
    },
  });

  return response.data;
};

export const fetchCommits = async (params: IFetchGithubCommits) => {
  const response = await api.get(`${BASE_PATH}/commits`, {
    params: {
      ...params,
      owner: OWNER,
      sha: 'main',
    },
  });

  return response.data;
};
