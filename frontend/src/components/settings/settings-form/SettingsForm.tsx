import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useUserSettingsMutations } from '@/query-hooks/user-settings/useUserSettingsMutations';
import type { IUserSettings } from '@/types/settings.types';
import * as styles from '@/views/Settings/styles';

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
  const [showErrors, setShowErrors] = useState(false);

  const isValid =
    employeeName.trim() !== '' &&
    position.trim() !== '' &&
    department.trim() !== '' &&
    supervisorName.trim() !== '' &&
    atlasianKey.trim() !== '';

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
            error={showErrors && !employeeName.trim()}
            helperText={showErrors && !employeeName.trim() && 'Required'}
          />
          <TextField
            fullWidth
            label="Position"
            variant="outlined"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            error={showErrors && !position.trim()}
            helperText={showErrors && !position.trim() && 'Required'}
          />
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            error={showErrors && !department.trim()}
            helperText={showErrors && !department.trim() && 'Required'}
          />
          <TextField
            fullWidth
            label="Supervisor Name"
            variant="outlined"
            value={supervisorName}
            onChange={(e) => setSupervisorName(e.target.value)}
            placeholder="Supervisor Name"
            error={showErrors && !supervisorName.trim()}
            helperText={showErrors && !supervisorName.trim() && 'Required'}
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
          error={showErrors && !atlasianKey.trim()}
          helperText={
            showErrors && !atlasianKey.trim()
              ? 'Required'
              : !atlasianKey &&
                'https://id.atlassian.com/manage-profile/security/api-tokens'
          }
        />
      </Box>

      <Box sx={styles.actionContainer}>
        <Button
          variant="contained"
          onClick={() => {
            if (!isValid) {
              setShowErrors(true);
              return;
            }
            handleUpdateUserSettings({
              atlasian_key: atlasianKey,
              employee_name: employeeName,
              supervisor_name: supervisorName,
              department,
              position,
            });
          }}
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
