"use client";

import { useState, useRef, useEffect } from "react";
import type { ReleaseNote, AppTag } from "@/lib/releaseNotes";
import "@/styles/index/release-feed.css";

interface ReleaseFeedProps {
  notes: ReleaseNote[];
  filter?: AppTag | "all";
}

const LOGO_MAP: Record<string, string> = {
  airsync: "/assets/img/project-logos/airsync-logo.svg",
  essentials: "/assets/img/project-logos/essentials-logo.svg",
  tasks: "/assets/img/project-logos/tasks-logo.svg.png",
};

export default function ReleaseFeed({ notes, filter = "all" }: ReleaseFeedProps) {
  const [selectedNote, setSelectedNote] = useState<ReleaseNote | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredNotes =
    filter === "all" ? notes : notes.filter((n) => n.app === filter);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (selectedNote) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [selectedNote]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 284;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openNote = (note: ReleaseNote) => {
    setSelectedNote(note);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeNote = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedNote(null);
    }, 300);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (filteredNotes.length === 0) return null;

  return (
    <>
      <div className="release-feed-wrapper">
        <div className="release-nav-btns">
          <button 
            className="release-nav-btn prev" 
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button 
            className="release-nav-btn next" 
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </div>

        <div className="release-feed-scroll no-scrollbar" ref={scrollRef}>
          {filteredNotes.map((note) => (
            <button
              key={note.slug}
              className="release-card item"
              onClick={() => openNote(note)}
              data-app={note.app}
            >
              <div className="release-card-body">
                {LOGO_MAP[note.app] && (
                  <img 
                    src={LOGO_MAP[note.app]} 
                    alt="" 
                    className="release-card-logo"
                  />
                )}
                <span className="release-app-tag">{note.app}</span>
                <h3 className="release-card-title">{note.title}</h3>
                <p className="release-card-desc">{note.description}</p>
                <span className="release-card-date">{formatDate(note.date)}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="release-feed-fade-right" />
      </div>

      {selectedNote && (
        <div
          className={`release-modal-backdrop ${isModalVisible ? "visible" : ""}`}
          onClick={(e) => e.target === e.currentTarget && closeNote()}
        >
          <div 
            className={`release-modal ${isModalVisible ? "visible" : ""}`}
            data-app={selectedNote.app}
          >
            <div className="release-modal-header">
              <div className="release-modal-brand">
                {LOGO_MAP[selectedNote.app] && (
                  <img 
                    src={LOGO_MAP[selectedNote.app]} 
                    alt={selectedNote.app} 
                    className="release-modal-logo"
                  />
                )}
                <span className="release-modal-app">{selectedNote.app}</span>
              </div>
              <button className="release-modal-close" onClick={closeNote}>
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>

            <h2 className="release-modal-title">{selectedNote.title}</h2>
            <span className="release-modal-date">{formatDate(selectedNote.date)}</span>

            {selectedNote.link && (
              <a 
                href={selectedNote.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="release-visit-btn"
              >
                Visit
                <span className="material-symbols-rounded">open_in_new</span>
              </a>
            )}
            
            <div
              className="release-modal-content release-prose"
              dangerouslySetInnerHTML={{ __html: selectedNote.contentHtml }}
            />
          </div>
        </div>
      )}
    </>
  );
}
