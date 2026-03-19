import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import * as styles from './styles';
import { useReportsData } from '@/query-hooks/reports/useReportsData';
import { useReportsMutations } from '@/query-hooks/reports/useReportsMutations';
import type { ReportsTableProps } from './types';

const SKELETON_ROWS = 3;

const ReportsTable: React.FC<ReportsTableProps> = ({ isReportsLoading }) => {
  const { reports } = useReportsData();
  const { handleDeleteReport, handleViewReport } = useReportsMutations();

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleView = async (reportId: string) => {
    setViewingId(reportId);
    await handleViewReport(reportId);
    setViewingId(null);
  };

  const handleDelete = async (reportId: string) => {
    setDeletingId(reportId);
    await handleDeleteReport(reportId);
    setDeletingId(null);
  };

  const getFilename = (storagePath: string) =>
    storagePath.split('/').pop() ?? storagePath;

  const getMonth = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

  if (isReportsLoading) {
    return (
      <Box sx={styles.container}>
        <Skeleton
          width={160}
          height={36}
          sx={{ mb: 3, transform: 'none', borderRadius: 1 }}
        />
        <TableContainer component={Paper} elevation={0} sx={styles.tablePaper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={styles.tableHeadRow}>
              <TableRow>
                <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Month</TableCell>
                <TableCell align="right" sx={styles.tableHeaderCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <TableRow key={i} sx={styles.tableBodyRow}>
                  <TableCell sx={styles.reportNameCell}>
                    <Box sx={styles.fileIconWrapper}>
                      <Skeleton
                        variant="rectangular"
                        width={32}
                        height={32}
                        sx={{ borderRadius: 1.5, flexShrink: 0 }}
                      />
                      <Skeleton
                        width={180}
                        height={18}
                        sx={{ transform: 'none', borderRadius: 1 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={styles.tableBodyCell}>
                    <Skeleton
                      width={90}
                      height={22}
                      sx={{ transform: 'none', borderRadius: 10 }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={styles.actionsCell}>
                    <Stack direction="row" gap={0.5} justifyContent="flex-end">
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={styles.headerStack}
      >
        <Typography variant="h5" sx={styles.headerTitle}>
          All Reports
        </Typography>
      </Stack>

      {reports?.length ? (
        <TableContainer component={Paper} elevation={0} sx={styles.tablePaper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={styles.tableHeadRow}>
              <TableRow>
                <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Month</TableCell>
                <TableCell align="right" sx={styles.tableHeaderCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} sx={styles.tableBodyRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={styles.reportNameCell}
                  >
                    <Box sx={styles.fileIconWrapper}>
                      <Box sx={styles.fileIconBox}>
                        <InsertDriveFileOutlinedIcon
                          sx={{ fontSize: 16, color: 'rgba(99,102,241,0.7)' }}
                        />
                      </Box>
                      {getFilename(report.storage_path)}
                    </Box>
                  </TableCell>
                  <TableCell sx={styles.tableBodyCell}>
                    <Box sx={styles.monthChip}>
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 11 }} />
                      {getMonth(report.created_at)}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={styles.actionsCell}>
                    <Stack direction="row" gap={0.5} justifyContent="flex-end">
                      <Tooltip title="View report">
                        <span>
                          <IconButton
                            size="small"
                            sx={styles.actionIconButton}
                            onClick={() => handleView(report.id)}
                            disabled={
                              viewingId === report.id ||
                              deletingId === report.id
                            }
                          >
                            {viewingId === report.id ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              <OpenInNewIcon fontSize="small" />
                            )}
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete report">
                        <span>
                          <IconButton
                            size="small"
                            sx={styles.deleteIconButton}
                            onClick={() => handleDelete(report.id)}
                            disabled={
                              viewingId === report.id ||
                              deletingId === report.id
                            }
                          >
                            {deletingId === report.id ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              <DeleteOutlineIcon fontSize="small" />
                            )}
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ mt: 4, color: 'text.secondary' }}>
          <Typography>No reports generated yet.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportsTable;
