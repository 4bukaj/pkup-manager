import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import type { ReportCTAProps } from './types';
import { useGenerateReport } from '../../../hooks/useGenerateReport';
import StepsSection from './components/steps-section';
import { useReportsMutations } from '@/query-hooks/reports/useReportsMutations';
import { useUserSettingsData } from '@/query-hooks/user-settings/useUserSettingsData';

const ReportCTA: React.FC<ReportCTAProps> = ({
  currentMonthName,
  monthlyReport,
  isReportsLoading,
}) => {
  const navigate = useNavigate();
  const { activeStep, isError, isLoading, isCompleted, handleGenerateReport } =
    useGenerateReport();
  const { handleViewReport, isViewing } = useReportsMutations();
  const { userSettings } = useUserSettingsData();

  if (isReportsLoading) {
    return (
      <Skeleton variant="rectangular" height={160} sx={styles.ctaSkeleton} />
    );
  }

  const hasMissingSettings =
    !userSettings?.atlasian_key ||
    !userSettings?.employee_name ||
    !userSettings?.position;

  const showReport = monthlyReport || isCompleted;

  const hasDynamicContent =
    hasMissingSettings || isError || isCompleted || activeStep !== null;

  const subtitle = hasMissingSettings
    ? null
    : showReport
      ? `Your ${currentMonthName.toLowerCase()} report is ready, download it now!`
      : `Turn your Jira issues into a polished monthly report — automatically.`;

  return (
    <Paper elevation={0} sx={styles.ctaPaper(isLoading, isError, isCompleted)}>
      <Box sx={styles.textWrapper}>
        <Typography variant="h4" sx={styles.title}>
          {currentMonthName} report
        </Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          {subtitle}
        </Typography>

        <Box sx={styles.dynamicContentWrapper(hasDynamicContent)}>
          <Box sx={styles.dynamicContentInner}>
            {hasMissingSettings ? (
              <Box sx={styles.infoBanner}>
                <InfoOutlinedIcon
                  sx={{ fontSize: 15, color: 'warning.dark' }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: 'warning.dark', fontWeight: 500 }}
                >
                  Complete your profile to start generating reports.
                </Typography>
              </Box>
            ) : isError ? (
              <Box sx={styles.statusBanner(true)}>
                <ErrorOutlineIcon sx={{ fontSize: 15, color: 'error.main' }} />
                <Typography
                  variant="body1"
                  sx={{ color: 'error.main', fontWeight: 500 }}
                >
                  Something went wrong. Please try again.
                </Typography>
              </Box>
            ) : isCompleted ? (
              <Box sx={styles.statusBanner(false)}>
                <CheckCircleIcon sx={{ fontSize: 15, color: 'success.main' }} />
                <Typography
                  variant="body1"
                  sx={{ color: 'success.main', fontWeight: 500 }}
                >
                  Report generated successfully
                </Typography>
              </Box>
            ) : (
              <StepsSection activeStep={activeStep} />
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={styles.buttonWrapper}>
        {hasMissingSettings ? (
          <Button
            variant="outlined"
            size="large"
            startIcon={<SettingsIcon />}
            sx={styles.settingsButton}
            onClick={() => navigate('/settings')}
          >
            Go to Settings
          </Button>
        ) : showReport ? (
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
            onClick={() => handleViewReport(monthlyReport?.id || '')}
            disabled={isViewing}
          >
            View Report
          </Button>
        ) : (
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
            onClick={handleGenerateReport}
            disabled={isLoading}
            disableElevation
          >
            {isLoading
              ? 'Generating…'
              : isError
                ? 'Try Again'
                : 'Generate Report'}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ReportCTA;
