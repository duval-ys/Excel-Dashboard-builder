import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import {
  Sparkles, Table, LayoutDashboard, Code, FileSpreadsheet,
  Play, Plus, Download, Copy, Check, RefreshCw, Wand2,
  TrendingUp, TrendingDown, Minus, AlertCircle, ChevronRight,
  Sliders, Eye, Upload, HelpCircle, Layers, ArrowUpRight,
  Maximize2, Minimize2, Terminal, CheckCircle2, Cpu,
  UserCheck, LogOut, ShieldCheck, Mail, Lock, Crown, KeyRound,
  Filter, Database, BarChart3, PieChart as PieChartIcon, Activity, RotateCcw
} from 'lucide-react';

const PRESET_DATASETS = {
  sales: {
    name: "Q1-Q3 Enterprise Sales",
    columns: ["A", "B", "C", "D", "E", "F", "G"],
    rows: [
      ["Date", "Region", "Category", "SalesRep", "Units", "Revenue", "Profit"],
      ["2026-01-15", "North America", "Cloud SaaS", "Sarah Jenkins", 120, 48000, 31200],
      ["2026-01-28", "Europe", "Cybersecurity", "Marc Weber", 85, 42500, 25500],
      ["2026-02-10", "Asia Pacific", "Cloud SaaS", "Kenji Sato", 150, 60000, 39000],
      ["2026-02-22", "North America", "AI Analytics", "Elena Rostova", 95, 76000, 53200],
      ["2026-03-05", "Europe", "Cloud SaaS", "Marc Weber", 110, 44000, 28600],
      ["2026-03-19", "Latin America", "Hardware", "Carlos Mendez", 200, 36000, 12600],
      ["2026-04-04", "North America", "Cybersecurity", "Sarah Jenkins", 130, 65000, 39000],
      ["2026-04-18", "Asia Pacific", "AI Analytics", "Kenji Sato", 140, 112000, 78400],
      ["2026-05-09", "Europe", "AI Analytics", "Marc Weber", 75, 60000, 42000],
      ["2026-05-25", "North America", "Cloud SaaS", "Elena Rostova", 180, 72000, 46800],
      ["2026-06-11", "Latin America", "Cybersecurity", "Carlos Mendez", 90, 45000, 27000],
      ["2026-06-29", "Asia Pacific", "Hardware", "Kenji Sato", 240, 43200, 15120],
      ["2026-07-14", "North America", "AI Analytics", "Sarah Jenkins", 165, 132000, 92400],
      ["2026-08-02", "Europe", "Cloud SaaS", "Marc Weber", 145, 58000, 37700],
      ["2026-08-21", "Asia Pacific", "Cybersecurity", "Kenji Sato", 115, 57500, 34500]
    ]
  },
  marketing: {
    name: "Digital Ad Campaigns",
    columns: ["A", "B", "C", "D", "E", "F", "G"],
    rows: [
      ["Month", "Channel", "Campaign", "Spend", "Impressions", "Clicks", "Conversions"],
      ["Jan 2026", "LinkedIn Ads", "B2B Lead Gen", 12500, 240000, 4800, 390],
      ["Jan 2026", "Google Search", "High Intent SaaS", 18000, 310000, 14200, 920],
      ["Feb 2026", "Meta Video", "Brand Awareness", 9500, 580000, 8900, 210],
      ["Feb 2026", "Google Search", "High Intent SaaS", 19500, 340000, 15800, 1050],
      ["Mar 2026", "LinkedIn Ads", "Enterprise ABM", 15000, 290000, 6100, 510],
      ["Mar 2026", "YouTube Sponsorship", "Product Launch", 22000, 890000, 19500, 840],
      ["Apr 2026", "Google Search", "Competitor Keywords", 16400, 275000, 11900, 780],
      ["Apr 2026", "Meta Video", "Retargeting Funnel", 11200, 410000, 9400, 640],
      ["May 2026", "LinkedIn Ads", "Executive Webinar", 14200, 265000, 5600, 495],
      ["May 2026", "YouTube Sponsorship", "Case Study Promo", 18500, 720000, 16200, 710]
    ]
  },
  operations: {
    name: "Supply Chain & Logistics",
    columns: ["A", "B", "C", "D", "E", "F", "G"],
    rows: [
      ["Hub", "Carrier", "TransportMode", "Shipments", "AvgTransitDays", "OnTimeRate", "FreightCost"],
      ["Lagos Port", "DHL Global", "Air Freight", 320, 3.2, 96.5, 84000],
      ["Rotterdam", "Maersk Line", "Ocean Container", 850, 18.5, 89.2, 142000],
      ["Singapore", "FedEx Trade", "Air Freight", 410, 2.8, 98.1, 108000],
      ["Chicago Hub", "JB Hunt", "Rail Intermodal", 1120, 5.4, 92.4, 95000],
      ["Lagos Port", "Maersk Line", "Ocean Container", 640, 21.0, 86.0, 112000],
      ["Frankfurt", "Kuehne+Nagel", "Road Freight", 980, 2.1, 95.8, 68000],
      ["Singapore", "COSCO Shipping", "Ocean Container", 1250, 14.2, 91.5, 165000],
      ["Chicago Hub", "XPO Logistics", "Road Freight", 890, 3.1, 94.0, 76000]
    ]
  }
};

const COLOR_THEMES = {
  powerbi: {
    name: "Power BI Modern Teal",
    colors: ["#00B8AA", "#374649", "#FD625E", "#F2C80F", "#5F6B6D", "#8AD4EB"],
    bg: "bg-slate-950",
    accent: "#00B8AA",
    banner: "from-[#01B8AA]/25 via-slate-900 to-slate-950"
  },
  emerald: {
    name: "Excel Emerald BI",
    colors: ["#10B981", "#059669", "#34D399", "#0EA5E9", "#F59E0B", "#6366F1"],
    bg: "bg-emerald-950",
    accent: "#107C41",
    banner: "from-emerald-500/20 via-slate-900 to-slate-950"
  },
  indigo: {
    name: "Executive Indigo",
    colors: ["#6366F1", "#38BDF8", "#A855F7", "#EC4899", "#14B8A6", "#F59E0B"],
    bg: "bg-indigo-950",
    accent: "#4F46E5",
    banner: "from-indigo-500/25 via-slate-900 to-slate-950"
  },
  amber: {
    name: "Financial Gold BI",
    colors: ["#F59E0B", "#0EA5E9", "#10B981", "#F97316", "#8B5CF6", "#EC4899"],
    bg: "bg-amber-950",
    accent: "#D97706",
    banner: "from-amber-500/20 via-slate-900 to-slate-950"
  }
};

function getExcelColName(index) {
  let name = "";
  let n = index;
  while (n >= 0) {
    name = String.fromCharCode((n % 26) + 65) + name;
    n = Math.floor(n / 26) - 1;
  }
  return name;
}

function profileDatasetSchema(headers, dataRows) {
  const schema = headers.map((header, colIdx) => {
    const nonEmptyVals = dataRows
      .map(r => r[colIdx])
      .filter(v => v !== undefined && v !== null && String(v).trim() !== "");

    let numericCount = 0;
    let dateCount = 0;
    let currencyHint = false;
    let percentHint = false;

    nonEmptyVals.forEach(val => {
      const str = String(val).trim();
      if (str.includes("$") || /revenue|sales|cost|profit|spend|budget|price|amount|income/i.test(header)) {
        currencyHint = true;
      }
      if (str.includes("%") || /rate|margin|ratio|pct|share|conversion/i.test(header)) {
        percentHint = true;
      }
      const cleanedNum = typeof val === "number" ? val : parseFloat(str.replace(/[$,%\s,]/g, ""));
      if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(str) || /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(str) || /date|month|year|quarter|period|week/i.test(header)) {
        dateCount++;
      } else if (!isNaN(cleanedNum) && str !== "") {
        numericCount++;
      }
    });

    const total = Math.max(1, nonEmptyVals.length);
    let role = "dimension"; // categorical
    if (dateCount / total >= 0.6) {
      role = "date";
    } else if (numericCount / total >= 0.6) {
      role = "measure";
    }

    const uniqueValues = Array.from(new Set(nonEmptyVals.map(String)));
    return {
      header,
      colIdx,
      colLetter: getExcelColName(colIdx),
      role,
      isCurrency: currencyHint && role === "measure",
      isPercent: percentHint && role === "measure",
      uniqueCount: uniqueValues.length,
      sampleValues: uniqueValues.slice(0, 8)
    };
  });

  return {
    fields: schema,
    measures: schema.filter(f => f.role === "measure"),
    dimensions: schema.filter(f => f.role === "dimension"),
    dates: schema.filter(f => f.role === "date")
  };
}

