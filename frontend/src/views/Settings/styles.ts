import type { SxProps, Theme } from '@mui/material';

export const settingsWrapper: SxProps<Theme> = {
  flexGrow: 1,
  minHeight: '100vh',
};

export const mainContainer: SxProps<Theme> = {
  mt: 8,
  pb: 8,
};

export const title: SxProps<Theme> = {
  mb: 4,
  fontWeight: 800,
  letterSpacing: '-0.02em',
};

export const formContainer: SxProps<Theme> = {
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  borderRadius: 1,
  background: 'rgba(255, 255, 255, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: 'none',
};

export const inputGroup: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const sectionTitle: SxProps<Theme> = {
  mb: 1,
  fontWeight: 600,
  color: '#1d1d1f',
};

export const actionContainer: SxProps<Theme> = {
  mt: 2,
};

export const saveButton: SxProps<Theme> = {
  display: 'block',
  px: 5,
  py: 1.5,
  ml: 'auto',
  borderRadius: 2.5,
  fontSize: '0.95rem',
  bgcolor: '#1d1d1f',
  color: '#fff',
  '&:hover': {
    bgcolor: '#000',
  },
};
