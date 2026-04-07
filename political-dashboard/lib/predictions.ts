import { PollingPoint } from "./data";

export interface PredictionPoint {
  date: string;
  predicted: number;
  lower: number;
  upper: number;
}

export interface TrendAnalysis {
  direction: "rising" | "falling" | "stable";
  momentum: number; // -10 to +10
  volatility: number;
  shortTermTrend: number; // 3-month change
  longTermTrend: number;  // 6-month change
  predictedNext3m: number;
  predictedNext6m: number;
  confidence: "high" | "medium" | "low";
  keyFactors: string[];
}

// Simple linear regression
function linearRegression(data: number[]): { slope: number; intercept: number } {
  const n = data.length;
  const x = data.map((_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * data[i], 0);
  const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

function addMonths(dateStr: string, months: number): string {
  const [year, month] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1 + months, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function generatePredictions(
  data: PollingPoint[],
  monthsAhead: number = 6
): PredictionPoint[] {
  if (data.length < 4) return [];

  const recent = data.slice(-12);
  const approvals = recent.map((d) => d.approve);
  const { slope } = linearRegression(approvals);

  const lastDate = data[data.length - 1].date;
  const lastApprove = data[data.length - 1].approve;

  const std = Math.sqrt(
    approvals.reduce((acc, v) => acc + Math.pow(v - approvals.reduce((a,b) => a+b,0)/approvals.length, 2), 0) / approvals.length
  );

  return Array.from({ length: monthsAhead }, (_, i) => {
    const predicted = Math.max(20, Math.min(80, lastApprove + slope * (i + 1)));
    const uncertainty = std * Math.sqrt(i + 1) * 0.5;
    return {
      date: addMonths(lastDate, i + 1),
      predicted: Math.round(predicted * 10) / 10,
      lower: Math.round(Math.max(20, predicted - uncertainty) * 10) / 10,
      upper: Math.round(Math.min(80, predicted + uncertainty) * 10) / 10,
    };
  });
}

export function analyzeTrend(data: PollingPoint[]): TrendAnalysis {
  if (data.length < 4) {
    return {
      direction: "stable",
      momentum: 0,
      volatility: 0,
      shortTermTrend: 0,
      longTermTrend: 0,
      predictedNext3m: data[data.length - 1]?.approve || 40,
      predictedNext6m: data[data.length - 1]?.approve || 40,
      confidence: "low",
      keyFactors: [],
    };
  }

  const approvals = data.map((d) => d.approve);
  const last = approvals[approvals.length - 1];
  const prev3 = approvals[Math.max(0, approvals.length - 4)];
  const prev6 = approvals[Math.max(0, approvals.length - 7)];

  const shortTermTrend = last - prev3;
  const longTermTrend = last - prev6;

  const recent6 = approvals.slice(-6);
  const { slope } = linearRegression(recent6);

  const std = Math.sqrt(
    recent6.reduce((acc, v, _, arr) => {
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      return acc + Math.pow(v - mean, 2);
    }, 0) / recent6.length
  );

  const momentum = Math.max(-10, Math.min(10, slope * 10));

  let direction: "rising" | "falling" | "stable";
  if (slope > 0.3) direction = "rising";
  else if (slope < -0.3) direction = "falling";
  else direction = "stable";

  const predictedNext3m = Math.max(20, Math.min(80, last + slope * 3));
  const predictedNext6m = Math.max(20, Math.min(80, last + slope * 6));

  const confidence: "high" | "medium" | "low" =
    std < 1.5 ? "high" : std < 3 ? "medium" : "low";

  const keyFactors: string[] = [];
  if (shortTermTrend < -2) keyFactors.push("Short-term downward pressure");
  if (shortTermTrend > 2) keyFactors.push("Short-term positive momentum");
  if (longTermTrend < -5) keyFactors.push("Prolonged decline over 6 months");
  if (longTermTrend > 5) keyFactors.push("Sustained growth over 6 months");
  if (std > 3) keyFactors.push("High polling volatility");
  if (last < 40) keyFactors.push("Below historical average baseline");
  if (last > 50) keyFactors.push("Above majority approval threshold");
  if (Math.abs(slope) < 0.2) keyFactors.push("Stable polling plateau");

  return {
    direction,
    momentum,
    volatility: std,
    shortTermTrend,
    longTermTrend,
    predictedNext3m: Math.round(predictedNext3m * 10) / 10,
    predictedNext6m: Math.round(predictedNext6m * 10) / 10,
    confidence,
    keyFactors,
  };
}
