import { fetchJiraIssues } from '@/api/atlassian.api';
import { getIssuesSummary } from '@/api/gemini.api';
import { generatePdf } from '@/api/reports.api';
import { useState } from 'react';

// const MOCK_SUMMARY = {
//   'AIOPS-4404':
//     'Zaimplementowałem na dashboardzie najemcy przekierowanie kliknięć w komórki alertów i ostrzeżeń do strony z listą problemów',
//   'AIOPS-4367':
//     'Zaimplementowałem mały modal CoCo Chat z responsywnym dopasowaniem do desktopu i mobilnych widoków oraz animacjami wejścia/wyjścia',
//   'AIOPS-4365':
//     'Zaimplementowałem ulepszenia toastów i zaktualizowałem teksty w Design System',
//   'AIOPS-4332':
//     'Zaimplementowałem unieważnianie wybranych metryk w kreatorze alertów po zmianie urządzenia/typ urządzenia oraz dodałem odpowiednie powiadomienia UX',
//   'AIOPS-4068':
//     'Zaimplementowałem dodanie danych statusowych (liczba alertów i informacja o stanie połączenia) do tabeli na dashboardzie najemcy',
// };

export const useGenerateReport = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleNextStep = () =>
    setActiveStep((prev) => (prev !== null ? prev + 1 : null));

  const handleGenerateReport = async () => {
    try {
      setIsError(false);
      setIsCompleted(false);
      setIsLoading(true);
      setActiveStep(0);

      const jiraIssues = await fetchJiraIssues();

      handleNextStep();

      const summary = await getIssuesSummary(jiraIssues);
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // });

      handleNextStep();

      await generatePdf(summary);
      // await generatePdf(MOCK_SUMMARY);

      setIsCompleted(true);
    } catch (err) {
      setIsError(true);

      console.log(err);
    } finally {
      setIsLoading(false);
      setActiveStep(null);
    }
  };

  return { activeStep, isLoading, isError, isCompleted, handleGenerateReport };
};
