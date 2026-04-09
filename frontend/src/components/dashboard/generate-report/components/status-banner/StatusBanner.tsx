import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography } from '@mui/material';
import React from 'react';

import * as styles from '../../styles';
import type { StatusBannerProps } from '../../types';
import StepsSection from '../steps-section';

const StatusBanner: React.FC<StatusBannerProps> = ({
  hasMissingSettings,
  errorMessage,
  isCompleted,
  activeStep,
}) => {
  if (hasMissingSettings) {
    return (
      <Box sx={styles.infoBanner}>
        <InfoOutlinedIcon sx={{ fontSize: 15, color: 'warning.dark' }} />
        <Typography
          variant="body1"
          sx={{ color: 'warning.dark', fontWeight: 500 }}
        >
          Complete your profile to start generating reports.
        </Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={styles.statusBanner(true)}>
        <ErrorOutlineIcon sx={{ fontSize: 15, color: 'error.main' }} />
        <Typography
          variant="body1"
          sx={{ color: 'error.main', fontWeight: 500 }}
        >
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  if (isCompleted) {
    return (
      <Box sx={styles.statusBanner(false)}>
        <CheckCircleIcon sx={{ fontSize: 15, color: 'success.main' }} />
        <Typography
          variant="body1"
          sx={{ color: 'success.main', fontWeight: 500 }}
        >
          Report generated successfully
        </Typography>
      </Box>
    );
  }

  return <StepsSection activeStep={activeStep} />;
};

export default StatusBanner;
