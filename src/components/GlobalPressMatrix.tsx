import React, { useState } from 'react';
import { Globe2, Search, ExternalLink, ShieldCheck, Newspaper, Clock, BookOpen, ArrowUpRight } from 'lucide-react';

interface GlobalPressMatrixProps {
  onSelectQueryForVerification: (query: string, country: string) => void;
}

interface CountryPressArchive {
  country: string;
  region: string;
  flag: string;
  majorNewspapers: {
    name: string;
    type: 'State Wire' | 'National Newspaper' | 'Independent Investigative' | 'Financial & Diplomatic';
    foundedYear: string;
    circulationLanguage: string;
    archiveUrl: string;
    factCheckDivision?: string;
  }[];
  recentSampleChecks: {
    claim: string;
    verdict: 'DEBUNKED' | 'CONFIRMED' | 'FABRICATED';
    pressNote: string;
  }[];
}

const GLOBAL_PRESS_DATA: CountryPressArchive[] = [
  {
    country: 'China',
    region: 'East Asia',
    flag: '🇨🇳',
    majorNewspapers: [
      {
        name: 'Xinhua News Agency',
        type: 'State Wire',
        foundedYear: '1931',
        circulationLanguage: 'Chinese, English, French, Spanish, Russian',
        archiveUrl: 'http://www.xinhuanet.com/english/',
        factCheckDivision: 'State Council Diplomatic Wire',
      },
      {
        name: 'People’s Daily (Renmin Ribao)',
        type: 'National Newspaper',
        foundedYear: '1948',
        circulationLanguage: 'Chinese, English',
        archiveUrl: 'http://en.people.cn/',
      },
      {
        name: 'South China Morning Post (SCMP)',
        type: 'Independent Investigative',
        foundedYear: '1903',
        circulationLanguage: 'English',
        archiveUrl: 'https://www.scmp.com/',
        factCheckDivision: 'SCMP Fact Check Desk',
      },
      {
        name: 'Global Times',
        type: 'National Newspaper',
        foundedYear: '1993',
        circulationLanguage: 'Chinese, English',
        archiveUrl: 'https://www.globaltimes.cn/',
      },
    ],
    recentSampleChecks: [
      {
        claim: 'China and Europe declare World War 3 over shipping corridors',
        verdict: 'FABRICATED',
        pressNote: 'Zero coverage across Xinhua or Ministry of National Defense briefings; regular trade talks ongoing.',
      },
      {
        claim: 'China expands green energy supergrid capacity across central provinces',
        verdict: 'CONFIRMED',
        pressNote: 'Corroborated by National Energy Administration release and State Grid official bulletins.',
      },
    ],
  },
  {
    country: 'United Kingdom & Europe',
    region: 'European Union / UK',
    flag: '🇪🇺',
    majorNewspapers: [
      {
        name: 'Reuters World Wire',
        type: 'State Wire',
        foundedYear: '1851',
        circulationLanguage: 'Global / Multilingual',
        archiveUrl: 'https://www.reuters.com/fact-check',
        factCheckDivision: 'Reuters Fact Check Wire',
      },
      {
        name: 'BBC News',
        type: 'National Newspaper',
        foundedYear: '1922',
        circulationLanguage: 'English, Arabic, Russian, Persian',
        archiveUrl: 'https://www.bbc.com/news/reality_check',
        factCheckDivision: 'BBC Verify',
      },
      {
        name: 'Le Monde (France)',
        type: 'National Newspaper',
        foundedYear: '1944',
        circulationLanguage: 'French, English',
        archiveUrl: 'https://www.lemonde.fr/les-decodeurs/',
        factCheckDivision: 'Les Décodeurs',
      },
      {
        name: 'Der Spiegel (Germany)',
        type: 'Independent Investigative',
        foundedYear: '1947',
        circulationLanguage: 'German, English',
        archiveUrl: 'https://www.spiegel.de/international/',
      },
    ],
    recentSampleChecks: [
      {
        claim: 'European Commission mobilizes combat brigades against Beijing',
        verdict: 'DEBUNKED',
        pressNote: 'Refuted by EU External Action Service (EEAS) and BBC Verify; no emergency military session held.',
      },
      {
        claim: 'European Parliament passes artificial intelligence safety regulation',
        verdict: 'CONFIRMED',
        pressNote: 'Official EU Journal publication, confirmed across Le Monde, BBC, and Reuters.',
      },
    ],
  },
  {
    country: 'United States',
    region: 'Americas',
    flag: '🇺🇸',
    majorNewspapers: [
      {
        name: 'Associated Press (AP)',
        type: 'State Wire',
        foundedYear: '1846',
        circulationLanguage: 'English, Spanish',
        archiveUrl: 'https://apnews.com/hub/ap-fact-check',
        factCheckDivision: 'AP Fact Check',
      },
      {
        name: 'The New York Times',
        type: 'National Newspaper',
        foundedYear: '1851',
        circulationLanguage: 'English, Spanish, Chinese',
        archiveUrl: 'https://www.nytimes.com/',
      },
      {
        name: 'The Washington Post',
        type: 'Independent Investigative',
        foundedYear: '1877',
        circulationLanguage: 'English',
        archiveUrl: 'https://www.washingtonpost.com/news/fact-checker/',
        factCheckDivision: 'The Fact Checker (Glenn Kessler)',
      },
      {
        name: 'The Wall Street Journal',
        type: 'Financial & Diplomatic',
        foundedYear: '1889',
        circulationLanguage: 'English',
        archiveUrl: 'https://www.wsj.com/',
      },
    ],
    recentSampleChecks: [
      {
        claim: 'Federal Reserve orders immediate indefinite bank holiday shutdown',
        verdict: 'FABRICATED',
        pressNote: 'Federal Reserve and FDIC confirm standard clearing house operations; viral TikTok video debunked by AP.',
      },
    ],
  },
  {
    country: 'India',
    region: 'South Asia',
    flag: '🇮🇳',
    majorNewspapers: [
      {
        name: 'The Hindu',
        type: 'National Newspaper',
        foundedYear: '1878',
        circulationLanguage: 'English',
        archiveUrl: 'https://www.thehindu.com/',
      },
      {
        name: 'Press Trust of India (PTI)',
        type: 'State Wire',
        foundedYear: '1947',
        circulationLanguage: 'English, Hindi',
        archiveUrl: 'https://www.ptinews.com/fact-check',
        factCheckDivision: 'PTI Fact Check',
      },
      {
        name: 'The Indian Express',
        type: 'Independent Investigative',
        foundedYear: '1932',
        circulationLanguage: 'English',
        archiveUrl: 'https://indianexpress.com/',
      },
    ],
    recentSampleChecks: [
      {
        claim: 'Indian space agency ISRO confirms contact with extraterrestrial signal',
        verdict: 'FABRICATED',
        pressNote: 'Debunked by PTI Fact Check; ISRO confirmed deep-space telemetry test with Chandrayaan orbiter.',
      },
    ],
  },
  {
    country: 'Japan',
    region: 'East Asia',
    flag: '🇯🇵',
    majorNewspapers: [
      {
        name: 'Kyodo News',
        type: 'State Wire',
        foundedYear: '1945',
        circulationLanguage: 'Japanese, English, Chinese',
        archiveUrl: 'https://english.kyodonews.net/',
      },
      {
        name: 'The Japan Times',
        type: 'National Newspaper',
        foundedYear: '1897',
        circulationLanguage: 'English',
        archiveUrl: 'https://www.japantimes.co.jp/',
      },
      {
        name: 'Nikkei Asia',
        type: 'Financial & Diplomatic',
        foundedYear: '1876',
        circulationLanguage: 'English, Japanese',
        archiveUrl: 'https://asia.nikkei.com/',
      },
    ],
    recentSampleChecks: [
      {
        claim: 'Mount Fuji seismic alert triggers mandatory Tokyo evacuation',
        verdict: 'FABRICATED',
        pressNote: 'Japan Meteorological Agency (JMA) confirms normal volcanic status; video identified as CGI simulator.',
      },
    ],
  },
];

