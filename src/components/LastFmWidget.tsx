"use client";

import { useEffect, useState } from "react";

export default function LastFmWidget() {
  const [track, setTrack] = useState<{
    name: string;
    artist: string;
    album: string;
    artwork: string;
  } | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await fetch(
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=s4m33r4&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json",
        );
        const data = await res.json();
        const firstTrack = data?.recenttracks?.track?.[0];
        if (firstTrack) {
          setTrack({
            name: firstTrack.name,
            artist: firstTrack.artist["#text"],
            album: firstTrack.album["#text"],
            artwork: firstTrack.image[1]["#text"],
          });
        }
      } catch (err) {
        console.error("Last.fm fetch error", err);
      }
    };

    const timer = setTimeout(fetchMusic, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
        <a
          href="https://www.last.fm/user/s4m33r4"
          target="_blank"
          id="music"
          rel="noreferrer"
          data-title="Visit last.fm"
        >
    <div id="last" className={track ? "show" : ""}>
      <div id="music-holder" className="item">
          <img id="artwork" src={track?.artwork || "null"} alt="artwork" />
        <div id="track">
          {track && (
            <>
              <p>
                <strong>{track.name}</strong>
              </p>
              <p>{track.artist}</p>
              <p>{track.album}</p>
            </>
          )}
        </div>
        <div id="playback-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
        </a>
  );
}
