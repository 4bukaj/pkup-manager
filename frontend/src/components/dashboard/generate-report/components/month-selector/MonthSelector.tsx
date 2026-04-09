import type { SelectChangeEvent } from '@mui/material';
import { MenuItem,Select } from '@mui/material';
import React from 'react';

import type { MonthSelectorProps } from '../../types';
import * as styles from './styles';

const MonthSelector: React.FC<MonthSelectorProps> = ({
  value,
  options,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      variant="standard"
      sx={styles.select}
      renderValue={(val) => {
        const option = options.find((o) => o.value === val);
        return option?.label ?? val;
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MonthSelector;
