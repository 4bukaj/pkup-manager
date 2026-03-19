import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import type { IUserSettings } from '@/types/settings.types';

export const useUserSettingsData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user-settings'],
    queryFn: async (): Promise<IUserSettings | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from('user_settings')
        .select(
          'atlasian_key, employee_name, position, department, supervisor_name'
        )
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data as IUserSettings | null;
    },
    retry: 1,
  });

  return {
    userSettings: data,
    isLoading,
    isError,
    error,
  };
};
