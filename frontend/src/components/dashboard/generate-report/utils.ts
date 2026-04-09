import type { MonthOption } from './types';

export const getMonthOptions = (): MonthOption[] => {
  const options: MonthOption[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    options.push({
      value: `${year}-${String(month).padStart(2, '0')}`,
      label: `${date.toLocaleString('en-US', { month: 'long' })} ${year}`,
      month,
      year,
    });
  }

  return options;
};
