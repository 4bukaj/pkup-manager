import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import * as styles from './styles';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { showToast } = useToast();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      showToast('Failed to sign in. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={styles.container}>
        <Paper elevation={0} sx={styles.paper}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={styles.title}
          >
            pkup-manager
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={styles.subtitle}
          >
            Fast | Simple | Reliable
          </Typography>

          <Stack spacing={2.5}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleSignIn}
              sx={styles.googleButton}
            >
              Continue with Google
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
