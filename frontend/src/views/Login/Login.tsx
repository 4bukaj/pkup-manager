import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../contexts/AuthContext';
import * as styles from './styles';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();

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
            Machnij se raporcik bratku
          </Typography>

          <Stack spacing={2.5}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={signInWithGoogle}
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
