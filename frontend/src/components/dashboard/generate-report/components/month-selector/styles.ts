import type { SxProps, Theme } from '@mui/material';

export const select: SxProps<Theme> = {
  '& .MuiSelect-select': {
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: '#1e1b4b',
    lineHeight: 1.15,
    fontSize: '2.125rem',
    paddingRight: '36px !important',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '16px',
    borderRadius: 2,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  '&::before, &::after': {
    display: 'none',
  },
  '& .MuiSelect-icon': {
    color: 'text.secondary',
    fontSize: '1.5rem',
  },
};
