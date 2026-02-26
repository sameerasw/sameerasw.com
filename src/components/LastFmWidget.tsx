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
    <div id="last" className={track ? "show" : ""}>
      <div id="music-holder" className="item">
        <a
          href="https://www.last.fm/user/s4m33r4"
          target="_blank"
          id="music"
          rel="noreferrer"
        >
          <img id="artwork" src={track?.artwork || "null"} alt="artwork" />
        </a>
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
        <img id="eq" src="/assets/img/eq.gif" alt="eq" />
      </div>
      <img
        className="history"
        src="https://lastfm-recently-played.vercel.app/api?user=s4m33r4&loved=true&header_size=none&footer_style=normal_stats&width=300&bg_color=00000088"
        alt="currently playing music from last.fm"
      />
    </div>
  );
}
