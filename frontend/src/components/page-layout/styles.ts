import type { SxProps, Theme } from '@mui/material';

export const pageContainer: SxProps<Theme> = {
  minHeight: '100dvh',
  flexGrow: 1,
};

export const toolbar: SxProps<Theme> = {
  justifyContent: 'space-between',
  px: { xs: 2, sm: 4 },
};

export const logoWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
};

export const logoIcon: SxProps<Theme> = {
  mr: 1.5,
  color: 'primary.main',
  fontSize: 28,
};

export const logoText: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '-0.02em',
};

export const userInfoWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const emailText: SxProps<Theme> = {
  color: 'text.secondary',
  fontWeight: 500,
};

export const userMenuButton: SxProps<Theme> = {
  borderRadius: 2,
  px: 1.5,
  py: 0.5,
  color: 'text.primary',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};

export const dropdownIcon: SxProps<Theme> = {
  ml: 0.5,
  color: 'text.secondary',
};

export const menuPaper: SxProps<Theme> = {
  mt: 1,
  minWidth: 160,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
};

export const menuItem: SxProps<Theme> = {
  py: 1.5,
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#1d1d1f',
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: 'inherit',
    opacity: 0.7,
  },
};