export const GlobalPressMatrix: React.FC<GlobalPressMatrixProps> = ({
  onSelectQueryForVerification,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPress = GLOBAL_PRESS_DATA.filter((item) => {
    const matchesCountry = selectedCountry === 'All' || item.country.includes(selectedCountry);
    const matchesSearch =
      searchFilter === '' ||
      item.country.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.majorNewspapers.some((n) => n.name.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs mb-2">
          <BookOpen className="w-4 h-4" />
          <span>GLOBAL ACCREDITED NEWSPAPER & WIRE ARCHIVE INDEX</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-100">
          Cross-Examine Media Across Any Nation & Era
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Access verifiable newspaper archives, wire bureaus, and fact-checking divisions across every sovereign jurisdiction. When sensational claims trend on Instagram or TikTok, our engine queries these verified primary news records to prove truth or expose hoaxes.
        </p>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search newspapers (e.g. Xinhua, BBC, Le Monde, Reuters, SCMP)..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800 overflow-x-auto">
            {['All', 'China', 'Europe', 'United States', 'India', 'Japan'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedCountry(region)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCountry === region
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Country Press Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPress.map((item) => (
          <div
            key={item.country}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{item.flag}</span>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-100">
                    {item.country}
                  </h3>
                  <span className="font-mono text-[11px] text-slate-400">
                    {item.region} · Official News Records
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                {item.majorNewspapers.length} Wire Bureaus
              </span>
            </div>

            {/* List of Newspapers */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Primary Accredited Outlets & Fact-Checking Desks:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {item.majorNewspapers.map((np, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{np.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                          Est. {np.foundedYear}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {np.type} · Languages: {np.circulationLanguage}
                      </div>
                      {np.factCheckDivision && (
                        <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Dedicated Division: {np.factCheckDivision}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={np.archiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-sky-300 hover:bg-slate-800 border border-slate-800 transition-colors shrink-0"
                      title="Visit Archive"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Cross-Checks in This Jurisdiction */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Notable Cross-Check Cases in {item.country}:
              </span>
              <div className="space-y-2">
                {item.recentSampleChecks.map((sc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-200 line-clamp-1">
                        "{sc.claim}"
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ml-2 ${
                        sc.verdict === 'FABRICATED' || sc.verdict === 'DEBUNKED'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {sc.verdict}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {sc.pressNote}
                    </p>
                    <button
                      onClick={() => onSelectQueryForVerification(sc.claim, item.country)}
                      className="text-[11px] font-mono text-sky-400 hover:underline flex items-center gap-1 pt-1"
                    >
                      <span>Investigate in TRACE Terminal</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
