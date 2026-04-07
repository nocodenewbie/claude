"use client";

import { useState, useMemo } from "react";
import ApprovalChart from "@/components/ApprovalChart";
import PartyChart from "@/components/PartyChart";
import TermCompareChart from "@/components/TermCompareChart";
import EventTimeline from "@/components/EventTimeline";
import PredictionPanel from "@/components/PredictionPanel";
import {
  trumpTerm1,
  trumpTerm2,
  bidenTerm,
  politicalEvents,
  getLatestApproval,
  partyFavorability,
  PollingPoint,
} from "@/lib/data";
import { generatePredictions, analyzeTrend } from "@/lib/predictions";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "comparison", label: "Term Comparison" },
  { id: "party", label: "Party Popularity" },
  { id: "prediction", label: "Forecast" },
];

const TERM_OPTIONS = [
  { id: "trump1", label: "Trump 1st (2017–2021)", color: "#ef4444" },
  { id: "biden", label: "Biden (2021–2025)", color: "#3b82f6" },
  { id: "trump2", label: "Trump 2nd (2025–now)", color: "#f97316" },
];

function getTermData(id: string): PollingPoint[] {
  if (id === "trump1") return trumpTerm1;
  if (id === "biden") return bidenTerm;
  if (id === "trump2") return trumpTerm2;
  return [];
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTerm, setSelectedTerm] = useState("trump2");
  const [showPredictions, setShowPredictions] = useState(false);
  const [compareTerms, setCompareTerms] = useState({
    trump1: true,
    biden: false,
    trump2: true,
  });

  const latest = getLatestApproval();
  const currentData = useMemo(() => getTermData(selectedTerm), [selectedTerm]);
  const predictions = useMemo(() => generatePredictions(currentData, 6), [currentData]);
  const trendAnalysis = useMemo(() => analyzeTrend(trumpTerm2), []);

  const partyLatest = partyFavorability[partyFavorability.length - 1];
  const demLead = partyLatest.democratic - partyLatest.republican;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              US Political Climate Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Polling data, approval ratings &amp; trend forecasting
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Last updated</div>
            <div className="text-sm font-medium text-gray-200">April 2026</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-700/30 rounded-2xl p-4">
            <div className="text-xs text-orange-300/70 font-medium uppercase tracking-wider mb-1">Trump Approval</div>
            <div className="text-3xl font-bold text-white">{latest.approve}%</div>
            <div className="text-sm text-red-400 mt-1">{latest.disapprove}% disapprove</div>
            <div className="text-xs text-gray-400 mt-2">2nd Term · Apr 2026</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 border border-gray-700/30 rounded-2xl p-4">
            <div className="text-xs text-gray-300/70 font-medium uppercase tracking-wider mb-1">Net Approval</div>
            <div className={`text-3xl font-bold ${latest.approve - latest.disapprove >= 0 ? "text-green-400" : "text-red-400"}`}>
              {latest.approve - latest.disapprove > 0 ? "+" : ""}
              {latest.approve - latest.disapprove}pp
            </div>
            <div className="text-xs text-gray-400 mt-2">Approve – Disapprove</div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl p-4">
            <div className="text-xs text-blue-300/70 font-medium uppercase tracking-wider mb-1">Democrats Favorable</div>
            <div className="text-3xl font-bold text-white">{partyLatest.democratic}%</div>
            <div className="text-sm text-red-400 mt-1">{partyLatest.democratic_unfav}% unfavorable</div>
            <div className="text-xs text-gray-400 mt-2">Party approval · {partyLatest.date}</div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-700/30 rounded-2xl p-4">
            <div className="text-xs text-red-300/70 font-medium uppercase tracking-wider mb-1">Republicans Favorable</div>
            <div className="text-3xl font-bold text-white">{partyLatest.republican}%</div>
            <div className="text-sm text-red-400 mt-1">{partyLatest.republican_unfav}% unfavorable</div>
            <div className="text-xs text-gray-400 mt-2">Party approval · {partyLatest.date}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <nav className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-semibold text-gray-100">Presidential Approval Rating</h2>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-sm text-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                  >
                    {TERM_OPTIONS.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPredictions}
                      onChange={(e) => setShowPredictions(e.target.checked)}
                      className="rounded"
                    />
                    Forecast
                  </label>
                </div>
              </div>
              <ApprovalChart
                data={currentData}
                predictions={predictions}
                showPredictions={showPredictions}
                selectedTerms={[selectedTerm]}
              />
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-100 mb-4">Key Political Events</h2>
              <EventTimeline events={politicalEvents} limit={8} />
            </div>
          </div>
        )}

        {/* Term Comparison Tab */}
        {activeTab === "comparison" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-semibold text-gray-100">Presidential Terms Side-by-Side</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  {TERM_OPTIONS.map((t) => (
                    <label key={t.id} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={compareTerms[t.id as keyof typeof compareTerms]}
                        onChange={(e) =>
                          setCompareTerms((prev) => ({ ...prev, [t.id]: e.target.checked }))
                        }
                        className="rounded"
                      />
                      <span style={{ color: t.color }}>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <TermCompareChart
                term1Data={trumpTerm1}
                term2Data={trumpTerm2}
                bidenData={bidenTerm}
                showTerm1={compareTerms.trump1}
                showTerm2={compareTerms.trump2}
                showBiden={compareTerms.biden}
              />
              <p className="text-xs text-gray-500 mt-3 text-center">
                X-axis shows months since inauguration — enables direct comparison across terms
              </p>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-100 mb-4">Term Statistics</h2>
              <div className="space-y-4">
                {[
                  { label: "Trump 1st Term", data: trumpTerm1, color: "#ef4444" },
                  { label: "Biden", data: bidenTerm, color: "#3b82f6" },
                  { label: "Trump 2nd Term", data: trumpTerm2, color: "#f97316" },
                ].map(({ label, data, color }) => {
                  const avg = Math.round(data.reduce((s, d) => s + d.approve, 0) / data.length * 10) / 10;
                  const max = Math.max(...data.map(d => d.approve));
                  const min = Math.min(...data.map(d => d.approve));
                  return (
                    <div key={label} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                        <span className="text-sm font-medium text-gray-200">{label}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{avg}%</div>
                          <div className="text-xs text-gray-400">Avg</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">{max}%</div>
                          <div className="text-xs text-gray-400">Peak</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-400">{min}%</div>
                          <div className="text-xs text-gray-400">Low</div>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${avg}%`, background: color, opacity: 0.8 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Party Tab */}
        {activeTab === "party" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-100 mb-4">Party Favorability Over Time</h2>
              <PartyChart />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Favorable and unfavorable ratings for Democratic and Republican parties (Gallup)
              </p>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-gray-100">Current Party Standing</h2>
              <div className="space-y-3">
                {[
                  { label: "Democrats Favorable", value: partyLatest.democratic, color: "bg-blue-500", textColor: "text-blue-400" },
                  { label: "Democrats Unfavorable", value: partyLatest.democratic_unfav, color: "bg-blue-800/60", textColor: "text-blue-300/60" },
                  { label: "Republicans Favorable", value: partyLatest.republican, color: "bg-red-500", textColor: "text-red-400" },
                  { label: "Republicans Unfavorable", value: partyLatest.republican_unfav, color: "bg-red-800/60", textColor: "text-red-300/60" },
                ].map(({ label, value, color, textColor }, i) => (
                  <div key={i}>
                    {i === 2 && <div className="border-t border-gray-700 my-1" />}
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`${textColor} font-medium`}>{label}</span>
                      <span className="text-white font-bold">{value}%</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={`rounded-xl p-3 border text-sm ${
                demLead > 0 ? "bg-blue-900/20 border-blue-700/30 text-blue-300"
                : demLead < 0 ? "bg-red-900/20 border-red-700/30 text-red-300"
                : "bg-gray-800/50 border-gray-700/30 text-gray-300"
              }`}>
                {demLead === 0 ? "Parties tied in favorability"
                  : demLead > 0 ? `Democrats lead by ${demLead}pp`
                  : `Republicans lead by ${Math.abs(demLead)}pp`}
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Historical Context</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Both parties have historically struggled to maintain favorable ratings above 50%.
                  The current period reflects growing political polarization with record-low favorability for both parties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Tab */}
        {activeTab === "prediction" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h2 className="font-semibold text-gray-100">Approval Trend &amp; Forecast</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Trump 2nd Term with 6-month projection</p>
                </div>
                <span className="text-xs text-purple-400 bg-purple-900/30 border border-purple-700/30 rounded-full px-3 py-1">
                  Statistical model active
                </span>
              </div>
              <ApprovalChart
                data={trumpTerm2}
                predictions={generatePredictions(trumpTerm2, 6)}
                showPredictions={true}
                selectedTerms={["trump2"]}
              />
              <div className="mt-4 bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-3">
                <p className="text-xs text-yellow-300/80">
                  <strong className="text-yellow-300">Disclaimer:</strong> Forecasts use linear regression on recent polling trends.
                  They do not account for unexpected political events or external shocks.
                  Data sourced from Gallup, Reuters/Ipsos, and FiveThirtyEight aggregates.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                <h2 className="font-semibold text-gray-100 mb-4">Trend Analysis</h2>
                <PredictionPanel analysis={trendAnalysis} latest={latest} />
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                <h2 className="font-semibold text-gray-100 mb-3">Recent Events (2025–2026)</h2>
                <EventTimeline
                  events={politicalEvents.filter(e => e.date >= "2025-01")}
                  limit={6}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-gray-500">
            Data sourced from Gallup, FiveThirtyEight, Reuters/Ipsos polls. Approval ratings are monthly averages.
            This dashboard is for informational and educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
