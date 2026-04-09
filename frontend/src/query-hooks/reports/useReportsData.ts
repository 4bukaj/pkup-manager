import { useQuery } from '@tanstack/react-query';

import { getReports } from '@/api/reports.api';

export const useReportsData = () => {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchReports,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });

  return {
    reports: data || [],
    isLoading,
    isError,
    refetchReports,
  };
};
