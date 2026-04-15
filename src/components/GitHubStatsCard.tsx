"use client";

import { useEffect, useState } from "react";

interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  topLanguages: string[];
  streak: {
    current: number;
    longest: number;
    totalThisYear: number;
  };
  graphqlOk: boolean;
}

function StatBlock({
  value,
  label,
  icon,
}: {
  value: number | string;
  label: string;
  icon: string;
}) {
  return (
    <div className="github-stat">
      <span className="github-stat-icon material-symbols-rounded">{icon}</span>
      <span className="github-stat-value">{value}</span>
      <span className="github-stat-label">{label}</span>
    </div>
  );
}

export default function GitHubStatsCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then(setStats)
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <a
      href="https://github.com/sameerasw"
      className="github-window item"
      aria-label="Sameera's GitHub stats"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Browser chrome */}
      <div className="github-window-bar">
        <div className="github-window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="github-window-url">
          <i className="fa-brands fa-github" />
          github.com/sameerasw
        </div>
      </div>

      {/* Content */}
      <div className="github-window-body">
        {stats ? (
          <>
            {/* Core stats */}
            <div className="github-stats-row">
              <StatBlock value={stats.repos} label="Repos" icon="folder" />
              <StatBlock value={stats.stars} label="Stars" icon="star" />
              <StatBlock value={stats.followers} label="Followers" icon="group" />
            </div>

            {/* Streak row */}
            {stats.graphqlOk && (
              <div className="github-stats-row">
                <StatBlock
                  value={`${stats.streak.current}d`}
                  label="Streak"
                  icon="local_fire_department"
                />
                <StatBlock
                  value={`${stats.streak.longest}d`}
                  label="Best"
                  icon="emoji_events"
                />
                <StatBlock
                  value={stats.streak.totalThisYear}
                  label="This Year"
                  icon="calendar_month"
                />
              </div>
            )}

            {/* Languages */}
            {stats.topLanguages.length > 0 && (
              <div className="github-langs">
                {stats.topLanguages.map((lang) => (
                  <span key={lang} className="github-lang-chip">
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="github-skeleton">
            <div className="github-skeleton-bar" />
            <div className="github-skeleton-bar" />
            <div className="github-skeleton-bar short" />
          </div>
        )}
      </div>
    </a>
  );
}
