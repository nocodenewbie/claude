"use client";

import { TrendAnalysis } from "@/lib/predictions";
import { PollingPoint } from "@/lib/data";

interface Props {
  analysis: TrendAnalysis;
  latest: PollingPoint;
}

const directionIcon = {
  rising: "↑",
  falling: "↓",
  stable: "→",
};

const directionColor = {
  rising: "text-green-400",
  falling: "text-red-400",
  stable: "text-yellow-400",
};

const confidenceColor = {
  high: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function PredictionPanel({ analysis, latest }: Props) {
  const momentumPct = ((analysis.momentum + 10) / 20) * 100;

  return (
    <div className="space-y-4">
      {/* Current status */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/50">
          <div className="text-2xl font-bold text-white">{latest.approve}%</div>
          <div className="text-xs text-gray-400 mt-1">Approval</div>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/50">
          <div className={`text-2xl font-bold ${directionColor[analysis.direction]}`}>
            {directionIcon[analysis.direction]}
          </div>
          <div className="text-xs text-gray-400 mt-1 capitalize">{analysis.direction}</div>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/50">
          <div className={`text-xs font-semibold px-2 py-1 rounded border ${confidenceColor[analysis.confidence]}`}>
            {analysis.confidence.toUpperCase()}
          </div>
          <div className="text-xs text-gray-400 mt-1">Confidence</div>
        </div>
      </div>

      {/* Forecasts */}
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-purple-300 mb-3">Approval Forecast</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400">+3 Months</div>
            <div className="text-xl font-bold text-white">{analysis.predictedNext3m}%</div>
            <div className={`text-xs ${analysis.predictedNext3m > latest.approve ? "text-green-400" : "text-red-400"}`}>
              {analysis.predictedNext3m > latest.approve ? "+" : ""}
              {(analysis.predictedNext3m - latest.approve).toFixed(1)}pp
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">+6 Months</div>
            <div className="text-xl font-bold text-white">{analysis.predictedNext6m}%</div>
            <div className={`text-xs ${analysis.predictedNext6m > latest.approve ? "text-green-400" : "text-red-400"}`}>
              {analysis.predictedNext6m > latest.approve ? "+" : ""}
              {(analysis.predictedNext6m - latest.approve).toFixed(1)}pp
            </div>
          </div>
        </div>
      </div>

      {/* Momentum bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Bearish</span>
          <span>Momentum: {analysis.momentum.toFixed(1)}</span>
          <span>Bullish</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${momentumPct}%`,
              background:
                analysis.momentum > 0
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #ef4444, #b91c1c)",
            }}
          />
        </div>
      </div>

      {/* Short/Long trends */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
          <div className="text-xs text-gray-400 mb-1">3-Month Change</div>
          <div className={`font-semibold ${analysis.shortTermTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {analysis.shortTermTrend > 0 ? "+" : ""}{analysis.shortTermTrend.toFixed(1)}pp
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
          <div className="text-xs text-gray-400 mb-1">6-Month Change</div>
          <div className={`font-semibold ${analysis.longTermTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {analysis.longTermTrend > 0 ? "+" : ""}{analysis.longTermTrend.toFixed(1)}pp
          </div>
        </div>
      </div>

      {/* Key factors */}
      {analysis.keyFactors.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Key Factors</h4>
          <ul className="space-y-1">
            {analysis.keyFactors.map((f, i) => (
              <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                <span className="text-purple-400 mt-0.5">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-500 italic border-t border-gray-700/50 pt-3">
        Forecast based on linear regression of recent polling trends. Subject to political events and external shocks. Not a guarantee of future results.
      </p>
    </div>
  );
}
