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

export default function GitHubChips() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <a
      href="https://github.com/sameerasw"
      className="github-chips-row"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub profile"
    >
      {/* Repos */}
      <span className="gh-chip" title={`${stats.repos} repositories`}>
        <span className="material-symbols-rounded gh-chip-icon">folder</span>
        <span className="gh-chip-value">{stats.repos}</span>
        <span className="gh-chip-label">Repos</span>
      </span>

      {/* Stars */}
      <span className="gh-chip" title={`${stats.stars} stars`}>
        <span className="material-symbols-rounded gh-chip-icon">star</span>
        <span className="gh-chip-value">{stats.stars}</span>
        <span className="gh-chip-label">Stars</span>
      </span>

      {/* Followers */}
      <span className="gh-chip" title={`${stats.followers} followers`}>
        <span className="material-symbols-rounded gh-chip-icon">group</span>
        <span className="gh-chip-value">{stats.followers}</span>
        <span className="gh-chip-label">Followers</span>
      </span>

      {/* Streak — expands on hover to show best */}
      {stats.graphqlOk && (
        <span className="gh-chip gh-chip-streak" title={`Best streak: ${stats.streak.longest} days`}>
          <span className="material-symbols-rounded gh-chip-icon">local_fire_department</span>
          <span className="gh-chip-streak-text">
            <span className="gh-streak-current">{stats.streak.current} day streak</span>
            <span className="gh-streak-best">Best: {stats.streak.longest}d</span>
          </span>
        </span>
      )}

      {/* Languages — a single chip that opens to show sub-chips */}
      {stats.topLanguages.length > 0 && (
        <span className="gh-chip gh-chip-langs">
          <span className="material-symbols-rounded gh-chip-icon">code</span>
          <span className="gh-langs-inner">
            {stats.topLanguages.map((lang) => (
              <span key={lang} className="gh-lang-tag">{lang}</span>
            ))}
          </span>
        </span>
      )}
    </a>
  );
}
