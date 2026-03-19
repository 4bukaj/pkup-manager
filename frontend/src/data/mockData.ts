export interface Report {
  id: string;
  name: string;
  date: string;
  status:
    | "Completed"
    | "Pending"
    | "Failed";
  type: string;
}

export const mockReports: Report[] = [];
