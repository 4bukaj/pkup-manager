import express from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';
import { getUserSettings, parseADF, getReportDateRange } from '../utils';
import { config } from '../config';

const router = express.Router();

router.get('/issues', async (req: AuthRequest, res) => {
  try {
    if (!req.user?.email || !req.user?.id) {
      return res.status(400).json({ error: 'Missing user email or id' });
    }

    const settings = await getUserSettings(req.user.id);

    if (!settings.atlasian_key) {
      return res.status(400).json({ error: 'Missing Atlassian API token' });
    }

    const authHeader = `Basic ${Buffer.from(
      `${req.user.email}:${settings.atlasian_key}`
    ).toString('base64')}`;

    const axiosConfig = {
      headers: {
        Authorization: authHeader,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const { data: myself } = await axios.get(
      `${config.atlassianDomain}/rest/api/3/myself`,
      axiosConfig
    );

    const { start, end } = getReportDateRange();

    const jql = `
      statusCategory = Done
      AND status = Closed
      AND assignee = ${myself.accountId}
      AND resolved >= "${start}"
      AND resolved <= "${end}"
    `;

    const { data } = await axios.post(
      `${config.atlassianDomain}/rest/api/3/search/jql`,
      { jql, maxResults: 100, fields: ['issuetype', 'summary', 'description', 'resolved'] },
      axiosConfig
    );

    const issues = data.issues.map((issue: any) => ({
      key: issue.key,
      summary: issue.fields.summary,
      description: parseADF(issue.fields.description),
    }));

    return res.json(issues);
  } catch (err: any) {
    console.error(err?.response?.data ?? err.message);
    return res.status(500).json({
      error: 'Failed to fetch Jira data',
      details: err?.response?.data ?? err.message,
    });
  }
});

export default router;
