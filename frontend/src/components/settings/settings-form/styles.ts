import type { SxProps, Theme } from '@mui/material';

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
