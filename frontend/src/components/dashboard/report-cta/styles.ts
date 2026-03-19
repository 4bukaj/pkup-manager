import type { SxProps, Theme } from '@mui/material';

export const ctaSkeleton: SxProps<Theme> = {
  borderRadius: 3,
  mb: 8,
  transform: 'none',
};

export const ctaPaper = (
  isLoading: boolean,
  isError: boolean,
  isCompleted: boolean
): SxProps<Theme> => ({
  p: { xs: 4, md: 5 },
  mb: 8,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 4,
  borderRadius: 3,
  position: 'relative',
  overflow: 'hidden',
  background: isError
    ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
    : isCompleted
      ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
      : isLoading
        ? 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)'
        : 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)',
  border: '1px solid',
  borderColor: isError
    ? 'rgba(239,68,68,0.25)'
    : isCompleted
      ? 'rgba(16,185,129,0.25)'
      : 'rgba(139,92,246,0.2)',
  boxShadow: isLoading
    ? '0 4px 30px rgba(99,102,241,0.12)'
    : isError
      ? '0 4px 30px rgba(239,68,68,0.1)'
      : isCompleted
        ? '0 4px 30px rgba(16,185,129,0.12)'
        : '0 4px 30px rgba(99,102,241,0.12)',
  transition:
    'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: isError
      ? 'rgba(239,68,68,0.08)'
      : isCompleted
        ? 'rgba(16,185,129,0.1)'
        : 'rgba(139,92,246,0.12)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -60,
    right: 80,
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: isError
      ? 'rgba(239,68,68,0.05)'
      : isCompleted
        ? 'rgba(16,185,129,0.07)'
        : 'rgba(99,102,241,0.08)',
    pointerEvents: 'none',
  },
});

export const textWrapper: SxProps<Theme> = {
  flex: 1,
  textAlign: { xs: 'center', md: 'left' },
  position: 'relative',
  zIndex: 1,
};

export const title: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: '#1e1b4b',
  lineHeight: 1.15,
};

export const subtitle: SxProps<Theme> = {
  mt: 0.75,
  color: 'rgba(30,27,75,0.6)',
  transition: 'color 0.3s ease',
  maxWidth: 480,
};

export const statusBanner = (isError: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  mt: 1.5,
  px: 1.5,
  py: 0.75,
  borderRadius: 2,
  width: 'fit-content',
  bgcolor: isError ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
  '@keyframes fadeSlideDown': {
    from: { opacity: 0, transform: 'translateY(-6px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'fadeSlideDown 0.3s ease-out forwards',
});

export const buttonWrapper: SxProps<Theme> = {
  flexShrink: 0,
  position: 'relative',
  zIndex: 1,
  alignSelf: 'flex-start',
};

export const viewButton: SxProps<Theme> = {
  px: 4,
  py: 1.5,
  borderRadius: 2.5,
  fontSize: '0.95rem',
  borderColor: 'rgba(16,185,129,0.4)',
  color: '#065f46',
  bgcolor: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#065f46',
    bgcolor: 'rgba(255,255,255,0.75)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 14px rgba(16,185,129,0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
};

export const generateButton = (isLoading: boolean): SxProps<Theme> => ({
  px: 5,
  py: 1.5,
  borderRadius: 2.5,
  fontSize: '0.95rem',
  color: '#fff',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  overflow: 'hidden',
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
  background: isLoading
    ? 'linear-gradient(90deg, #2a2a2c 25%, #3d3d40 50%, #2a2a2c 75%)'
    : '#1d1d1f',
  backgroundSize: '200% 100%',
  animation: isLoading ? 'shimmer 1.6s infinite linear' : 'none',
  '&:hover': {
    bgcolor: '#000',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    color: 'rgba(255,255,255,0.75)',
  },
});

export const settingsButton: SxProps<Theme> = {
  px: 4,
  py: 1.5,
  borderRadius: 2.5,
  fontSize: '0.95rem',
  borderColor: 'rgba(245,158,11,0.4)',
  color: '#92400e',
  bgcolor: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#92400e',
    bgcolor: 'rgba(255,255,255,0.75)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 14px rgba(245,158,11,0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
};

export const infoBanner: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  mt: 1.5,
  px: 1.5,
  py: 0.75,
  borderRadius: 2,
  width: 'fit-content',
  bgcolor: 'rgba(245,158,11,0.1)',
  '@keyframes fadeSlideDown': {
    from: { opacity: 0, transform: 'translateY(-6px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'fadeSlideDown 0.3s ease-out forwards',
};

export const dynamicContentWrapper = (show: boolean): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateRows: show ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.35s ease',
});

export const dynamicContentInner: SxProps<Theme> = {
  overflow: 'hidden',
  minHeight: 0,
};
