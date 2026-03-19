import type { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.75,
  mt: 2,
};

export const stepWrapper = (index: number): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  '@keyframes slideIn': {
    from: { opacity: 0, transform: 'translateX(-10px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  animation: `slideIn 0.3s ease-out ${index * 0.08}s both`,
});

export const dotActive: SxProps<Theme> = {
  width: 15,
  height: 15,
  borderRadius: '50%',
  bgcolor: '#1d1d1f',
  flexShrink: 0,
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(0.75)', opacity: 0.6 },
  },
  animation: 'pulse 1.2s ease-in-out infinite',
};

export const dotDone: SxProps<Theme> = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const checkIcon: SxProps<Theme> = {
  width: 15,
  height: 15,
  color: '#2e7d32',
  '@keyframes popIn': {
    '0%': { opacity: 0, transform: 'scale(0.4)' },
    '70%': { transform: 'scale(1.25)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
  animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
};
