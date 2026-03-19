import { supabase } from '@/supabaseClient';
import type { IUserSettings } from '@/types/settings.types';

export const updateUserSettings = async ({
  atlasian_key,
  employee_name,
  position,
  department,
  supervisor_name,
}: IUserSettings) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('user_settings').upsert(
    {
      user_id: user.id,
      atlasian_key,
      employee_name,
      position,
      department,
      supervisor_name,
    },
    { onConflict: 'user_id' }
  );

  if (error) throw error;
};
