import { useEffect, useState } from 'react';

import { fetchJiraIssues } from '@/api/atlassian.api';
import { getIssuesSummary } from '@/api/gemini.api';
import { generatePdf } from '@/api/reports.api';
import { useReportsData } from '@/query-hooks/reports/useReportsData';

export const useGenerateReport = (month: number, year: number) => {
  const { refetchReports } = useReportsData();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    setErrorMessage(null);
    setIsCompleted(false);
  }, [month, year]);

  const handleNextStep = () =>
    setActiveStep((prev) => (prev === null ? null : prev + 1));

  const handleGenerateReport = async () => {
    try {
      setErrorMessage(null);
      setIsCompleted(false);
      setIsLoading(true);
      setActiveStep(0);

      let jiraIssues;
      let summary;

      try {
        jiraIssues = await fetchJiraIssues(month, year);
      } catch {
        throw new Error('Failed to fetch Jira issues');
      }

      handleNextStep();

      try {
        summary = await getIssuesSummary(jiraIssues);
      } catch {
        throw new Error('Failed to summarize issues');
      }

      handleNextStep();

      try {
        await generatePdf(summary, month, year);
      } catch {
        throw new Error('Failed to generate PDF');
      }

      setIsCompleted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong'
      );
      console.error(err);
    } finally {
      setIsLoading(false);
      setActiveStep(null);
      await refetchReports();
    }
  };

  return {
    activeStep,
    isLoading,
    errorMessage,
    isCompleted,
    handleGenerateReport,
  };
};
