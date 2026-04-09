import { Alert,Snackbar } from '@mui/material';
import React, { createContext, useCallback,useContext, useState } from 'react';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface ToastContextType {
  showToast: (message: string, severity?: Severity) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; severity: Severity } | null>(null);

  const showToast = useCallback((message: string, severity: Severity = 'success') => {
    setToast({ message, severity });
  }, []);

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast !== null}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast?.severity}
          sx={{ width: '100%' }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
