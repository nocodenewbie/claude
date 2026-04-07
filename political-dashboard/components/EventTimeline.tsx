"use client";

import { PoliticalEvent } from "@/lib/data";

interface Props {
  events: PoliticalEvent[];
  limit?: number;
}

const impactColors = {
  positive: "border-green-500 bg-green-500/10 text-green-400",
  negative: "border-red-500 bg-red-500/10 text-red-400",
  neutral: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
};

const partyColors = {
  republican: "text-red-400",
  democrat: "text-blue-400",
  both: "text-purple-400",
};

const impactLabel = {
  positive: "↑ Positive",
  negative: "↓ Negative",
  neutral: "→ Neutral",
};

export default function EventTimeline({ events, limit = 8 }: Props) {
  const displayed = events.slice(-limit).reverse();

  return (
    <div className="space-y-2">
      {displayed.map((event, i) => (
        <div
          key={i}
          className={`border-l-2 pl-3 py-2 rounded-r ${impactColors[event.impact]}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-gray-400">{event.date}</span>
            <span className={`text-xs font-medium ${partyColors[event.party]}`}>
              {event.party === "both" ? "Both parties" : event.party.charAt(0).toUpperCase() + event.party.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-200 mt-0.5 leading-snug">{event.event}</p>
          <span className="text-xs mt-0.5 inline-block opacity-70">{impactLabel[event.impact]}</span>
        </div>
      ))}
    </div>
  );
}
