import { Box, Paper, Skeleton,Typography } from '@mui/material';
import React, { useMemo,useState } from 'react';

import { useReportsMutations } from '@/query-hooks/reports/useReportsMutations';
import { useUserSettingsData } from '@/query-hooks/user-settings/useUserSettingsData';

import { useGenerateReport } from '../../../hooks/useGenerateReport';
import ActionButton from './components/action-button';
import MonthSelector from './components/month-selector';
import StatusBanner from './components/status-banner';
import * as styles from './styles';
import { type GenerateReportProps } from './types';
import { getMonthOptions } from './utils';

const GenerateReport: React.FC<GenerateReportProps> = ({
  reports,
  isReportsLoading,
}) => {
  const { handleViewReport, isViewing } = useReportsMutations();
  const { userSettings } = useUserSettingsData();

  const monthOptions = useMemo(() => getMonthOptions(), []);

  const [selectedMonth, setSelectedMonth] = useState<string>(
    monthOptions[0].value
  );

  const selected =
    monthOptions.find((o) => o.value === selectedMonth) || monthOptions[0];

  const {
    activeStep,
    errorMessage,
    isLoading,
    isCompleted,
    handleGenerateReport,
  } = useGenerateReport(selected.month, selected.year);

  if (isReportsLoading) {
    return (
      <Skeleton variant="rectangular" height={160} sx={styles.ctaSkeleton} />
    );
  }

  const monthlyReport = reports.find((report) =>
    report.report_period.split(' - ')[1]?.startsWith(selectedMonth)
  );

  const hasMissingSettings =
    !userSettings?.atlasian_key ||
    !userSettings?.employee_name ||
    !userSettings?.position;

  const hasDynamicContent =
    hasMissingSettings || !!errorMessage || isCompleted || activeStep !== null;

  const subtitle = hasMissingSettings
    ? null
    : monthlyReport
      ? `Your ${selected.label.toLowerCase()} report is ready, download it now!`
      : 'Turn your Jira issues into a polished monthly report — automatically.';

  return (
    <Paper elevation={0} sx={styles.ctaPaper(isLoading, !!errorMessage, isCompleted)}>
      <Box sx={styles.textWrapper}>
        <MonthSelector
          value={selectedMonth}
          options={monthOptions}
          onChange={setSelectedMonth}
        />
        <Typography variant="body1" sx={styles.subtitle}>
          {subtitle}
        </Typography>

        <Box sx={styles.dynamicContentWrapper(hasDynamicContent)}>
          <Box sx={styles.dynamicContentInner}>
            <StatusBanner
              hasMissingSettings={hasMissingSettings}
              errorMessage={errorMessage}
              isCompleted={isCompleted}
              activeStep={activeStep}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.buttonWrapper}>
        <ActionButton
          hasMissingSettings={hasMissingSettings}
          showReport={Boolean(monthlyReport)}
          isLoading={isLoading}
          isError={!!errorMessage}
          isViewing={isViewing}
          onViewReport={() => handleViewReport(monthlyReport?.id || '')}
          onGenerateReport={handleGenerateReport}
        />
      </Box>
    </Paper>
  );
};

export default GenerateReport;
