export interface IGithubOption {
  id: number;
  value: string;
}

export interface IFetchGithubCommits {
  repo: string;
  start: string;
  end: string;
}
