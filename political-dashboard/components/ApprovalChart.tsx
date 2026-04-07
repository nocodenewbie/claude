"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { PollingPoint } from "@/lib/data";
import { PredictionPoint } from "@/lib/predictions";

interface Props {
  data: PollingPoint[];
  predictions?: PredictionPoint[];
  showPredictions: boolean;
  selectedTerms: string[];
}

const TERM_COLORS: Record<string, { approve: string; disapprove: string }> = {
  trump1: { approve: "#ef4444", disapprove: "#94a3b8" },
  biden: { approve: "#3b82f6", disapprove: "#94a3b8" },
  trump2: { approve: "#f97316", disapprove: "#94a3b8" },
};

const TERM_LABELS: Record<string, string> = {
  trump1: "Trump 1st Term",
  biden: "Biden",
  trump2: "Trump 2nd Term",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm shadow-xl">
        <p className="text-gray-300 font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span style={{ color: p.color }} className="font-medium">
              {p.name}:
            </span>
            <span className="text-white">
              {typeof p.value === "number" ? `${p.value.toFixed(1)}%` : p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ApprovalChart({ data, predictions, showPredictions, selectedTerms }: Props) {
  // Combine data and predictions
  const combined = [
    ...data.map((d) => ({
      date: d.date,
      approve: d.approve,
      disapprove: d.disapprove,
      president: d.president,
      term: d.term,
    })),
    ...(showPredictions && predictions
      ? predictions.map((p) => ({
          date: p.date,
          approve: undefined,
          disapprove: undefined,
          predicted: p.predicted,
          lower: p.lower,
          upper: p.upper,
          president: "Forecast",
          term: 0,
        }))
      : []),
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={combined} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[25, 65]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "#d1d5db" }}
        />
        <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="6 3" label={{ value: "50%", fill: "#6b7280", fontSize: 11 }} />

        <Line
          type="monotone"
          dataKey="approve"
          name="Approval"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="disapprove"
          name="Disapproval"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />

        {showPredictions && predictions && (
          <>
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="#a78bfa"
              fillOpacity={0.15}
              name="Forecast Range"
              legendType="none"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#a78bfa"
              fillOpacity={0.0}
              legendType="none"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="Forecast"
              stroke="#a78bfa"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
            />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
