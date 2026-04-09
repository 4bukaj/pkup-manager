import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserSettings } from '@/api/settings.api';
import { useToast } from '@/contexts/ToastContext';

export const useUserSettingsMutations = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutateAsync: handleUpdateUserSettings, isPending: isUpdating } =
    useMutation({
      mutationFn: updateUserSettings,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-settings'] });
        showToast('Settings saved successfully!');
      },
      onError: () => showToast('Error saving settings', 'error'),
    });

  return { handleUpdateUserSettings, isUpdating };
};
