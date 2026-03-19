import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import * as styles from '@/views/Settings/styles';
import { useUserSettingsMutations } from '@/query-hooks/user-settings/useUserSettingsMutations';
import type { IUserSettings } from '@/types/settings.types';

const SettingsForm: React.FC<{ userSettings: IUserSettings }> = ({
  userSettings,
}) => {
  const { handleUpdateUserSettings, isUpdating } = useUserSettingsMutations();

  const [showAtlasianKey, setShowAtlasianKey] = useState(false);
  const [atlasianKey, setAtlasianKey] = useState(
    userSettings.atlasian_key ?? ''
  );
  const [employeeName, setEmployeeName] = useState(
    userSettings.employee_name ?? ''
  );
  const [position, setPosition] = useState(userSettings.position ?? '');
  const [department, setDepartment] = useState(userSettings.department ?? '');
  const [supervisorName, setSupervisorName] = useState(
    userSettings.supervisor_name ?? ''
  );

  return (
    <Paper elevation={0} sx={styles.formContainer}>
      <Box sx={styles.inputGroup}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Report Profile
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            label="Employee Name"
            variant="outlined"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Employee Name"
          />
          <TextField
            fullWidth
            label="Position"
            variant="outlined"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
          />
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
          />
          <TextField
            fullWidth
            label="Supervisor Name"
            variant="outlined"
            value={supervisorName}
            onChange={(e) => setSupervisorName(e.target.value)}
            placeholder="Supervisor Name"
          />
        </Box>
      </Box>
      <Box sx={styles.inputGroup}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Atlassian Settings
        </Typography>
        <TextField
          fullWidth
          label="Atlassian API Token"
          variant="outlined"
          type={showAtlasianKey ? 'text' : 'password'}
          value={atlasianKey}
          onChange={(e) => setAtlasianKey(e.target.value)}
          placeholder="Your Atlassian API Token"
          sx={{ mt: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {atlasianKey ? (
                  <IconButton
                    onClick={() => setAtlasianKey('')}
                    edge="end"
                    size="small"
                    sx={{ mr: 0.5 }}
                  >
                    <ClearIcon />
                  </IconButton>
                ) : null}
                <IconButton
                  onClick={() => setShowAtlasianKey(!showAtlasianKey)}
                  edge="end"
                  size="small"
                >
                  {showAtlasianKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            !atlasianKey &&
            'https://id.atlassian.com/manage-profile/security/api-tokens'
          }
        />
      </Box>

      <Box sx={styles.actionContainer}>
        <Button
          variant="contained"
          onClick={() =>
            handleUpdateUserSettings({
              atlasian_key: atlasianKey,
              employee_name: employeeName,
              supervisor_name: supervisorName,
              department,
              position,
            })
          }
          sx={styles.saveButton}
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SettingsForm;
