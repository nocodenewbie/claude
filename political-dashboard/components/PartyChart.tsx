"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { partyFavorability } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm shadow-xl">
        <p className="text-gray-300 font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span style={{ color: p.color }} className="font-medium">{p.name}:</span>
            <span className="text-white">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PartyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={partyFavorability} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[30, 55]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "#d1d5db" }} />
        <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="6 3" />

        <Line
          type="monotone"
          dataKey="democratic"
          name="Democrats Favorable"
          stroke="#3b82f6"
          strokeWidth={2.5}
          dot={{ fill: "#3b82f6", r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="republican"
          name="Republicans Favorable"
          stroke="#ef4444"
          strokeWidth={2.5}
          dot={{ fill: "#ef4444", r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="democratic_unfav"
          name="Democrats Unfavorable"
          stroke="#93c5fd"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="republican_unfav"
          name="Republicans Unfavorable"
          stroke="#fca5a5"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
