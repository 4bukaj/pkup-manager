import { useQuery } from '@tanstack/react-query';
import { fetchGithubOrgs } from '@/api/github.api';

export const useGithubOrgsData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orgs'],
    queryFn: () => fetchGithubOrgs(),
    retry: 1,
  });

  return {
    githubOrgs: data || [],
    isLoading,
    isError,
  };
};
