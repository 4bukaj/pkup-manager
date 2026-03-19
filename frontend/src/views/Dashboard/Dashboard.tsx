import { Container } from '@mui/material';
import ReportCTA from '../../components/dashboard/report-cta';
import ReportsTable from '../../components/dashboard/reports-table';
import * as styles from './styles';
import PageLayout from '../../components/page-layout';
import { useReportsData } from '@/query-hooks/reports/useReportsData';

const Dashboard = () => {
  const { reports, isLoading } = useReportsData();

  const currentMonthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(new Date());
  const currentMonthNum = (new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const currentYear = new Date().getFullYear();

  const monthlyReport = reports.find((report) =>
    report.created_at.startsWith(`${currentYear}-${currentMonthNum}`)
  );

  return (
    <PageLayout>
      <Container maxWidth="lg" sx={styles.mainContainer}>
        <ReportCTA
          currentMonthName={currentMonthName}
          monthlyReport={monthlyReport}
          isReportsLoading={isLoading}
        />

        <ReportsTable isReportsLoading={isLoading} />
      </Container>
    </PageLayout>
  );
};

export default Dashboard;
