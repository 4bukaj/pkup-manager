import express from 'express';
import { AuthRequest } from '../middleware/auth';
import { getUserSettings } from '../utils';
import { config } from '../config';

const router = express.Router();

const githubHeaders = {
  Authorization: `Bearer ${config.githubToken}`,
  Accept: 'application/vnd.github+json',
};

router.get('/user-orgs', async (_req: AuthRequest, res) => {
  try {
    const response = await fetch('https://api.github.com/user/orgs?per_page=100', {
      headers: githubHeaders,
    });

    if (!response.ok) {
      return res.status(response.status).json(await response.json());
    }

    res.json(await response.json());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user orgs' });
  }
});

router.get('/repos', async (req: AuthRequest, res) => {
  try {
    const settings = await getUserSettings(req.user!.id);
    const owner = settings.github_owner ?? (req.query.owner as string);

    if (!owner) {
      return res.status(400).json({
        error: 'Missing owner parameter (organization not set in settings)',
      });
    }

    const response = await fetch(
      `https://api.github.com/orgs/${owner}/repos?per_page=100&sort=updated&direction=desc`,
      { headers: githubHeaders }
    );

    if (!response.ok) {
      return res.status(response.status).json(await response.json());
    }

    res.json(await response.json());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch org repos' });
  }
});

router.get('/branches', async (req: AuthRequest, res) => {
  try {
    const settings = await getUserSettings(req.user!.id);
    const owner = settings.github_owner ?? (req.query.owner as string);
    const repo = settings.github_repos?.[0] ?? (req.query.repo as string);
    const { username } = req.query;

    if (!owner || !repo || !username) {
      return res.status(400).json({ error: 'Missing owner, repo, or username' });
    }

    const branchesRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      { headers: githubHeaders }
    );
    const branches = await branchesRes.json();

    const branchesWithCommits: string[] = [];

    for (const branch of branches) {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch.name}&author=${username}&per_page=1`,
        { headers: githubHeaders }
      );
      const commits = await commitsRes.json();

      if (Array.isArray(commits) && commits.length > 0) {
        branchesWithCommits.push(branch.name);
      }
    }

    res.json({ branches: branchesWithCommits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user branches' });
  }
});

router.get('/commits', async (req: AuthRequest, res) => {
  try {
    const settings = await getUserSettings(req.user!.id);
    const owner = settings.github_owner ?? (req.query.owner as string);
    const repo = settings.github_repos?.[0] ?? (req.query.repo as string);
    const { start, end } = req.query;

    if (!owner || !repo) {
      return res.status(400).json({ error: 'Missing owner or repo parameter' });
    }

    const params = new URLSearchParams({ per_page: '100' });
    if (start) params.append('since', String(start));
    if (end) params.append('until', String(end));

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?${params}`,
      { headers: githubHeaders }
    );

    if (!response.ok) {
      return res.status(response.status).json(await response.json());
    }

    res.json(await response.json());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch commits' });
  }
});

export default router;
