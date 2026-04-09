import { Container } from '@mui/material';

import { useReportsData } from '@/query-hooks/reports/useReportsData';

import GenerateReport from '../../components/dashboard/generate-report';
import ReportsTable from '../../components/dashboard/reports-table';
import PageLayout from '../../components/page-layout';
import * as styles from './styles';

const Dashboard = () => {
  const { reports, isLoading } = useReportsData();

  return (
    <PageLayout>
      <Container maxWidth="lg" sx={styles.mainContainer}>
        <GenerateReport reports={reports} isReportsLoading={isLoading} />
        <ReportsTable isReportsLoading={isLoading} />
      </Container>
    </PageLayout>
  );
};

export default Dashboard;
