import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as styles from './styles';
import type { StepsSectionProps } from './types';

const STEPS = [
  'Fetching JIRA issues',
  'Summarizing the work',
  'Generating PDF',
];

const StepsSection = ({ activeStep }: StepsSectionProps) => {
  if (activeStep === null) return null;

  return (
    <Box sx={styles.container}>
      {STEPS.map((step, index) => {
        if (index > activeStep) return null;

        const isDone = index < activeStep;

        return (
          <Box key={step} sx={styles.stepWrapper(index)}>
            {isDone ? (
              <Box sx={styles.dotDone}>
                <CheckCircleIcon sx={styles.checkIcon} />
              </Box>
            ) : (
              <Box sx={styles.dotActive} />
            )}
            <Typography
              variant="body1"
              color={isDone ? 'text.primary' : 'text.secondary'}
              fontWeight={500}
            >
              {step}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default StepsSection;
