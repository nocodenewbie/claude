export interface PollingPoint {
  date: string;
  approve: number;
  disapprove: number;
  president: string;
  term: number;
}

export interface PartyPoint {
  date: string;
  democratic: number;
  republican: number;
  democratic_unfav: number;
  republican_unfav: number;
}

export interface PoliticalEvent {
  date: string;
  event: string;
  impact: "positive" | "negative" | "neutral";
  party: "republican" | "democrat" | "both";
}

// Trump First Term approval ratings (monthly, Gallup/FiveThirtyEight averages)
export const trumpTerm1: PollingPoint[] = [
  { date: "2017-01", approve: 45, disapprove: 45, president: "Trump", term: 1 },
  { date: "2017-02", approve: 43, disapprove: 52, president: "Trump", term: 1 },
  { date: "2017-03", approve: 43, disapprove: 51, president: "Trump", term: 1 },
  { date: "2017-04", approve: 42, disapprove: 52, president: "Trump", term: 1 },
  { date: "2017-05", approve: 39, disapprove: 55, president: "Trump", term: 1 },
  { date: "2017-06", approve: 38, disapprove: 56, president: "Trump", term: 1 },
  { date: "2017-07", approve: 38, disapprove: 57, president: "Trump", term: 1 },
  { date: "2017-08", approve: 34, disapprove: 61, president: "Trump", term: 1 },
  { date: "2017-09", approve: 38, disapprove: 56, president: "Trump", term: 1 },
  { date: "2017-10", approve: 38, disapprove: 57, president: "Trump", term: 1 },
  { date: "2017-11", approve: 38, disapprove: 57, president: "Trump", term: 1 },
  { date: "2017-12", approve: 40, disapprove: 56, president: "Trump", term: 1 },
  { date: "2018-01", approve: 40, disapprove: 56, president: "Trump", term: 1 },
  { date: "2018-02", approve: 41, disapprove: 55, president: "Trump", term: 1 },
  { date: "2018-03", approve: 41, disapprove: 55, president: "Trump", term: 1 },
  { date: "2018-04", approve: 41, disapprove: 55, president: "Trump", term: 1 },
  { date: "2018-05", approve: 43, disapprove: 53, president: "Trump", term: 1 },
  { date: "2018-06", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2018-07", approve: 42, disapprove: 53, president: "Trump", term: 1 },
  { date: "2018-08", approve: 41, disapprove: 54, president: "Trump", term: 1 },
  { date: "2018-09", approve: 42, disapprove: 53, president: "Trump", term: 1 },
  { date: "2018-10", approve: 43, disapprove: 53, president: "Trump", term: 1 },
  { date: "2018-11", approve: 43, disapprove: 53, president: "Trump", term: 1 },
  { date: "2018-12", approve: 40, disapprove: 56, president: "Trump", term: 1 },
  { date: "2019-01", approve: 37, disapprove: 58, president: "Trump", term: 1 },
  { date: "2019-02", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2019-03", approve: 45, disapprove: 51, president: "Trump", term: 1 },
  { date: "2019-04", approve: 46, disapprove: 51, president: "Trump", term: 1 },
  { date: "2019-05", approve: 46, disapprove: 50, president: "Trump", term: 1 },
  { date: "2019-06", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2019-07", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2019-08", approve: 42, disapprove: 54, president: "Trump", term: 1 },
  { date: "2019-09", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2019-10", approve: 41, disapprove: 55, president: "Trump", term: 1 },
  { date: "2019-11", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2019-12", approve: 45, disapprove: 51, president: "Trump", term: 1 },
  { date: "2020-01", approve: 49, disapprove: 48, president: "Trump", term: 1 },
  { date: "2020-02", approve: 49, disapprove: 48, president: "Trump", term: 1 },
  { date: "2020-03", approve: 49, disapprove: 47, president: "Trump", term: 1 },
  { date: "2020-04", approve: 43, disapprove: 52, president: "Trump", term: 1 },
  { date: "2020-05", approve: 44, disapprove: 52, president: "Trump", term: 1 },
  { date: "2020-06", approve: 42, disapprove: 54, president: "Trump", term: 1 },
  { date: "2020-07", approve: 40, disapprove: 56, president: "Trump", term: 1 },
  { date: "2020-08", approve: 43, disapprove: 53, president: "Trump", term: 1 },
  { date: "2020-09", approve: 45, disapprove: 53, president: "Trump", term: 1 },
  { date: "2020-10", approve: 46, disapprove: 52, president: "Trump", term: 1 },
  { date: "2020-11", approve: 44, disapprove: 53, president: "Trump", term: 1 },
  { date: "2020-12", approve: 39, disapprove: 57, president: "Trump", term: 1 },
  { date: "2021-01", approve: 34, disapprove: 62, president: "Trump", term: 1 },
];

// Biden Term
export const bidenTerm: PollingPoint[] = [
  { date: "2021-02", approve: 57, disapprove: 37, president: "Biden", term: 1 },
  { date: "2021-03", approve: 54, disapprove: 40, president: "Biden", term: 1 },
  { date: "2021-04", approve: 57, disapprove: 39, president: "Biden", term: 1 },
  { date: "2021-05", approve: 54, disapprove: 40, president: "Biden", term: 1 },
  { date: "2021-06", approve: 56, disapprove: 40, president: "Biden", term: 1 },
  { date: "2021-07", approve: 50, disapprove: 45, president: "Biden", term: 1 },
  { date: "2021-08", approve: 43, disapprove: 51, president: "Biden", term: 1 },
  { date: "2021-09", approve: 43, disapprove: 52, president: "Biden", term: 1 },
  { date: "2021-10", approve: 42, disapprove: 53, president: "Biden", term: 1 },
  { date: "2021-11", approve: 42, disapprove: 52, president: "Biden", term: 1 },
  { date: "2021-12", approve: 43, disapprove: 52, president: "Biden", term: 1 },
  { date: "2022-01", approve: 40, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-02", approve: 41, disapprove: 54, president: "Biden", term: 1 },
  { date: "2022-03", approve: 40, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-04", approve: 41, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-05", approve: 41, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-06", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2022-07", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2022-08", approve: 44, disapprove: 52, president: "Biden", term: 1 },
  { date: "2022-09", approve: 44, disapprove: 52, president: "Biden", term: 1 },
  { date: "2022-10", approve: 40, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-11", approve: 40, disapprove: 55, president: "Biden", term: 1 },
  { date: "2022-12", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2023-01", approve: 41, disapprove: 55, president: "Biden", term: 1 },
  { date: "2023-02", approve: 43, disapprove: 53, president: "Biden", term: 1 },
  { date: "2023-03", approve: 43, disapprove: 53, president: "Biden", term: 1 },
  { date: "2023-04", approve: 41, disapprove: 55, president: "Biden", term: 1 },
  { date: "2023-05", approve: 44, disapprove: 52, president: "Biden", term: 1 },
  { date: "2023-06", approve: 41, disapprove: 55, president: "Biden", term: 1 },
  { date: "2023-07", approve: 40, disapprove: 56, president: "Biden", term: 1 },
  { date: "2023-08", approve: 40, disapprove: 56, president: "Biden", term: 1 },
  { date: "2023-09", approve: 40, disapprove: 56, president: "Biden", term: 1 },
  { date: "2023-10", approve: 37, disapprove: 58, president: "Biden", term: 1 },
  { date: "2023-11", approve: 37, disapprove: 58, president: "Biden", term: 1 },
  { date: "2023-12", approve: 39, disapprove: 56, president: "Biden", term: 1 },
  { date: "2024-01", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-02", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-03", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-04", approve: 37, disapprove: 58, president: "Biden", term: 1 },
  { date: "2024-05", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-06", approve: 36, disapprove: 59, president: "Biden", term: 1 },
  { date: "2024-07", approve: 36, disapprove: 59, president: "Biden", term: 1 },
  { date: "2024-08", approve: 37, disapprove: 58, president: "Biden", term: 1 },
  { date: "2024-09", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-10", approve: 38, disapprove: 57, president: "Biden", term: 1 },
  { date: "2024-11", approve: 39, disapprove: 56, president: "Biden", term: 1 },
  { date: "2024-12", approve: 40, disapprove: 56, president: "Biden", term: 1 },
];

// Trump Second Term (2025–present)
export const trumpTerm2: PollingPoint[] = [
  { date: "2025-01", approve: 47, disapprove: 47, president: "Trump", term: 2 },
  { date: "2025-02", approve: 46, disapprove: 48, president: "Trump", term: 2 },
  { date: "2025-03", approve: 44, disapprove: 50, president: "Trump", term: 2 },
  { date: "2025-04", approve: 43, disapprove: 51, president: "Trump", term: 2 },
  { date: "2025-05", approve: 42, disapprove: 52, president: "Trump", term: 2 },
  { date: "2025-06", approve: 41, disapprove: 53, president: "Trump", term: 2 },
  { date: "2025-07", approve: 42, disapprove: 53, president: "Trump", term: 2 },
  { date: "2025-08", approve: 40, disapprove: 54, president: "Trump", term: 2 },
  { date: "2025-09", approve: 40, disapprove: 54, president: "Trump", term: 2 },
  { date: "2025-10", approve: 41, disapprove: 54, president: "Trump", term: 2 },
  { date: "2025-11", approve: 39, disapprove: 55, president: "Trump", term: 2 },
  { date: "2025-12", approve: 40, disapprove: 55, president: "Trump", term: 2 },
  { date: "2026-01", approve: 41, disapprove: 54, president: "Trump", term: 2 },
  { date: "2026-02", approve: 40, disapprove: 55, president: "Trump", term: 2 },
  { date: "2026-03", approve: 38, disapprove: 57, president: "Trump", term: 2 },
  { date: "2026-04", approve: 39, disapprove: 56, president: "Trump", term: 2 },
];

// Party favorability data (monthly)
export const partyFavorability: PartyPoint[] = [
  { date: "2017-01", democratic: 44, republican: 42, democratic_unfav: 52, republican_unfav: 53 },
  { date: "2017-06", democratic: 40, republican: 38, democratic_unfav: 55, republican_unfav: 57 },
  { date: "2017-12", democratic: 42, republican: 37, democratic_unfav: 53, republican_unfav: 58 },
  { date: "2018-06", democratic: 44, republican: 39, democratic_unfav: 51, republican_unfav: 56 },
  { date: "2018-12", democratic: 45, republican: 40, democratic_unfav: 50, republican_unfav: 55 },
  { date: "2019-06", democratic: 43, republican: 40, democratic_unfav: 53, republican_unfav: 55 },
  { date: "2019-12", democratic: 44, republican: 42, democratic_unfav: 52, republican_unfav: 53 },
  { date: "2020-06", democratic: 47, republican: 42, democratic_unfav: 49, republican_unfav: 53 },
  { date: "2020-12", democratic: 47, republican: 43, democratic_unfav: 49, republican_unfav: 52 },
  { date: "2021-06", democratic: 48, republican: 43, democratic_unfav: 48, republican_unfav: 52 },
  { date: "2021-12", democratic: 45, republican: 42, democratic_unfav: 51, republican_unfav: 53 },
  { date: "2022-06", democratic: 41, republican: 40, democratic_unfav: 54, republican_unfav: 55 },
  { date: "2022-12", democratic: 42, republican: 41, democratic_unfav: 53, republican_unfav: 54 },
  { date: "2023-06", democratic: 41, republican: 41, democratic_unfav: 55, republican_unfav: 55 },
  { date: "2023-12", democratic: 40, republican: 42, democratic_unfav: 56, republican_unfav: 54 },
  { date: "2024-06", democratic: 39, republican: 43, democratic_unfav: 56, republican_unfav: 52 },
  { date: "2024-12", democratic: 37, republican: 45, democratic_unfav: 58, republican_unfav: 50 },
  { date: "2025-06", democratic: 36, republican: 43, democratic_unfav: 59, republican_unfav: 52 },
  { date: "2025-12", democratic: 38, republican: 41, democratic_unfav: 57, republican_unfav: 54 },
  { date: "2026-03", democratic: 40, republican: 40, democratic_unfav: 55, republican_unfav: 55 },
];

// Key political events
export const politicalEvents: PoliticalEvent[] = [
  { date: "2017-08", event: "Charlottesville rally & presidential response controversy", impact: "negative", party: "republican" },
  { date: "2017-12", event: "Tax Cuts and Jobs Act passed", impact: "positive", party: "republican" },
  { date: "2018-06", event: "Family separation policy at border", impact: "negative", party: "republican" },
  { date: "2019-01", event: "35-day government shutdown ends", impact: "negative", party: "republican" },
  { date: "2019-12", event: "First impeachment by House", impact: "negative", party: "republican" },
  { date: "2020-01", event: "First COVID-19 cases in US", impact: "neutral", party: "both" },
  { date: "2020-03", event: "COVID-19 national emergency declared", impact: "positive", party: "republican" },
  { date: "2020-06", event: "George Floyd protests nationwide", impact: "negative", party: "republican" },
  { date: "2021-01", event: "January 6th Capitol attack", impact: "negative", party: "republican" },
  { date: "2021-08", event: "US withdrawal from Afghanistan", impact: "negative", party: "democrat" },
  { date: "2022-03", event: "Russia invades Ukraine", impact: "neutral", party: "both" },
  { date: "2022-06", event: "Roe v. Wade overturned (Dobbs decision)", impact: "positive", party: "democrat" },
  { date: "2022-08", event: "Inflation Reduction Act signed", impact: "positive", party: "democrat" },
  { date: "2023-10", event: "Hamas attacks Israel, start of Gaza conflict", impact: "negative", party: "both" },
  { date: "2024-07", event: "Biden withdraws from 2024 race", impact: "negative", party: "democrat" },
  { date: "2024-11", event: "Trump wins 2024 election", impact: "positive", party: "republican" },
  { date: "2025-01", event: "Trump 2nd inauguration, executive orders blitz", impact: "positive", party: "republican" },
  { date: "2025-02", event: "DOGE federal workforce cuts begin", impact: "negative", party: "republican" },
  { date: "2025-03", event: "Mass tariffs announced globally", impact: "negative", party: "both" },
  { date: "2025-05", event: "Trade war escalation with China/EU", impact: "negative", party: "republican" },
  { date: "2025-09", event: "Immigration enforcement operations expand", impact: "neutral", party: "republican" },
  { date: "2026-01", event: "Midterm election cycle begins", impact: "neutral", party: "both" },
  { date: "2026-03", event: "Economic slowdown indicators emerge", impact: "negative", party: "republican" },
];

export function getAllApprovalData(): PollingPoint[] {
  return [...trumpTerm1, ...bidenTerm, ...trumpTerm2];
}

export function getLatestApproval(): PollingPoint {
  return trumpTerm2[trumpTerm2.length - 1];
}

export function getTermByLabel(label: string): PollingPoint[] {
  switch (label) {
    case "trump1": return trumpTerm1;
    case "biden": return bidenTerm;
    case "trump2": return trumpTerm2;
    default: return [];
  }
}
