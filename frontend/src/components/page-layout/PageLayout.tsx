import React, { useState, type ReactNode } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Menu, MenuItem, ListItemIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as styles from './styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleLogout = async () => {
    console.log('handleLogout called in PageLayout');
    handleClose();
    await signOut();
  };

  return (
    <Box sx={styles.pageContainer}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={styles.toolbar}>
          <Box
            sx={styles.logoWrapper}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <DescriptionIcon sx={styles.logoIcon} />
            <Typography variant="h6" component="div" sx={styles.logoText}>
              pkup
            </Typography>
          </Box>

          <Box sx={styles.userInfoWrapper}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={styles.userMenuButton}
            >
              <Typography variant="body2" sx={styles.emailText}>
                {user?.email}
              </Typography>
              <ArrowDropDownIcon fontSize="small" sx={styles.dropdownIcon} />
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: styles.menuPaper,
              }}
            >
              <MenuItem onClick={handleSettings} sx={styles.menuItem}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={styles.menuItem}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
};

export default PageLayout;
