import { format, set, subMonths, addDays } from 'date-fns';
import { supabase } from './supabaseClient';
import { UserSettings } from './types';

export const getUserSettings = async (userId: string): Promise<UserSettings> => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('github_owner, github_repos, atlasian_key, employee_name, position, department, supervisor_name')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user settings:', error);
  }

  return (data as UserSettings) ?? {};
};

export const parseADF = (node: any): string => {
  if (!node) return '';
  if (node.type === 'text') return node.text ?? '';
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(parseADF).join(' ');
  }
  return '';
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const getReportDateRange = (): { start: string; end: string } => {
  const today = new Date();
  const start = set(subMonths(today, 1), { date: 19 });
  const end = set(today, { date: 18 });
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
};

export const getReportDate = (end: string): string =>
  format(addDays(new Date(end), 1), 'dd-MM-yyyy');
