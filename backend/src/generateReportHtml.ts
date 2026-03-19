import { ReportData } from './types';

function generateReportHtml(data: ReportData): string {
  const {
    reportPeriod,
    reportDate,
    employeeName,
    position,
    department,
    supervisorName,
    preparatoryWork = '',
    programmingTasks = [],
    attachments = [],
    researchWork = '',
    logoSvg = '',
  } = data;

  const taskBullets = programmingTasks
    .map((task) => `<li>${escapeHtml(task)}</li>`)
    .join('\n');

  const attachmentBullets = attachments
    .map((att) => `<li>${escapeHtml(att)}</li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 12pt;
      line-height: 1.15;
      color: #000;
      background: #fff;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 0 20mm 25mm 25mm;
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* ── Logo ── */
    .logo {
      margin: 2mm 0 0 -25mm;
    }
    .logo svg {
      height: 60px;
      width: auto;
      display: block;
    }

    /* ── Report title ── */
    .report-title {
      text-align: center;
      font-size: 12pt;
      font-weight: bold;
      margin-top: 42px;
      margin-bottom: 16px;
    }

    /* ── Shared table reset ── */
    table {
      border-collapse: collapse;
    }

    /* ── Okres & Dane osobowe tables ── */
    .info-table {
      margin: 0 0 32px 0;
      width: 100%;
    }
    .info-table .section-header {
      text-align: center;
      font-weight: bold;
      font-size: 12pt;
      padding: 2px 6px 4px 6px;
    }
    .info-table td {
      font-size: 12pt;
      padding: 1px 6px;
      vertical-align: top;
      border: 1px solid #000;
    }
    .info-table .section-header {
      border: none;
    }
    .info-table .label {
      font-style: italic;
      width: 50%;
    }
    .info-table .value {
      width: 50%;
    }

    /* ── Raportowane Wyniki heading ── */
    .results-heading {
      text-align: center;
      font-weight: bold;
      font-size: 12pt;
      margin-bottom: 10px;
    }

    /* ── Main results table (bordered) ── */
    .results-table {
      width: 100%;
      border: 1px solid #000;
      margin-bottom: 0;
    }
    .results-table th,
    .results-table td {
      border: 1px solid #000;
      padding: 6px 8px;
      vertical-align: top;
      font-size: 12pt;
      font-weight: normal;
    }
    .results-table thead th {
      font-weight: bold;
      text-align: center;
    }
    .results-table .col-type {
      width: 40%;
    }
    .results-table .col-desc {
      width: 60%;
    }

    /* ── Bullet list inside table ── */
    .results-table ul {
      margin: 0;
      padding-left: 24px;
      list-style-type: disc;
    }
    .results-table ul li {
      margin-bottom: 5px;
      line-height: 1.2;
      padding-left: 2px;
    }
    .results-table ul li:last-child {
      margin-bottom: 0;
    }

    /* ── Attachments ── */
    .attachments-label {
      margin-top: 15px;
      margin-bottom: 10px
    }
    .attachments-list {
      margin-top: 6px;
      padding-left: 24px;
      list-style-type: disc;
    }
    .attachments-list li {
      line-height: 1.2;
    }

    /* ── Footer ── */
    .footer {
      margin-top: 14px;
      font-size: 9pt;
      text-align: left;
      color: #000;
    }
  </style>
</head>
<body>
  <div class="page">

    <!-- Logo -->
    <div class="logo">
      ${logoSvg || DEFAULT_LOGO_SVG}
    </div>

    <!-- Title -->
    <div class="report-title">RAPORT MIESIĘCZNY PRACY TWÓRCZEJ</div>

    <!-- Okres -->
    <table class="info-table">
      <tbody>
        <tr>
          <td colspan="2" class="section-header">Okres</td>
        </tr>
        <tr>
          <td class="label">Okres raportowany</td>
          <td class="value">${escapeHtml(reportPeriod)}</td>
        </tr>
        <tr>
          <td class="label">Data sporządzenia Raportu</td>
          <td class="value">${escapeHtml(reportDate)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Dane osobowe -->
    <table class="info-table">
      <tbody>
        <tr>
          <td colspan="2" class="section-header">Dane osobowe</td>
        </tr>
        <tr>
          <td class="label">Imię i nazwisko Pracownika</td>
          <td class="value">${escapeHtml(employeeName)}</td>
        </tr>
        <tr>
          <td class="label">Stanowisko służbowe</td>
          <td class="value">${escapeHtml(position)}</td>
        </tr>
        <tr>
          <td class="label">Dział</td>
          <td class="value">${escapeHtml(department)}</td>
        </tr>
        <tr>
          <td class="label">Imię i nazwisko Przełożonego Pracownika</td>
          <td class="value">${escapeHtml(supervisorName)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Results heading -->
    <div class="results-heading">Raportowane Wyniki Pracy Twórczej</div>

    <!-- Results table -->
    <table class="results-table">
      <thead>
        <tr>
          <th class="col-type">Rodzaj Wyniku Pracy Twórczej</th>
          <th class="col-desc">Opis wykonywanych czynności</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Prace przygotowawcze</td>
          <td>${escapeHtml(preparatoryWork)}</td>
        </tr>
        <tr>
          <td>Prace programistyczne i specyfikacja techniczna</td>
          <td>
${
  programmingTasks.length > 0
    ? `<ul>
${taskBullets}
</ul>`
    : ''
}
${
  attachments.length > 0
    ? `<div class="attachments-label">Załączniki:</div>
<ul class="attachments-list">
${attachmentBullets}
</ul>`
    : ''
}
          </td>
        </tr>
        <tr>
          <td>Prace badawcze</td>
          <td>${escapeHtml(researchWork)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <div class="footer">
      Załącznik nr. 2 do Regulaminu Działalności Twórczej z dnia 01.09.2020
    </div>

  </div>
</body>
</html>`;
}

// co.brick SVG logo — embedded inline so no external requests needed
const DEFAULT_LOGO_SVG = `<svg width="226" height="40" viewBox="0 0 226 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_211_831)"><path d="M89.9837 25.7249C89.9837 27.4813 91.7755 28.4001 93.5458 28.4001C95.4022 28.4001 96.8562 26.8236 96.8562 24.8117C96.8562 21.3167 93.0193 18.6816 87.9311 18.6816C82.6995 18.6816 77.2885 22.475 77.2885 28.8228C77.2885 35.4135 80.8894 39.043 87.4285 39.043C93.1196 39.043 96.3362 36.1063 96.7299 30.551C96.7355 30.47 96.7075 30.3906 96.652 30.3312C96.5963 30.2719 96.5186 30.2382 96.4372 30.2382H93.1689C93.0182 30.2382 92.8921 30.3517 92.8765 30.5008C92.5886 33.3085 90.9106 35.123 88.6018 35.123C83.9884 35.123 83.4901 30.4952 83.4901 28.5054C83.4901 26.9529 83.8708 21.8872 88.7692 21.8872C90.2602 21.8872 91.372 22.2289 92.1472 22.9294C90.7288 23.2164 89.9837 24.1728 89.9837 25.7249Z" fill="currentColor"/><path d="M108.966 18.6816C102.246 18.6816 97.9041 22.6776 97.9041 28.8627C97.9041 35.0469 102.246 39.0431 108.966 39.0431C115.685 39.0431 120.027 35.0471 120.027 28.8627C120.028 22.6776 115.685 18.6816 108.966 18.6816ZM108.966 35.8375C105.741 35.8375 104.106 33.4911 104.106 28.8627C104.106 24.2342 105.741 21.8872 108.966 21.8872C112.191 21.8872 113.826 24.2342 113.826 28.8627C113.826 33.4911 112.191 35.8375 108.966 35.8375Z" fill="currentColor"/><path d="M123.213 32.5811C121.278 32.5811 119.819 33.9702 119.819 35.8122C119.819 37.6542 121.278 39.0428 123.213 39.0428C125.148 39.0428 126.607 37.6542 126.607 35.8122C126.607 33.9702 125.148 32.5811 123.213 32.5811Z" fill="currentColor"/><path d="M138.715 18.6817C136.754 18.6817 134.793 19.6497 133.353 21.3015V11.8249C133.353 11.6634 133.222 11.5327 133.059 11.5327H124.805C124.643 11.5327 124.512 11.6634 124.512 11.8249V14.4465C124.512 14.608 124.643 14.7387 124.805 14.7387H126.439C127.473 14.7387 127.822 15.0657 127.822 16.035V38.1555C127.822 38.317 127.953 38.4476 128.115 38.4476H130.755C130.849 38.4476 130.938 38.4026 130.993 38.3261L132.335 36.4698C134.14 38.3397 135.859 39.0429 138.548 39.0429C144.357 39.0429 147.557 35.258 147.557 28.3859C147.557 23.9095 145.241 18.6817 138.715 18.6817ZM141.355 28.8627C141.355 33.175 140.002 35.3616 137.333 35.3616C134.288 35.3616 133.311 33.7822 133.311 28.8627C133.311 24.5504 134.664 22.3638 137.333 22.3638C140.378 22.3638 141.355 23.9432 141.355 28.8627Z" fill="currentColor"/><path d="M172.28 17.3598C174.105 17.3598 175.59 15.946 175.59 14.2084C175.59 12.4704 174.105 11.0566 172.28 11.0566C170.455 11.0566 168.969 12.4704 168.969 14.2084C168.969 15.9458 170.454 17.3598 172.28 17.3598Z" fill="currentColor"/><path d="M179.026 35.2423H176.973C175.939 35.2423 175.59 34.9152 175.59 33.9459V19.5692C175.59 19.4078 175.459 19.2771 175.297 19.2771H166.749C166.587 19.2771 166.456 19.4078 166.456 19.5692V20.7159C165.461 19.3288 163.671 18.6816 161.888 18.6816C159.707 18.6816 158.37 19.7712 156.86 21.7964V19.5692C156.86 19.4078 156.729 19.2771 156.566 19.2771H147.683C147.521 19.2771 147.39 19.4078 147.39 19.5692V22.1903C147.39 22.3517 147.521 22.4824 147.683 22.4824H149.988C151.021 22.4824 151.37 22.8095 151.37 23.7792V33.9459C151.37 34.9152 151.021 35.2423 149.988 35.2423H147.683C147.521 35.2423 147.39 35.3729 147.39 35.5344V38.1555C147.39 38.3169 147.521 38.4476 147.683 38.4476H160.923C161.086 38.4476 161.217 38.3169 161.217 38.1555V35.5344C161.217 35.3729 161.086 35.2423 160.923 35.2423H158.284C157.25 35.2423 156.902 34.9152 156.902 33.9459V27.3134C156.902 24.4904 158.619 21.4898 161.804 21.4898C162.085 21.4898 162.384 21.5047 162.662 21.5766C161.342 21.8975 160.505 22.854 160.505 24.1367C160.505 25.805 161.848 26.9706 163.773 26.9706C165.821 26.9706 167.251 25.4785 167.251 23.3421C167.251 23.038 167.22 22.7553 167.174 22.4824H168.677C169.71 22.4824 170.059 22.8095 170.059 23.7792V33.9459C170.059 34.9152 169.71 35.2423 168.677 35.2423H166.749C166.587 35.2423 166.456 35.3729 166.456 35.5344V38.1555C166.456 38.3169 166.587 38.4476 166.749 38.4476H179.026C179.188 38.4476 179.319 38.3169 179.319 38.1555V35.5344C179.319 35.3729 179.188 35.2423 179.026 35.2423Z" fill="currentColor"/><path d="M198.515 30.331C198.459 30.2717 198.381 30.238 198.299 30.238H195.031C194.88 30.238 194.754 30.3515 194.739 30.5006C194.451 33.3083 192.773 35.1228 190.464 35.1228C185.851 35.1228 185.353 30.495 185.353 28.5052C185.353 26.9527 185.734 21.887 190.632 21.887C192.123 21.887 193.235 22.2287 194.01 22.9292C192.592 23.2164 191.847 24.1728 191.847 25.7249C191.847 27.4813 193.638 28.4001 195.409 28.4001C197.265 28.4001 198.719 26.8236 198.719 24.8117C198.719 21.3167 194.882 18.6816 189.794 18.6816C184.563 18.6816 179.151 22.475 179.151 28.8228C179.151 35.4135 182.752 39.043 189.291 39.043C194.983 39.043 198.199 36.1063 198.593 30.551C198.598 30.4698 198.57 30.3904 198.515 30.331Z" fill="currentColor"/><path d="M225.075 35.2423C223.075 35.2423 221.792 34.7862 221.033 33.8074L215.643 26.8536L219.931 23.6543C220.942 22.8879 222.214 22.4824 223.608 22.4824C223.77 22.4824 223.902 22.3518 223.902 22.1903V19.5693C223.902 19.4078 223.771 19.2771 223.608 19.2771H211.206C211.044 19.2771 210.912 19.4078 210.912 19.5693V22.1903C210.912 22.3518 211.044 22.4824 211.206 22.4824H214.013C214.331 22.4824 214.612 22.6075 214.641 22.6673C214.641 22.8271 214.586 23.0332 214.169 23.3494L207.98 28.1084V11.8249C207.98 11.6634 207.849 11.5327 207.687 11.5327H198.804C198.642 11.5327 198.51 11.6634 198.51 11.8249V14.4465C198.51 14.608 198.642 14.7387 198.804 14.7387H201.067C202.1 14.7387 202.449 15.0657 202.449 16.035V33.946C202.449 34.9152 202.1 35.2423 201.067 35.2423H198.804C198.642 35.2423 198.51 35.373 198.51 35.5345V38.1555C198.51 38.317 198.642 38.4476 198.804 38.4476H210.703C210.865 38.4476 210.997 38.317 210.997 38.1555V35.5345C210.997 35.373 210.865 35.2423 210.703 35.2423H209.363C208.329 35.2423 207.98 34.9152 207.98 33.946V32.6628L211.481 30.0664L214.531 34.1589C214.824 34.5557 214.934 34.725 214.934 34.9386C214.934 35.1013 214.934 35.2423 214.516 35.2423H212.673C212.511 35.2423 212.379 35.373 212.379 35.5345V38.1555C212.379 38.317 212.511 38.4476 212.673 38.4476H225.075C225.237 38.4476 225.369 38.317 225.369 38.1555V35.5345C225.368 35.373 225.237 35.2423 225.075 35.2423Z" fill="currentColor"/></g>
<defs><clipPath id="clip0_211_831"><rect width="148.081" height="27.9863" fill="white" transform="translate(77.2885 11.0566)"/></clipPath></defs>
</svg>`;

/** Prevent XSS / HTML injection in dynamic values */
function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export { generateReportHtml };
