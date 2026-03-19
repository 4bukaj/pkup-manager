import type { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const paper: SxProps<Theme> = {
  p: 6,
  width: '100%',
  textAlign: 'center',
  borderRadius: 4,
};

export const title: SxProps<Theme> = {
  mb: 2,
  color: 'primary.main',
};

export const subtitle: SxProps<Theme> = {
  mb: 6,
};

export const googleButton: SxProps<Theme> = {
  py: 1.8,
  fontSize: '1rem',
};

export const footerText: SxProps<Theme> = {
  mt: 5,
  display: 'block',
  opacity: 0.7,
};