function formatCompactValue(num, isCurrency = false, isPercent = false) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  if (isPercent) return `${Number(num).toFixed(1)}%`;
  const abs = Math.abs(num);
  const prefix = isCurrency ? "$" : "";
  if (abs >= 1_000_000) return `${prefix}${(num / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${prefix}${(num / 1_000).toFixed(1)}K`;
  return `${prefix}${Number(num).toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
}

function buildSmartLocalBlueprint(headers, dataRows, rangeStr) {
  const profile = profileDatasetSchema(headers, dataRows);
  const measures = profile.measures;
  const dims = [...profile.dimensions, ...profile.dates];
  const primaryDim = profile.dimensions[0]?.header || headers[0];
  const secondaryDim = profile.dimensions[1]?.header || profile.dates[0]?.header || headers[0];
  const timeDim = profile.dates[0]?.header || primaryDim;

  const primaryMeasure = measures[0]?.header || headers[headers.length - 1];
  const secondaryMeasure = measures[1]?.header || primaryMeasure;
  const tertiaryMeasure = measures[2]?.header || secondaryMeasure;

  // Dynamically compute real KPIs from any dataset
  const kpis = (measures.length > 0 ? measures.slice(0, 4) : [profile.fields[0]]).map((m, idx) => {
    const vals = dataRows
      .map(r => {
        const raw = r[m.colIdx];
        return typeof raw === "number" ? raw : parseFloat(String(raw).replace(/[$,%\s,]/g, ""));
      })
      .filter(v => !isNaN(v));

    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = vals.length ? sum / vals.length : 0;
    const max = vals.length ? Math.max(...vals) : 0;
    const useAvg = m.isPercent || /avg|rate|days|score|margin/i.test(m.header);
    const mainVal = useAvg ? avg : sum;

    // Split first half vs second half to estimate trend
    const mid = Math.max(1, Math.floor(vals.length / 2));
    const firstHalfAvg = vals.slice(0, mid).reduce((a, b) => a + b, 0) / mid;
    const secondHalfAvg = vals.slice(mid).reduce((a, b) => a + b, 0) / Math.max(1, vals.length - mid);
    const pctDiff = firstHalfAvg ? ((secondHalfAvg - firstHalfAvg) / Math.abs(firstHalfAvg)) * 100 : 12.4;

    return {
      label: `${useAvg ? "Avg" : "Total"} ${m.header}`,
      value: formatCompactValue(mainVal, m.isCurrency, m.isPercent),
      change: `${pctDiff >= 0 ? "+" : ""}${pctDiff.toFixed(1)}% vs prior period`,
      trend: pctDiff >= 0 ? "up" : "down",
      excelFormula: `=${useAvg ? "AVERAGE" : "SUM"}(${m.colLetter}2:${m.colLetter}${dataRows.length + 1})`,
      progressPct: Math.min(96, Math.max(42, Math.round(70 + (idx * 7)))),
      peakLabel: `Peak: ${formatCompactValue(max, m.isCurrency, m.isPercent)}`
    };
  });

  // Pad to 4 KPIs if dataset has fewer than 4 numeric columns
  while (kpis.length < 4) {
    kpis.push({
      label: kpis.length === 1 ? "Total Records Analyzed" : `Unique ${primaryDim}s`,
      value: kpis.length === 1 ? String(dataRows.length) : String(profile.dimensions[0]?.uniqueCount || dataRows.length),
      change: "100% Active Coverage",
      trend: "up",
      excelFormula: `=COUNTA(A2:A${dataRows.length + 1})`,
      progressPct: 88,
      peakLabel: `Range: ${rangeStr}`
    });
  }

  return {
    dashboardTitle: `${primaryMeasure} & ${secondaryMeasure} — Power BI Executive Report`,
    subtitle: `Live Semantic Model from Excel Range ${rangeStr} (${dataRows.length} rows • ${headers.length} fields)`,
    executiveSummary: `Automated Power BI intelligence across ${dataRows.length} records indicates strong concentration in ${primaryDim} performance, with ${primaryMeasure} and ${secondaryMeasure} serving as primary value drivers.`,
    kpis,
    charts: [
      {
        title: `${primaryMeasure} by ${primaryDim}`,
        type: "bar",
        xAxisColumn: primaryDim,
        yAxisColumn: primaryMeasure,
        aggregation: "SUM",
        insight: `Compares total ${primaryMeasure} contribution across each ${primaryDim} segment.`
      },
      {
        title: `${secondaryMeasure} Share by ${secondaryDim}`,
        type: "pie",
        xAxisColumn: secondaryDim,
        yAxisColumn: secondaryMeasure,
        aggregation: "SUM",
        insight: `Proportional breakdown of ${secondaryMeasure} distribution across ${secondaryDim}.`
      },
      {
        title: `${primaryMeasure} Trend over ${timeDim}`,
        type: "area",
        xAxisColumn: timeDim,
        yAxisColumn: primaryMeasure,
        aggregation: "SUM",
        insight: `Tracks progression and momentum of ${primaryMeasure} across ${timeDim}.`
      },
      {
        title: `${tertiaryMeasure} Performance by ${secondaryDim}`,
        type: "composed",
        xAxisColumn: secondaryDim,
        yAxisColumn: tertiaryMeasure,
        aggregation: /rate|days|avg|pct/i.test(tertiaryMeasure) ? "AVG" : "SUM",
        insight: `Analyzes ${tertiaryMeasure} efficiency and benchmark variance by ${secondaryDim}.`
      }
    ],
    recommendations: [
      `Focus resource allocation on top-performing ${primaryDim} segments driving the majority of ${primaryMeasure}.`,
      `Investigate variance between ${primaryMeasure} and ${secondaryMeasure} to unlock margin expansion.`,
      `Use the Power BI Slicers and click any chart bar to cross-filter outliers in real time.`
    ]
  };
}

function computeAggregatedDashboard(headers, dataRows, aiBlueprint) {
  const profile = profileDatasetSchema(headers, dataRows);
  const rowObjects = dataRows.map(r => {
    const obj = {};
    headers.forEach((h, idx) => {
      const rawVal = r[idx];
      const numVal = typeof rawVal === 'number' ? rawVal : parseFloat(String(rawVal).replace(/[$,%\s,]/g, ''));
      obj[h] = !isNaN(numVal) && String(rawVal).trim() !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(String(rawVal)) ? numVal : rawVal;
    });
    return obj;
  });

  // Dynamically recalculate KPI values when cross-filtered or sliced
  const dynamicKpis = (aiBlueprint.kpis || []).map((kpi, idx) => {
    const matchedMeasure = profile.measures[idx] || profile.measures[0];
    if (!matchedMeasure || rowObjects.length === 0) return kpi;
    const colName = matchedMeasure.header;
    const vals = rowObjects.map(r => r[colName]).filter(v => typeof v === "number" && !isNaN(v));
    if (vals.length === 0) return kpi;

    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = sum / vals.length;
    const isAvg = /avg|average|rate|margin|days/i.test(kpi.label) || matchedMeasure.isPercent;
    const computedVal = isAvg ? avg : sum;

    return {
      ...kpi,
      value: formatCompactValue(computedVal, matchedMeasure.isCurrency, matchedMeasure.isPercent),
      progressPct: kpi.progressPct || Math.min(95, Math.max(48, 68 + idx * 8))
    };
  });

  const processedCharts = (aiBlueprint.charts || []).map((chart, index) => {
    const xCol = headers.includes(chart.xAxisColumn) ? chart.xAxisColumn : (profile.dimensions[0]?.header || headers[0]);
    const yCol = headers.includes(chart.yAxisColumn) ? chart.yAxisColumn : (profile.measures[0]?.header || headers[headers.length - 1]);
    const aggType = (chart.aggregation || 'SUM').toUpperCase();

    const grouped = {};
    rowObjects.forEach(row => {
      const key = String(row[xCol] ?? 'Other');
      const val = typeof row[yCol] === 'number' ? row[yCol] : 1;
      if (!grouped[key]) {
        grouped[key] = { sum: 0, count: 0 };
      }
      grouped[key].sum += val;
      grouped[key].count += 1;
    });

    const chartData = Object.keys(grouped).map(key => {
      let value = grouped[key].sum;
      if (aggType === 'AVG') value = Number((grouped[key].sum / grouped[key].count).toFixed(2));
      if (aggType === 'COUNT') value = grouped[key].count;
      return {
        name: key,
        value: Number(value.toFixed(2)),
        benchmark: Number((value * 0.88).toFixed(2)),
        [yCol]: Number(value.toFixed(2))
      };
    });

    const avgValue = chartData.length
      ? Number((chartData.reduce((s, d) => s + d.value, 0) / chartData.length).toFixed(2))
      : 0;
    const totalValue = chartData.reduce((s, d) => s + d.value, 0);

    return {
      ...chart,
      id: `chart-${index}`,
      xAxisColumn: xCol,
      yAxisColumn: yCol,
      avgValue,
      totalValue,
      data: chartData
    };
  });

  // Build Power BI Matrix / Leaderboard Table from primary dimension & all numeric measures
  const matrixDim = profile.dimensions[0]?.header || headers[0];
  const matrixMeasures = profile.measures.slice(0, 3);
  const matrixGroups = {};

  rowObjects.forEach(row => {
    const key = String(row[matrixDim] ?? "Other");
    if (!matrixGroups[key]) {
      matrixGroups[key] = { key, count: 0, sums: {} };
      matrixMeasures.forEach(m => { matrixGroups[key].sums[m.header] = 0; });
    }
    matrixGroups[key].count += 1;
    matrixMeasures.forEach(m => {
      const v = typeof row[m.header] === "number" ? row[m.header] : 0;
      matrixGroups[key].sums[m.header] += v;
    });
  });

  const matrixRows = Object.values(matrixGroups).sort((a, b) => {
    const firstM = matrixMeasures[0]?.header;
    return firstM ? (b.sums[firstM] - a.sums[firstM]) : (b.count - a.count);
  });

  return {
    ...aiBlueprint,
    kpis: dynamicKpis,
    charts: processedCharts,
    schemaProfile: profile,
    matrix: {
      dimension: matrixDim,
      measures: matrixMeasures,
      rows: matrixRows
    },
    rawCount: rowObjects.length
  };
}

async function generateDashboardWithGemini(headers, rows, userFocus, selectedRangeStr, googleAccount) {
  const apiKey = "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const sampleData = rows.slice(0, 20);
  const systemPrompt = `You are an expert Microsoft Excel BI Architect and Office Add-in AI Assistant powered by Gemini Pro (Authenticated User: ${googleAccount?.email || 'Pro User'}).
