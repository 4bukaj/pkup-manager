import React from 'react';
import { Box, Container, Typography, Paper, Skeleton } from '@mui/material';
import * as styles from './styles';
import PageLayout from '../../components/page-layout';
import { useUserSettingsData } from '@/query-hooks/user-settings/useUserSettingsData';
import SettingsForm from '@/components/settings/settings-form';

const skeletonInput = (
  <Skeleton
    variant="rectangular"
    height={56}
    sx={{ borderRadius: 1.5, transform: 'none' }}
  />
);

const Settings: React.FC = () => {
  const { userSettings, isLoading: isSettingsLoading } = useUserSettingsData();

  return (
    <PageLayout>
      <Container maxWidth="md" sx={styles.mainContainer}>
        <Typography variant="h5" sx={styles.title}>
          Settings
        </Typography>

        {isSettingsLoading || !userSettings ? (
          <Paper elevation={0} sx={styles.formContainer}>
            <Box sx={styles.inputGroup}>
              <Skeleton
                width={120}
                height={26}
                sx={{ transform: 'none', borderRadius: 1 }}
              />
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
              >
                {skeletonInput}
                {skeletonInput}
                {skeletonInput}
                {skeletonInput}
              </Box>
            </Box>
            <Box sx={styles.inputGroup}>
              <Skeleton
                width={150}
                height={26}
                sx={{ transform: 'none', borderRadius: 1 }}
              />
              <Box sx={{ mt: 1 }}>{skeletonInput}</Box>
            </Box>
          </Paper>
        ) : (
          <SettingsForm userSettings={userSettings} />
        )}
      </Container>
    </PageLayout>
  );
};

export default Settings;
