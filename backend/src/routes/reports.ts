import express from 'express';
import puppeteer from 'puppeteer';
import { format } from 'date-fns';
import { generateReportHtml } from '../generateReportHtml';
import { getUserSettings, getReportDateRange, getReportDate } from '../utils';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../supabaseClient';

const router = express.Router();

router.post('/generate', async (req: AuthRequest, res) => {
  let browser;

  try {
    const { summary } = req.body;

    if (!summary || typeof summary !== 'object') {
      return res.status(400).json({ error: 'Missing or invalid summary' });
    }

    const settings = await getUserSettings(req.user!.id);
    const { employee_name, position, department, supervisor_name } = settings;

    if (!employee_name || !position || !department || !supervisor_name) {
      return res.status(400).json({
        error:
          'Missing report profile. Please fill in Employee Name, Position, Department, and Supervisor in Settings.',
      });
    }

    const { start, end } = getReportDateRange();

    const html = generateReportHtml({
      reportPeriod: `${start} - ${end}`,
      reportDate: getReportDate(end),
      employeeName: employee_name,
      position,
      department,
      supervisorName: supervisor_name,
      preparatoryWork: '',
      programmingTasks: Object.entries(summary).map(
        ([key, value]) => `${value} (${key})`
      ),
      attachments: Object.keys(summary),
      researchWork: '',
    });

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfUint8 = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '20mm', bottom: '15mm', left: '20mm' },
    });

    await browser.close();
    browser = null;

    const pdfBuffer = Buffer.from(pdfUint8);
    const period = format(new Date(end), 'MM-yy');
    const filename = `${employee_name.replace(/\s+/g, '_')}_${period}_PKUP.pdf`;
    const storagePath = `${req.user!.id}/${filename}`;

    // Upload PDF to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('reports')
      .upload(storagePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return res
        .status(500)
        .json({ error: 'Failed to store PDF', details: uploadError.message });
    }

    // Save report metadata to DB
    const reportName = format(new Date(end), 'MMMM yyyy');
    const { data: report, error: dbError } = await supabase
      .from('reports')
      .insert({
        user_id: req.user!.id,
        name: reportName,
        report_period: `${start} - ${end}`,
        storage_path: storagePath,
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      return res.status(500).json({
        error: 'Failed to save report metadata',
        details: dbError.message,
      });
    }

    // Create a short-lived signed URL for the immediate download
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('reports')
      .createSignedUrl(storagePath, 60);

    if (urlError) {
      console.error('Signed URL error:', urlError);
    }

    return res.json({
      report,
      downloadUrl: signedUrlData?.signedUrl ?? null,
    });
  } catch (err) {
    console.error('PDF generation error:', err);

    if (browser) {
      await browser.close().catch(() => {});
    }

    return res.status(500).json({
      error: 'Failed to generate PDF',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

router.get('/all', async (req: AuthRequest, res) => {
  const { data, error } = await supabase
    .from('reports')
    .select('id, name, report_period, storage_path, created_at')
    .eq('user_id', req.user!.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch reports error:', error);
    return res.status(500).json({ error: 'Failed to fetch reports' });
  }

  return res.json({ reports: data });
});

router.get('/:id/download', async (req: AuthRequest, res) => {
  const { data: report, error: fetchError } = await supabase
    .from('reports')
    .select('storage_path')
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .single();

  if (fetchError || !report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  const { data: signedUrlData, error: urlError } = await supabase.storage
    .from('reports')
    .createSignedUrl(report.storage_path, 60);

  if (urlError || !signedUrlData) {
    return res.status(500).json({ error: 'Failed to generate download link' });
  }

  return res.json({ downloadUrl: signedUrlData.signedUrl });
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const { data: report, error: fetchError } = await supabase
    .from('reports')
    .select('storage_path')
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .single();

  if (fetchError || !report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  const { error: storageError } = await supabase.storage
    .from('reports')
    .remove([report.storage_path]);

  if (storageError) {
    console.error('Storage delete error:', storageError);
    return res.status(500).json({ error: 'Failed to delete PDF from storage' });
  }

  const { error: dbError } = await supabase
    .from('reports')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id);

  if (dbError) {
    console.error('DB delete error:', dbError);
    return res.status(500).json({ error: 'Failed to delete report record' });
  }

  return res.status(204).end();
});

export default router;