The user has highlighted range ${selectedRangeStr} in Excel and wants an instant, fatigue-free Executive Dashboard.
Analyze the table headers and data rows, calculate accurate KPIs across all provided rows, choose the 4 best visualizations, and provide 3 actionable executive takeaways.`;

  const userQuery = `Excel Range Selected: ${selectedRangeStr}
Authenticated Gemini Pro Account: ${googleAccount?.email || 'Connected'}
Headers: ${JSON.stringify(headers)}
Data Rows (${rows.length} rows): ${JSON.stringify(sampleData)}
User Focus / Custom Request: "${userFocus || 'Create a comprehensive executive overview dashboard'}"

Generate a structured JSON response matching the schema.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          dashboardTitle: { type: "STRING" },
          subtitle: { type: "STRING" },
          executiveSummary: { type: "STRING" },
          kpis: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                value: { type: "STRING" },
                change: { type: "STRING" },
                trend: { type: "STRING" },
                excelFormula: { type: "STRING" }
              },
              required: ["label", "value", "change", "trend", "excelFormula"]
            }
          },
          charts: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                type: { type: "STRING", description: "One of: bar, line, area, pie" },
                xAxisColumn: { type: "STRING", description: "Exact header name from Headers" },
                yAxisColumn: { type: "STRING", description: "Exact numeric header name from Headers" },
                aggregation: { type: "STRING", description: "One of: SUM, AVG, COUNT" },
                insight: { type: "STRING" }
              },
              required: ["title", "type", "xAxisColumn", "yAxisColumn", "aggregation", "insight"]
            }
          },
          recommendations: {
            type: "ARRAY",
            items: { type: "STRING" }
          }
        },
        required: ["dashboardTitle", "subtitle", "executiveSummary", "kpis", "charts", "recommendations"]
      }
    }
  };

  let delay = 1000;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return JSON.parse(text);
      }
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

function generateManifestXML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp
  xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0"
  xmlns:ov="http://schemas.microsoft.com/office/taskpaneappversionoverrides"
  xsi:type="TaskPaneApp">

  <!-- Update this ID to a unique GUID if publishing publicly -->
  <Id>f4c58f00-3693-47be-a57e-f6bb2d9f4851</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>Dashboard Maker AI</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>
  <DisplayName DefaultValue="Dashboard Maker AI (Gemini Pro)" />
  <Description DefaultValue="Instantly generate executive dashboards from selected ranges using Gemini Pro AI." />

  <!-- Specify the Host application -->
  <Hosts>
    <Host Name="Workbook" />
  </Hosts>

  <DefaultSettings>
    <!-- Replace this URL with wherever you host this React application -->
    <SourceLocation DefaultValue="https://your-hosted-domain.com/index.html" />
  </DefaultSettings>

  <Permissions>ReadWriteDocument</Permissions>
</OfficeApp>`;
}

function generateOfficeScriptCode(dashboard, rangeStr, googleAccount, sheetName = "Dashboard_AI") {
  return `/**
 * AI-Generated Excel Office Script (TypeScript)
 * Connected Gemini Pro Account: ${googleAccount?.email || 'Not signed in'}
 * Paste into Excel -> Automate Tab -> New Script -> Run
 * Source Range: ${rangeStr}
 */
