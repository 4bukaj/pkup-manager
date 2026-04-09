import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from '../../styles';
import type { ActionButtonProps } from '../../types';

const ActionButton: React.FC<ActionButtonProps> = ({
  hasMissingSettings,
  showReport,
  isLoading,
  isError,
  isViewing,
  onViewReport,
  onGenerateReport,
}) => {
  const navigate = useNavigate();

  if (hasMissingSettings) {
    return (
      <Button
        variant="outlined"
        size="large"
        startIcon={<SettingsIcon />}
        sx={styles.settingsButton}
        onClick={() => {
          navigate('/settings');
        }}
      >
        Go to Settings
      </Button>
    );
  }

  if (showReport) {
    return (
      <Button
        variant="outlined"
        size="large"
        endIcon={
          isViewing ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <KeyboardArrowRightIcon />
          )
        }
        sx={styles.viewButton}
        onClick={onViewReport}
        disabled={isViewing}
      >
        View Report
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      size="large"
      startIcon={
        isLoading ? (
          <CircularProgress color="inherit" size={15} />
        ) : isError ? (
          <RefreshIcon />
        ) : (
          <AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />
        )
      }
      sx={styles.generateButton(isLoading)}
      onClick={onGenerateReport}
      disabled={isLoading}
      disableElevation
    >
      {isLoading ? 'Generating…' : isError ? 'Try Again' : 'Generate Report'}
    </Button>
  );
};

export default ActionButton;
