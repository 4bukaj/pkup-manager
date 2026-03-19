import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos } from '@/api/github.api';

export const useGithubReposData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['repos'],
    queryFn: () => fetchGithubRepos(),
    retry: 1,
  });

  return {
    githubRepos: data || [],
    isLoading,
    isError,
  };
};