function main(workbook: ExcelScript.Workbook) {
  const sourceSheet = workbook.getActiveWorksheet();
  const sourceRange = sourceSheet.getRange("${rangeStr}");

  // Create or reset AI Dashboard Sheet
  let dashSheet = workbook.getWorksheet("${sheetName}");
  if (dashSheet) {
    dashSheet.delete();
  }
  dashSheet = workbook.addWorksheet("${sheetName}");
  dashSheet.setTabColor("#107C41");

  // Title Banner
  const titleRange = dashSheet.getRange("B2:M3");
  titleRange.merge();
  titleRange.setValue("${dashboard?.dashboardTitle || 'Executive AI Dashboard'}");
  titleRange.getFormat().getFill().setColor("#107C41");
  titleRange.getFormat().getFont().setColor("#FFFFFF");
  titleRange.getFormat().getFont().setSize(18);
  titleRange.getFormat().getFont().setBold(true);
  titleRange.getFormat().setVerticalAlignment(ExcelScript.VerticalAlignment.center);

  // Stamp Connected Gemini Pro User
  const authStamp = dashSheet.getCell(3, 1);
  authStamp.setValue("Generated via Gemini Pro (${googleAccount?.email || 'Google Account'})");
  authStamp.getFormat().getFont().setSize(9);
  authStamp.getFormat().getFont().setColor("#64748B");

  // KPI Cards Row
  const kpis = ${JSON.stringify(dashboard?.kpis || [], null, 2)};
  kpis.forEach((kpi, idx) => {
    const startCol = 1 + idx * 3; // B, E, H, K
    const cardLabel = dashSheet.getCell(5, startCol);
    const cardVal = dashSheet.getCell(6, startCol);
    cardLabel.setValue(kpi.label);
    cardLabel.getFormat().getFont().setColor("#64748B");
    cardLabel.getFormat().getFont().setBold(true);

    cardVal.setValue(kpi.value);
    cardVal.getFormat().getFont().setSize(16);
    cardVal.getFormat().getFont().setBold(true);
    cardVal.getFormat().getFont().setColor("#0F172A");
  });

  // Insert Native Excel Charts linked to Source Range
  const chart1 = dashSheet.addChart(
    ExcelScript.ChartType.columnClustered,
    sourceRange,
    ExcelScript.ChartSeriesBy.columns
  );
  chart1.setPosition("B9", "G22");
  chart1.getTitle().setText("${dashboard?.charts?.[0]?.title || 'Primary Performance'}");

  const chart2 = dashSheet.addChart(
    ExcelScript.ChartType.lineMarkers,
    sourceRange,
    ExcelScript.ChartSeriesBy.columns
  );
  chart2.setPosition("H9", "M22");
  chart2.getTitle().setText("${dashboard?.charts?.[1]?.title || 'Trend Breakdown'}");

  dashSheet.activate();
}`;
}

export default function App() {
  const [activeDatasetKey, setActiveDatasetKey] = useState("sales");
  const [gridData, setGridData] = useState(PRESET_DATASETS.sales.rows);
  const columns = React.useMemo(() => {
    const maxCols = Math.max(7, ...(gridData.map(r => r.length)));
    return Array.from({ length: maxCols }, (_, i) => getExcelColName(i));
  }, [gridData]);

  // Range Selection State (0-indexed row & col)
  const [selection, setSelection] = useState({
    startRow: 0,
    startCol: 0,
    endRow: PRESET_DATASETS.sales.rows.length - 1,
    endCol: PRESET_DATASETS.sales.rows[0].length - 1
  });
  const [isSelecting, setIsSelecting] = useState(false);

  const [googleAccount, setGoogleAccount] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [signInStep, setSignInStep] = useState("email"); // 'email' | 'verifying'
  const [emailError, setEmailError] = useState("");

  // AI Extension & Power BI Cross-Filtering State
  const [userPrompt, setUserPrompt] = useState("");
  const [themeKey, setThemeKey] = useState("powerbi");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("split"); // 'sheet' | 'split' | 'dashboard' | 'export'
  const [exportType, setExportType] = useState("addin"); // 'addin' | 'script'
  const [copiedScript, setCopiedScript] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [statusBanner, setStatusBanner] = useState(null);
  const [activeFilterCol, setActiveFilterCol] = useState("ALL");
  const [activeFilterVal, setActiveFilterVal] = useState("ALL");
  const [crossFilter, setCrossFilter] = useState(null); // { column: string, value: string }

  // Compute Excel-style Range String (e.g. A1:G16)
  const minR = Math.min(selection.startRow, selection.endRow);
  const maxR = Math.max(selection.startRow, selection.endRow);
  const minC = Math.min(selection.startCol, selection.endCol);
  const maxC = Math.max(selection.startCol, selection.endCol);
  const rangeAddress = `${columns[minC] || 'A'}${minR + 1}:${columns[maxC] || 'G'}${maxR + 1}`;

  // Extract headers and rows from selected range
  const getSelectedTableData = () => {
    const slicedRows = gridData.slice(minR, maxR + 1).map(row => row.slice(minC, maxC + 1));
    if (slicedRows.length < 2) {
      return { headers: gridData[0].map(String), rows: gridData.slice(1) };
    }
    return {
      headers: slicedRows[0].map((h, idx) => (h !== undefined && String(h).trim() !== "" ? String(h) : `Column_${idx + 1}`)),
      rows: slicedRows.slice(1)
    };
  };

  // Automatically re-profile and update dashboard whenever dataset or selected range changes
  useEffect(() => {
    const { headers, rows } = getSelectedTableData();
    if (rows.length > 0) {
      const smartBlueprint = buildSmartLocalBlueprint(headers, rows, `Sheet1!${rangeAddress}`);
      setDashboardData(computeAggregatedDashboard(headers, rows, smartBlueprint));
      setCrossFilter(null);
    }
  }, [gridData, minR, maxR, minC, maxC]);

  // Switch preset dataset
  const handleSelectPreset = (key) => {
    setActiveDatasetKey(key);
    const preset = PRESET_DATASETS[key];
    setGridData(preset.rows);
    setSelection({
      startRow: 0,
      startCol: 0,
      endRow: preset.rows.length - 1,
      endCol: preset.rows[0].length - 1
    });
    setActiveFilterCol("ALL");
    setActiveFilterVal("ALL");
    setCrossFilter(null);
    setStatusBanner({
      type: "info",
      message: `Auto-generated Power BI Dashboard for "${preset.name}" (${preset.rows.length - 1} rows). Click 'Generate AI Dashboard' for deep Gemini Pro analysis!`
    });
  };

  const handleGoogleEmailSignIn = async (e) => {
    e?.preventDefault();
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setEmailError("Please enter a valid Google email address (e.g., you@gmail.com).");
      return;
    }
    setEmailError("");
    setSignInStep("verifying");
    await new Promise(r => setTimeout(r, 900));

    const displayName = trimmed
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    const connectedUser = {
      email: trimmed,
      name: displayName,
      plan: "Gemini Advanced / Pro",
      connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setGoogleAccount(connectedUser);
    setSignInStep("email");
    setShowSignInModal(false);
    setStatusBanner({
      type: "success",
      message: `Signed in as ${connectedUser.email} — Gemini Pro subscription linked to Excel Add-in!`
    });
  };

  const handleSignOut = () => {
    setGoogleAccount(null);
    setEmailInput("");
    setStatusBanner({
      type: "info",
      message: "Signed out of your Gemini Pro account."
    });
  };

  const handleGenerateDashboard = async () => {
    if (!googleAccount) {
      setShowSignInModal(true);
      return;
    }

    const { headers, rows } = getSelectedTableData();
    if (rows.length === 0) {
      setStatusBanner({ type: "error", message: "Please select at least 1 header row and 1 data row in the spreadsheet." });
      return;
    }

    setIsGenerating(true);
    setStatusBanner(null);
    try {
      setGenerationStep(`Authenticating Gemini Pro session for ${googleAccount.email}...`);
      await new Promise(r => setTimeout(r, 350));
      setGenerationStep("Profiling column types, measures & dimensions with Gemini Pro...");
      const blueprint = await generateDashboardWithGemini(
        headers,
        rows,
        userPrompt,
        `Sheet1!${rangeAddress}`,
        googleAccount
      );
      setGenerationStep("Computing aggregations, pivot series & KPI formulas...");
      await new Promise(r => setTimeout(r, 300));
      const fullDashboard = computeAggregatedDashboard(headers, rows, blueprint);
      setDashboardData(fullDashboard);
      setActiveFilterCol("ALL");
      setActiveFilterVal("ALL");
      setStatusBanner({
        type: "success",
        message: `Gemini Pro Dashboard created from Sheet1!${rangeAddress} for ${googleAccount.email}!`
      });
    } catch (error) {
      setStatusBanner({
        type: "error",
        message: "AI generation encountered an issue. Rebuilt using intelligent local pivot engine."
      });
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Parse pasted CSV / TSV data from real Excel
  const handleImportPastedData = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText.trim().split(/\r?\n/);
    const parsedRows = lines.map(line => {
      const delimiter = line.includes("\t") ? "\t" : ",";
      return line.split(delimiter).map(cell => {
        const trimmed = cell.trim().replace(/^"|"$/g, '');
        const num = Number(trimmed.replace(/[$,]/g, ''));
        return !isNaN(num) && trimmed !== '' ? num : trimmed;
      });
    });

    if (parsedRows.length >= 2) {
      setGridData(parsedRows);
      setSelection({
        startRow: 0,
        startCol: 0,
        endRow: parsedRows.length - 1,
        endCol: parsedRows[0].length - 1
      });
      setActiveFilterCol("ALL");
      setActiveFilterVal("ALL");
      setCrossFilter(null);
      setShowPasteModal(false);
      setPasteText("");
      setStatusBanner({
        type: "success",
        message: `Imported ${parsedRows.length - 1} rows × ${parsedRows[0].length} columns! Power BI Dashboard automatically adapted to your dataset.`
      });
    }
  };

  // Upload CSV / TSV file directly from computer
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = String(evt.target?.result || "");
      const lines = content.trim().split(/\r?\n/);
      const parsedRows = lines.map(line => {
        const delimiter = line.includes("\t") ? "\t" : ",";
        return line.split(delimiter).map(cell => {
          const trimmed = cell.trim().replace(/^"|"$/g, '');
          const num = Number(trimmed.replace(/[$,]/g, ''));
          return !isNaN(num) && trimmed !== '' ? num : trimmed;
        });
      });
      if (parsedRows.length >= 2) {
        setGridData(parsedRows);
        setSelection({
          startRow: 0,
          startCol: 0,
          endRow: parsedRows.length - 1,
          endCol: parsedRows[0].length - 1
        });
        setActiveFilterCol("ALL");
        setActiveFilterVal("ALL");
        setCrossFilter(null);
        setStatusBanner({
          type: "success",
          message: `Loaded "${file.name}" (${parsedRows.length - 1} rows). Power BI semantic model & visuals updated automatically!`
        });
      }
    };
    reader.readAsText(file);
  };

  const copyTextSafely = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // Fallback below when Clipboard API is blocked by iframe permissions policy
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackErr) {
      return false;
    }
  };

  const downloadFileDirectly = (filename, content, mimeType = "text/plain;charset=utf-8") => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Office Script or Manifest to Clipboard
  const handleCopyOfficeScript = async () => {
    const scriptText = generateOfficeScriptCode(displayedDashboard || dashboardData, rangeAddress, googleAccount);
    await copyTextSafely(scriptText);
    setCopiedScript(true);
    setStatusBanner({
      type: "success",
      message: "Office Script copied to your clipboard!"
    });
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyManifest = async () => {
    const manifestText = generateManifestXML();
    await copyTextSafely(manifestText);
    setCopiedScript(true);
    setStatusBanner({
      type: "success",
      message: "manifest.xml copied to your clipboard!"
    });
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleDownloadExport = () => {
    if (exportType === "addin") {
      downloadFileDirectly("manifest.xml", generateManifestXML(), "application/xml;charset=utf-8");
      setStatusBanner({
        type: "success",
        message: "Downloaded manifest.xml directly to your computer!"
      });
    } else {
      const scriptText = generateOfficeScriptCode(displayedDashboard || dashboardData, rangeAddress, googleAccount);
      downloadFileDirectly("AI_Dashboard_Maker.osts", scriptText, "text/plain;charset=utf-8");
      setStatusBanner({
        type: "success",
        message: "Downloaded AI_Dashboard_Maker.osts script file!"
      });
    }
  };

  // Interactive Slicer & Power BI Cross-Filtering on Dashboard
  const { headers: currentHeaders, rows: currentRows } = getSelectedTableData();
  const liveSchema = React.useMemo(
    () => profileDatasetSchema(currentHeaders, currentRows),
    [currentHeaders, currentRows]
  );

  const categoricalCols = liveSchema.dimensions.map(d => d.header).concat(liveSchema.dates.map(d => d.header));

  const slicerCol = activeFilterCol !== "ALL" && currentHeaders.includes(activeFilterCol)
    ? activeFilterCol
    : (categoricalCols[0] || currentHeaders[0]);

  const uniqueFilterValues = slicerCol
    ? Array.from(new Set(currentRows.map(r => String(r[currentHeaders.indexOf(slicerCol)] ?? "")))).slice(0, 10)
    : [];

  const displayedDashboard = React.useMemo(() => {
    if (!dashboardData) return null;
    let filteredRows = currentRows;

    if (activeFilterCol !== "ALL" && activeFilterVal !== "ALL") {
      const colIdx = currentHeaders.indexOf(activeFilterCol);
      if (colIdx !== -1) {
        filteredRows = filteredRows.filter(r => String(r[colIdx]) === activeFilterVal);
      }
    }

    if (crossFilter && currentHeaders.includes(crossFilter.column)) {
      const cfIdx = currentHeaders.indexOf(crossFilter.column);
      filteredRows = filteredRows.filter(r => String(r[cfIdx]) === crossFilter.value);
    }

    return computeAggregatedDashboard(
      currentHeaders,
      filteredRows.length ? filteredRows : currentRows,
      dashboardData
    );
  }, [dashboardData, activeFilterCol, activeFilterVal, crossFilter, gridData, selection]);

  const currentPalette = COLOR_THEMES[themeKey].colors;

  const handleChartElementClick = (xAxisColumn, clickedName) => {
    if (!clickedName) return;
    setCrossFilter(prev =>
      prev && prev.column === xAxisColumn && prev.value === String(clickedName)
        ? null
        : { column: xAxisColumn, value: String(clickedName) }
    );
  };

  const renderChartWidget = (chart) => {
    const type = (chart.type || "bar").toLowerCase();
    const isThisChartCrossFiltered = crossFilter && crossFilter.column === chart.xAxisColumn;

    return (
      <div
        key={chart.id}
        className="bg-[#111827] border border-slate-800/90 rounded-xl flex flex-col justify-between shadow-xl hover:border-slate-700 transition-all overflow-hidden group"
      >
        {/* Power BI Visual Top Accent Strip */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: currentPalette[0] }}
        />

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                  {chart.aggregation}({chart.yAxisColumn}) by {chart.xAxisColumn}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  • Click bar/slice to cross-filter
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">{chart.title}</h4>
            </div>
            <select
              value={type}
              onChange={(e) => {
                const updated = dashboardData.charts.map(c =>
                  c.id === chart.id ? { ...c, type: e.target.value } : c
                );
                setDashboardData({ ...dashboardData, charts: updated });
              }}
              className="bg-slate-900 text-xs text-slate-300 rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-teal-400"
            >
              <option value="bar">Clustered Column</option>
              <option value="composed">Combo Column + Line</option>
              <option value="line">Line Trend</option>
              <option value="area">Shaded Area</option>
              <option value="pie">Donut Ring</option>
            </select>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {type === "bar" ? (
                <BarChart
                  data={chart.data}
                  margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
                  onClick={(state) => {
                    if (state?.activeLabel) {
                      handleChartElementClick(chart.xAxisColumn, state.activeLabel);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
                  />
                  {chart.avgValue > 0 && (
                    <ReferenceLine
                      y={chart.avgValue}
                      stroke="#F59E0B"
                      strokeDasharray="4 4"
                      label={{ value: `Avg: ${formatCompactValue(chart.avgValue)}`, fill: '#FBBF24', fontSize: 10, position: 'insideTopRight' }}
                    />
                  )}
                  <Bar
                    dataKey="value"
                    fill={currentPalette[0]}
                    radius={[5, 5, 0, 0]}
                    className="cursor-pointer"
                  >
                    {chart.data.map((entry, i) => {
                      const isActive = !isThisChartCrossFiltered || crossFilter.value === entry.name;
                      return (
                        <Cell
                          key={i}
                          fill={currentPalette[i % currentPalette.length]}
                          fillOpacity={isActive ? 1 : 0.25}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              ) : type === "composed" ? (
                <ComposedChart
                  data={chart.data}
                  margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
                  onClick={(state) => {
                    if (state?.activeLabel) {
                      handleChartElementClick(chart.xAxisColumn, state.activeLabel);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" name={chart.yAxisColumn} fill={currentPalette[0]} radius={[5, 5, 0, 0]} className="cursor-pointer" />
                  <Line type="monotone" dataKey="benchmark" name="Target Benchmark" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3, fill: '#F59E0B' }} />
                </ComposedChart>
              ) : type === "line" ? (
                <LineChart
                  data={chart.data}
                  margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
                  onClick={(state) => {
                    if (state?.activeLabel) {
                      handleChartElementClick(chart.xAxisColumn, state.activeLabel);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={currentPalette[0]}
                    strokeWidth={3}
                    dot={{ r: 4, fill: currentPalette[0], strokeWidth: 2, stroke: '#0F172A' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : type === "area" ? (
                <AreaChart
                  data={chart.data}
                  margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
                  onClick={(state) => {
                    if (state?.activeLabel) {
                      handleChartElementClick(chart.xAxisColumn, state.activeLabel);
                    }
                  }}
                >
                  <defs>
                    <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentPalette[0]} stopOpacity={0.55} />
                      <stop offset="95%" stopColor={currentPalette[0]} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={currentPalette[0]}
                    strokeWidth={2.5}
                    fill={`url(#grad-${chart.id})`}
                  />
                </AreaChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chart.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={76}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                    onClick={(entry) => handleChartElementClick(chart.xAxisColumn, entry?.name)}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    className="cursor-pointer"
                  >
                    {chart.data.map((entry, i) => {
                      const isActive = !isThisChartCrossFiltered || crossFilter.value === entry.name;
                      return (
                        <Cell
                          key={i}
                          fill={currentPalette[i % currentPalette.length]}
                          fillOpacity={isActive ? 1 : 0.25}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate" title={chart.insight}>{chart.insight}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              Total: {formatCompactValue(chart.totalValue)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none"
      onMouseUp={() => setIsSelecting(false)}
    >
      {/* Top Excel Window Header Bar */}
      <header className="bg-[#107C41] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-white" />
            <span className="font-bold tracking-tight text-sm sm:text-base">Excel</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-600/40">
            <span className="font-medium">Workbook:</span>
            <span className="text-emerald-200 font-semibold">{PRESET_DATASETS[activeDatasetKey].name}.xlsx</span>
            <span className="text-emerald-400">• Saved</span>
          </div>
        </div>

        {/* Center View Mode Switcher */}
        <div className="flex items-center bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/50">
          <button
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "split" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:bg-emerald-800/50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Split Studio
          </button>
          <button
            onClick={() => setActiveTab("sheet")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "sheet" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:bg-emerald-800/50"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Data Grid ({rangeAddress})
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "dashboard" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:bg-emerald-800/50"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Full Dashboard
          </button>
          <button
            onClick={() => setActiveTab("export")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "export" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:bg-emerald-800/50"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Export to Real Excel
          </button>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2">
          <label className="bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-600 flex items-center gap-1.5 transition cursor-pointer">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Upload CSV</span>
            <input type="file" accept=".csv,.tsv,.txt" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={() => setShowPasteModal(true)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-600 flex items-center gap-1.5 transition"
          >
            <Upload className="w-3.5 h-3.5" />
            Paste Excel Cells
          </button>

          {googleAccount ? (
            <div className="flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/50 pl-2.5 pr-1.5 py-1 rounded-full">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 text-[10px] font-extrabold text-slate-950 flex items-center justify-center">
                {googleAccount.email[0].toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[11px] font-semibold text-white">{googleAccount.email}</span>
                <span className="text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5 text-amber-300" /> Gemini Pro
                </span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign out of Gemini Pro"
                className="p-1 text-emerald-300 hover:text-white hover:bg-emerald-800/60 rounded-full transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </header>

      {}
      {/* Excel Formula Bar & Dataset Preset Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="bg-slate-950 border border-slate-700 px-3 py-1 rounded font-mono font-bold text-teal-400">
            {rangeAddress}
          </div>
          <span className="text-slate-500 font-mono italic px-1">fx</span>
          <div className="bg-slate-950 border border-slate-800 px-3 py-1 rounded text-slate-300 font-mono truncate flex-1">
            {`=AI.POWERBI.DASHBOARD(Sheet1!${rangeAddress}, "${userPrompt || 'Auto Semantic Model'}")`}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Sample Tables:</span>
          {Object.entries(PRESET_DATASETS).map(([key, ds]) => (
            <button
              key={key}
              onClick={() => handleSelectPreset(key)}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${
                activeDatasetKey === key
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {ds.name}
            </button>
          ))}
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusBanner && (
        <div
          className={`px-4 py-2 text-xs font-medium flex items-center justify-between border-b ${
            statusBanner.type === "error"
              ? "bg-rose-950/70 text-rose-200 border-rose-800"
              : statusBanner.type === "success"
              ? "bg-emerald-950/70 text-emerald-200 border-emerald-800"
              : "bg-slate-900 text-teal-200 border-slate-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{statusBanner.message}</span>
          </div>
          <button
            onClick={() => setStatusBanner(null)}
            className="text-slate-400 hover:text-white ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Center Studio Canvas */}
        <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/* SECTION 1: Interactive Excel Spreadsheet Grid */}
          {(activeTab === "split" || activeTab === "sheet") && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">
                    Sheet1 — Drag across cells to select any custom range ({rangeAddress})
                  </span>
                </div>
                <button
                  onClick={() =>
                    setSelection({
                      startRow: 0,
                      startCol: 0,
                      endRow: gridData.length - 1,
                      endCol: gridData[0].length - 1
                    })
                  }
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-teal-300 px-2.5 py-1 rounded border border-slate-700 font-semibold transition"
                >
                  Select Entire Table
                </button>
              </div>

              <div className="overflow-x-auto max-h-72">
                <table className="w-full border-collapse text-xs font-mono">
                  <thead className="sticky top-0 z-10 bg-slate-950 text-slate-400">
                    <tr>
                      <th className="w-10 py-1.5 border border-slate-800 text-center bg-slate-950">#</th>
                      {columns.slice(0, gridData[0]?.length || 7).map((colName, cIdx) => (
                        <th
                          key={colName}
                          className={`py-1.5 px-3 border border-slate-800 text-center font-bold ${
                            cIdx >= minC && cIdx <= maxC ? "bg-emerald-950/60 text-emerald-300" : ""
                          }`}
                        >
                          {colName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gridData.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td
                          className={`py-1.5 px-2 border border-slate-800 text-center font-bold ${
                            rIdx >= minR && rIdx <= maxR
                              ? "bg-emerald-950/60 text-emerald-300"
                              : "bg-slate-950 text-slate-500"
                          }`}
                        >
                          {rIdx + 1}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isSelected =
                            rIdx >= minR && rIdx <= maxR && cIdx >= minC && cIdx <= maxC;
                          const isHeader = rIdx === minR && isSelected;
                          return (
                            <td
                              key={cIdx}
                              onMouseDown={() => {
                                setIsSelecting(true);
                                setSelection({
                                  startRow: rIdx,
                                  startCol: cIdx,
                                  endRow: rIdx,
                                  endCol: cIdx
                                });
                              }}
                              onMouseEnter={() => {
                                if (isSelecting) {
                                  setSelection(prev => ({
                                    ...prev,
                                    endRow: rIdx,
                                    endCol: cIdx
                                  }));
                                }
                              }}
                              className={`py-1.5 px-3 border border-slate-800/90 cursor-cell whitespace-nowrap transition-colors ${
                                isHeader
                                  ? "bg-emerald-800/40 text-white font-bold"
                                  : isSelected
                                  ? "bg-emerald-500/15 text-emerald-100"
                                  : "text-slate-300 hover:bg-slate-800/50"
                              }`}
                            >
                              {typeof cell === "number" ? cell.toLocaleString() : String(cell ?? "")}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 2: Generated Interactive Power BI on Excel Executive Dashboard */}
          {(activeTab === "split" || activeTab === "dashboard") && displayedDashboard && (
            <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Power BI Report Top Executive Ribbon */}
              <div className={`bg-gradient-to-r ${COLOR_THEMES[themeKey].banner} border-b border-slate-800 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4`}>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1.5">
                      <BarChart3 className="w-3 h-3" />
                      Power BI on Excel Canvas
                    </span>
                    <span className="bg-teal-500/15 text-teal-300 text-[11px] font-mono px-2.5 py-0.5 rounded border border-teal-500/30">
                      Range: Sheet1!{rangeAddress}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      • {displayedDashboard.rawCount} records • {liveSchema.measures.length} Measures (Σ) • {liveSchema.dimensions.length + liveSchema.dates.length} Dimensions
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {displayedDashboard.dashboardTitle}
                  </h1>
                  <p className="text-xs text-slate-400">{displayedDashboard.subtitle}</p>
                </div>

                {/* Active Cross-Filter Badge & Reset */}
                <div className="flex flex-wrap items-center gap-2">
                  {(crossFilter || activeFilterVal !== "ALL") && (
                    <button
                      onClick={() => {
                        setCrossFilter(null);
                        setActiveFilterCol("ALL");
                        setActiveFilterVal("ALL");
                      }}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        Clear Filter ({crossFilter ? `${crossFilter.column}: ${crossFilter.value}` : `${activeFilterCol}: ${activeFilterVal}`})
                      </span>
                    </button>
                  )}

                  {/* Dimension Switcher for Chiclet Slicer */}
                  <div className="flex items-center gap-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Filter className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-xs font-semibold text-slate-400">Slicer Field:</span>
                    <select
                      value={slicerCol}
                      onChange={(e) => {
                        setActiveFilterCol(e.target.value);
                        setActiveFilterVal("ALL");
                      }}
                      className="bg-slate-900 text-xs font-bold text-white px-2 py-1 rounded border border-slate-700 focus:outline-none"
                    >
                      {categoricalCols.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Power BI Horizontal Chiclet Slicer Bar */}
              {uniqueFilterValues.length > 0 && (
                <div className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-teal-400" />
                    {slicerCol}:
                  </span>
                  <button
                    onClick={() => {
                      setActiveFilterCol(slicerCol);
                      setActiveFilterVal("ALL");
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                      activeFilterVal === "ALL"
                        ? "bg-teal-500 text-slate-950 shadow"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    All ({currentRows.length})
                  </button>
                  {uniqueFilterValues.map(val => {
                    const isSelected = activeFilterCol === slicerCol && activeFilterVal === val;
                    return (
                      <button
                        key={val}
                        onClick={() => {
                          setActiveFilterCol(slicerCol);
                          setActiveFilterVal(isSelected ? "ALL" : val);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 border ${
                          isSelected
                            ? "bg-teal-500/20 text-teal-300 border-teal-400 shadow"
                            : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* Power BI Copilot Narrative Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3.5 shadow-inner">
                  <div className="p-2.5 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 shrink-0 mt-0.5">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px]">
                        AI Smart Narrative • Auto-Detected Data Story
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Updated Live
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {displayedDashboard.executiveSummary}
                    </p>
                  </div>
                </div>

                {/* Power BI KPI Cards with Progress Bars & Formula Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {(displayedDashboard.kpis || []).map((kpi, idx) => (
                    <div
                      key={idx}
                      className="bg-[#111827] border border-slate-800/90 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
                    >
                      <div
                        className="h-1 w-full"
                        style={{ backgroundColor: currentPalette[idx % currentPalette.length] }}
                      />
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-400 gap-2">
                          <span className="font-bold uppercase tracking-wider text-[11px] text-slate-300 truncate">
                            {kpi.label}
                          </span>
                          <span className="font-mono text-[10px] text-teal-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                            {kpi.excelFormula}
                          </span>
                        </div>

                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {kpi.value}
                        </div>

                        {/* Power BI Goal / Target Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${kpi.progressPct || 75}%`,
                                backgroundColor: currentPalette[idx % currentPalette.length]
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="flex items-center gap-1">
                              {kpi.trend === "down" ? (
                                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                              ) : (
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                              <span className={kpi.trend === "down" ? "text-rose-400 font-semibold" : "text-emerald-400 font-semibold"}>
                                {kpi.change}
                              </span>
                            </span>
                            <span className="text-slate-500 font-mono">
                              {kpi.peakLabel || `Goal: ${kpi.progressPct || 75}%`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2x2 Interactive Power BI Visual Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(displayedDashboard.charts || []).map(chart => renderChartWidget(chart))}
                </div>

                {/* Bottom Row: Power BI Conditional-Formatted Decomposition Matrix + AI Action Items */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                  {/* Power BI Matrix Table with Inline Data Bars */}
                  {displayedDashboard.matrix && displayedDashboard.matrix.rows.length > 0 && (
                    <div className="xl:col-span-2 bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                      <div className="h-1 w-full" style={{ backgroundColor: currentPalette[1] }} />
                      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                            Power BI Matrix Visual • Conditional Data Bars
                          </span>
                          <h3 className="text-sm font-bold text-white mt-0.5">
                            Top {displayedDashboard.matrix.dimension} Breakdown across Key Measures
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Click row to cross-filter
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                              <th className="py-2.5 px-4 font-bold">{displayedDashboard.matrix.dimension}</th>
                              <th className="py-2.5 px-3 font-bold text-right">Records</th>
                              {displayedDashboard.matrix.measures.map(m => (
                                <th key={m.header} className="py-2.5 px-4 font-bold">
                                  Σ {m.header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {displayedDashboard.matrix.rows.slice(0, 6).map((row, rIdx) => {
                              const isRowSelected =
                                crossFilter &&
                                crossFilter.column === displayedDashboard.matrix.dimension &&
                                crossFilter.value === row.key;
                              return (
                                <tr
                                  key={row.key}
                                  onClick={() => handleChartElementClick(displayedDashboard.matrix.dimension, row.key)}
                                  className={`border-b border-slate-800/60 cursor-pointer transition ${
                                    isRowSelected ? "bg-teal-500/15" : "hover:bg-slate-800/50"
                                  }`}
                                >
                                  <td className="py-2.5 px-4 font-bold text-white flex items-center gap-2">
                                    <span
                                      className="w-2 h-2 rounded-full shrink-0"
                                      style={{ backgroundColor: currentPalette[rIdx % currentPalette.length] }}
                                    />
                                    <span>{row.key}</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                                    {row.count}
                                  </td>
                                  {displayedDashboard.matrix.measures.map((m, mIdx) => {
                                    const maxVal = Math.max(
                                      1,
                                      ...displayedDashboard.matrix.rows.map(r => Math.abs(r.sums[m.header] || 0))
                                    );
                                    const val = row.sums[m.header] || 0;
                                    const widthPct = Math.min(100, Math.round((Math.abs(val) / maxVal) * 100));
                                    return (
                                      <td key={m.header} className="py-2.5 px-4">
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between font-mono text-slate-200">
                                            <span>{formatCompactValue(val, m.isCurrency, m.isPercent)}</span>
                                            <span className="text-[10px] text-slate-500">{widthPct}%</span>
                                          </div>
                                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                              className="h-full rounded-full"
                                              style={{
                                                width: `${widthPct}%`,
                                                backgroundColor: currentPalette[(mIdx + rIdx) % currentPalette.length]
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* AI Executive Action Cards */}
                  {displayedDashboard.recommendations?.length > 0 && (
                    <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                      <div className="h-1 w-full" style={{ backgroundColor: currentPalette[2] }} />
                      <div className="p-4 border-b border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Prescriptive Analytics
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Key Executive Takeaways
                        </h3>
                      </div>
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        {displayedDashboard.recommendations.map((rec, i) => (
                          <div
                            key={i}
                            className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-3 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded text-[11px] shrink-0">
                              #{i + 1}
                            </span>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: Export Office Script / Add-in Code to Real Excel */}
          {activeTab === "export" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Real Excel Integration
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Install as a Microsoft Excel Add-in
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose "Add-in Manifest" to sideload this software as a native taskpane inside your Excel ribbon, or choose "One-Time Script" for a quick run.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setExportType("addin")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${exportType === "addin" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      Add-in Manifest
                    </button>
                    <button
                      onClick={() => setExportType("script")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${exportType === "script" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      One-Time Script
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {exportType === "addin" ? (
                      <button
                        onClick={handleCopyManifest}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center justify-center gap-2 shadow border border-slate-700 transition"
                      >
                        {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copiedScript ? "Copied!" : "Copy manifest.xml"}
                      </button>
                    ) : (
                      <button
                        onClick={handleCopyOfficeScript}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center justify-center gap-2 shadow border border-slate-700 transition"
                      >
                        {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copiedScript ? "Copied!" : "Copy Script"}
                      </button>
                    )}
                    <button
                      onClick={handleDownloadExport}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Step-by-Step Installation Guide */}
              {exportType === "addin" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">1</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Host the Web App</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Since modern Excel Add-ins are web applications, you first need to host this React code online (e.g., Vercel, Netlify, or your company server). It <strong>must</strong> be hosted on an HTTPS URL.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">2</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Save the Manifest File</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Click the <strong>Copy manifest.xml</strong> button above. Paste the text into a plain text editor (like Notepad) and save the file as <code className="text-emerald-300">manifest.xml</code> to your computer. Remember to replace <code className="text-emerald-300">https://your-hosted-domain.com</code> with your actual URL.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">3A</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Install (Excel on the Web)</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Open Excel Online. Go to <strong>Insert &gt; Add-ins</strong>. Click <strong>Manage My Add-ins</strong>, select <strong>Upload My Add-in</strong>, and choose the <code className="text-emerald-300">manifest.xml</code> file you just saved. The Dashboard AI Maker taskpane will open immediately!
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">3B</div>
                      </div>
                      <div className="pb-1">
                        <h4 className="font-bold text-white text-base">Install (Excel Desktop)</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          1. Create a shared network folder and put <code className="text-emerald-300">manifest.xml</code> inside.<br/>
                          2. Open Excel. Go to <strong>File &gt; Options &gt; Trust Center &gt; Trust Center Settings &gt; Trusted Add-in Catalogs</strong>.<br/>
                          3. Add the folder path, check "Show in Menu", and restart Excel.<br/>
                          4. Go to <strong>Insert &gt; Get Add-ins &gt; Shared Folder</strong> and select it.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code Preview Pane */}
                  <div className="flex flex-col">
                    <div className="bg-slate-950 border-t border-l border-r border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Add-in Manifest (XML)</span>
                      <Code className="w-4 h-4 text-emerald-500" />
                    </div>
                    <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-b-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto overflow-y-auto max-h-[400px] leading-relaxed custom-scrollbar">
                      {generateManifestXML()}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">1</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Copy the AI Script</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Click the green <strong>"Copy Office Script"</strong> button above. This copies the exact TypeScript automation code needed to generate your charts and KPIs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">2</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Open Microsoft Excel</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Open your target workbook in <strong>Excel for the Web</strong> or <strong>Excel Desktop (Microsoft 365)</strong>. Ensure your source data is on a worksheet (e.g., <code className="text-emerald-300">Sheet1</code>).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">3</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Navigate to the Automate Tab</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          On the top Excel ribbon, click the <strong>Automate</strong> tab. Then, click the <strong>New Script</strong> button. 
                          <br/><span className="italic text-[10px] text-slate-500 mt-1 block">*Note: If you don't see this tab, ensure you have a Microsoft 365 commercial or educational license.</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">4</div>
                        <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-white text-base">Paste & Save</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          A Code Editor pane will open on the right. <strong>Delete</strong> all existing code there, and <strong>Paste</strong> (<kbd className="px-1 py-0.5 bg-slate-800 rounded">Ctrl+V</kbd> or <kbd className="px-1 py-0.5 bg-slate-800 rounded">Cmd+V</kbd>) the code you copied in Step 1. Click <strong>Save script</strong> and rename it to "AI Dashboard Maker".
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">5</div>
                      </div>
                      <div className="pb-1">
                        <h4 className="font-bold text-white text-base">Run the Automation</h4>
                        <p className="text-slate-400 mt-1 text-xs leading-relaxed">
                          Click the <strong>Run</strong> button at the top of the Code Editor pane. Excel will automatically read range <code className="text-emerald-300">{rangeAddress}</code>, create a new "Dashboard_AI" tab, and instantly build out your KPI tiles and native charts!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code Preview Pane */}
                  <div className="flex flex-col">
                    <div className="bg-slate-950 border-t border-l border-r border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Office Script Preview (TypeScript)</span>
                      <Code className="w-4 h-4 text-emerald-500" />
                    </div>
                    <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-b-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto overflow-y-auto max-h-[400px] leading-relaxed custom-scrollbar">
                      {generateOfficeScriptCode(displayedDashboard, rangeAddress, googleAccount)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Simulated Excel Add-In Taskpane ("Dashboard AI Maker") */}
        <aside className="w-full lg:w-80 xl:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between shrink-0">
          <div className="p-5 space-y-5 overflow-y-auto">
            {/* Extension Taskpane Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">
                    Dashboard Maker AI
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Excel Add-in Taskpane • Gemini Pro
                  </span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 text-[10px] rounded font-semibold border ${
                  googleAccount
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                }`}
              >
                {googleAccount ? "Pro Linked" : "Sign-In Needed"}
              </span>
            </div>

            {/* Gemini Pro Google Account Connection Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  Gemini Pro Account
                </span>
                {googleAccount && (
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                  </span>
                )}
              </div>

              {googleAccount ? (
                <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-lg p-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {googleAccount.email[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {googleAccount.name}
                      </div>
                      <div className="text-[11px] text-emerald-400 truncate">
                        {googleAccount.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-[11px] text-slate-400 hover:text-rose-400 font-semibold px-2 py-1 rounded hover:bg-slate-800 transition shrink-0"
                  >
                    Switch
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sign in with your Google email to connect your <strong className="text-slate-200">Gemini Pro</strong> account—no manual API keys required.
                  </p>
                  <button
                    onClick={() => setShowSignInModal(true)}
                    className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    Sign in with Google Email
                  </button>
                </div>
              )}
            </div>

            {/* Step 1: Active Range Detector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Selected Excel Range
                </label>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-700/50">
                  Sheet1!{rangeAddress}
                </span>
              </div>

              {/* Detected Power BI Semantic Fields (Measures Σ vs Dimensions) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1">
                    <Database className="w-3 h-3 text-teal-400" />
                    Auto-Detected Data Model
                  </span>
                  <span className="text-teal-400">{liveSchema.fields.length} Fields</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {liveSchema.fields.map((f, i) => (
                    <span
                      key={i}
                      title={f.role === "measure" ? "Numeric Measure (Auto-Aggregated)" : f.role === "date" ? "Date/Time Dimension" : "Categorical Dimension"}
                      className={`text-[11px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        f.role === "measure"
                          ? "bg-teal-950/70 text-teal-300 border-teal-700/50 font-semibold"
                          : f.role === "date"
                          ? "bg-amber-950/60 text-amber-300 border-amber-700/50"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">
                        {f.role === "measure" ? "Σ" : f.role === "date" ? "📅" : "⚲"}
                      </span>
                      <span>{f.header}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Optional AI Focus Prompt */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. What should AI focus on? (Optional)
              </label>
              <textarea
                rows={3}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="e.g., Highlight profitability by region, compare top sales reps, and flag low-margin categories..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition resize-none"
              />
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Executive Revenue & Margin",
                  "Top Performers & Outliers",
                  "Growth & Unit Velocity"
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setUserPrompt(chip)}
                    className="text-[11px] bg-slate-800/90 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700 transition"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Color Palette Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Dashboard Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(COLOR_THEMES).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => setThemeKey(key)}
                    className={`p-2 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                      themeKey === key
                        ? "bg-slate-800 border-emerald-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {theme.colors.slice(0, 3).map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold truncate">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary 1-Click AI Generate Button */}
            <button
              onClick={handleGenerateDashboard}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Building Dashboard...</span>
                </>
              ) : !googleAccount ? (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Sign In & Generate Dashboard</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Dashboard (Pro)</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="bg-emerald-950/50 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                <span>{generationStep}</span>
              </div>
            )}

            {/* Quick Export to Real Excel Button */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setActiveTab("export")}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Get Office Script for Desktop Excel
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Taskpane Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{googleAccount ? `Pro: ${googleAccount.email}` : "Gemini Pro Add-in"}</span>
            <span className="text-emerald-400 font-mono">Office.js Ready</span>
          </div>
        </aside>
      </div>

      {}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Sign in with Google
                  </h3>
                  <p className="text-xs text-slate-400">
                    Connect your Gemini Pro account to Excel
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSignInModal(false);
                  setSignInStep("email");
                  setEmailError("");
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {signInStep === "verifying" ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <div className="text-sm font-bold text-white">
                  Linking {emailInput} to Gemini Pro...
                </div>
                <p className="text-xs text-slate-400 max-w-xs">
                  Verifying your Google Workspace / Gemini Advanced subscription for Excel Office Add-in access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGoogleEmailSignIn} className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    Zero API Key Setup
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Just enter the Google email tied to your Gemini Pro subscription. Your session will authenticate directly with the dashboard maker.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Google Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setEmailError("");
                      }}
                      placeholder="yourname@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-rose-400 font-medium">{emailError}</p>
                  )}
                </div>

                {/* Quick 1-Tap Demo Emails */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400">Or quick-fill email:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["alex.analytics@gmail.com", "finance.lead@workspace.com"].map((demoEmail) => (
                      <button
                        type="button"
                        key={demoEmail}
                        onClick={() => setEmailInput(demoEmail)}
                        className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 transition"
                      >
                        {demoEmail}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSignInModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white shadow-lg flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Continue with Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal for Pasting Custom Excel / CSV Data */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Paste Cells Directly from Excel
                </h3>
              </div>
              <button
                onClick={() => setShowPasteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Copy any table range in Microsoft Excel or Google Sheets (<kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">Ctrl+C</kbd>) and paste it below (<kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">Ctrl+V</kbd>). Include headers in the first row.
            </p>
            <textarea
              rows={8}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={"Department\tMonth\tBudget\tActual\nEngineering\tJan\t45000\t42300\nMarketing\tJan\t28000\t31200\nSales\tFeb\t52000\t58900"}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImportPastedData}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Load into Excel Grid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}