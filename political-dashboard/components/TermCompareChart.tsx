"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { PollingPoint } from "@/lib/data";

interface Props {
  term1Data: PollingPoint[];
  term2Data: PollingPoint[];
  bidenData: PollingPoint[];
  showTerm1: boolean;
  showTerm2: boolean;
  showBiden: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm shadow-xl">
        <p className="text-gray-300 font-semibold mb-2">Month {Number(label) + 1}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span style={{ color: p.color }} className="font-medium">{p.name}:</span>
            <span className="text-white">{p.value?.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function normalizeToMonths(data: PollingPoint[]) {
  return data.map((d, i) => ({ month: i, approve: d.approve }));
}

export default function TermCompareChart({
  term1Data,
  term2Data,
  bidenData,
  showTerm1,
  showTerm2,
  showBiden,
}: Props) {
  const t1 = normalizeToMonths(term1Data);
  const t2 = normalizeToMonths(term2Data);
  const bi = normalizeToMonths(bidenData);

  const maxLen = Math.max(
    showTerm1 ? t1.length : 0,
    showTerm2 ? t2.length : 0,
    showBiden ? bi.length : 0
  );

  const combined = Array.from({ length: maxLen }, (_, i) => ({
    month: i,
    trump1: showTerm1 && i < t1.length ? t1[i].approve : undefined,
    trump2: showTerm2 && i < t2.length ? t2[i].approve : undefined,
    biden: showBiden && i < bi.length ? bi[i].approve : undefined,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={combined} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="month"
          tickFormatter={(v) => `M${v + 1}`}
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
          interval={5}
          label={{ value: "Months in Term", position: "insideBottom", offset: -5, fill: "#6b7280", fontSize: 12 }}
        />
        <YAxis
          domain={[25, 65]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "#d1d5db" }} />
        <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="6 3" />

        {showTerm1 && (
          <Line
            type="monotone"
            dataKey="trump1"
            name="Trump 1st Term"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
        )}
        {showBiden && (
          <Line
            type="monotone"
            dataKey="biden"
            name="Biden"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
        )}
        {showTerm2 && (
          <Line
            type="monotone"
            dataKey="trump2"
            name="Trump 2nd Term"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={false}
            connectNulls
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
