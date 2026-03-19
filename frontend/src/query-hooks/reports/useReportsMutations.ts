import { deleteReport, getReportDownloadUrl } from '@/api/reports.api';
import { useToast } from '@/contexts/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReportsMutations = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutateAsync: handleDeleteReport, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteReport,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reports'] });
        showToast('Report deleted.');
      },
      onError: () => showToast('Failed to delete report.', 'error'),
    });

  const { mutateAsync: handleViewReport, isPending: isViewing } = useMutation({
    mutationFn: async (reportId: string) => {
      const url = await getReportDownloadUrl(reportId);
      window.open(url, '_blank');
    },
    onError: () => showToast('Failed to open report.', 'error'),
  });

  return { handleDeleteReport, isDeleting, handleViewReport, isViewing };
};
