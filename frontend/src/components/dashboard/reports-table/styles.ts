import type { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  px: 0.5,
};

export const headerStack: SxProps<Theme> = {
  mb: 3,
};

export const headerTitle: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '-0.02em',
};

export const tablePaper: SxProps<Theme> = {
  borderRadius: 1,
  overflow: 'hidden',
  border: '1px solid',
  borderColor: 'rgba(0,0,0,0.06)',
};

export const tableHeadRow: SxProps<Theme> = {
  bgcolor: 'rgba(0,0,0,0.025)',
  '& th': {
    borderBottom: '1px solid rgba(0,0,0,0.06)',
  },
};

export const tableHeaderCell: SxProps<Theme> = {
  py: 2,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'text.secondary',
};

export const tableBodyRow: SxProps<Theme> = {
  '&:last-child td, &:last-child th': { border: 0 },
  '& td': {
    borderBottom: '1px solid rgba(0,0,0,0.04)',
  },
  '&:last-child td': {
    borderBottom: 'none',
  },
  transition: 'background-color 0.15s ease',
  '&:hover': {
    bgcolor: 'rgba(0,0,0,0.018)',
  },
};

export const reportNameCell: SxProps<Theme> = {
  fontWeight: 600,
  py: 2.5,
  color: 'text.primary',
};

export const fileIconWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
};

export const fileIconBox: SxProps<Theme> = {
  width: 32,
  height: 32,
  borderRadius: 1.5,
  bgcolor: 'rgba(99,102,241,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const tableBodyCell: SxProps<Theme> = {
  py: 2.5,
};

export const monthChip: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  px: 1.25,
  py: 0.4,
  borderRadius: 10,
  bgcolor: 'rgba(0,0,0,0.04)',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'text.secondary',
  letterSpacing: '0.01em',
};

export const actionsCell: SxProps<Theme> = {
  py: 2,
};

export const actionIconButton: SxProps<Theme> = {
  color: 'text.secondary',
  transition: 'color 0.15s ease, background 0.15s ease',
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'rgba(99,102,241,0.06)',
  },
};

export const deleteIconButton: SxProps<Theme> = {
  color: 'text.secondary',
  transition: 'color 0.15s ease, background 0.15s ease',
  '&:hover': {
    color: 'error.main',
    bgcolor: 'rgba(239,68,68,0.06)',
  },
};
