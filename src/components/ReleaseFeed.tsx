"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { ReleaseNote, AppTag } from "@/lib/releaseNotes";
import "@/styles/index/release-feed.css";

interface ReleaseFeedProps {
  notes: ReleaseNote[];
  filter?: AppTag | "all";
  hideGradient?: boolean;
}

const LOGO_MAP: Record<string, string> = {
  airsync: "/assets/img/project-logos/airsync-logo.svg",
  essentials: "/assets/img/project-logos/essentials-logo.svg",
  tasks: "/assets/img/project-logos/tasks-logo.svg.png",
  blog: "/assets/img/notion.png",
};

export default function ReleaseFeed({ 
  notes, 
  filter = "all", 
  hideGradient = false 
}: ReleaseFeedProps) {
  const [selectedNote, setSelectedNote] = useState<ReleaseNote | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalOrigin, setModalOrigin] = useState<{ x: string, y: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filteredNotes =
    filter === "all" ? notes : notes.filter((n) => n.app === filter);

  // Handle deep linking on mount
  useEffect(() => {
    const updateSlug = searchParams.get("update");
    if (updateSlug) {
      const note = notes.find((n) => n.slug === updateSlug);
      if (note) {
        setSelectedNote(note);
        setIsModalVisible(true);
        
        // Scroll to updates section if opened via deep link
        const updatesSection = document.getElementById("updates");
        if (updatesSection) {
          updatesSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []); // Only run on mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set(prev).add(index));
            }, (index % 10) * 100); // Stagger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".release-card-trigger");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredNotes]);

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

  const openNote = (note: ReleaseNote, e?: React.MouseEvent | React.FocusEvent) => {
    if (e) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setModalOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`
      });
    } else {
      setModalOrigin({ x: "50%", y: "50%" });
    }

    setSelectedNote(note);
    setTimeout(() => setIsModalVisible(true), 10);
    
    // Update URL without scrolling
    const params = new URLSearchParams(searchParams.toString());
    params.set("update", note.slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeNote = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedNote(null);
      
      // Remove update param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("update");
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
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
          {filteredNotes.map((note, index) => (
            <button
              key={note.slug}
              className={`release-card release-card-trigger ${visibleIndices.has(index) ? "revealed" : ""}`}
              onClick={(e) => openNote(note, e)}
              data-app={note.app}
              data-index={index}
            >
              <div className="release-card-body">
                {LOGO_MAP[note.app] && (
                  note.app === "essentials" ? (
                    <div className="release-card-logo essentials-mask" />
                  ) : (
                    <img 
                      src={LOGO_MAP[note.app]} 
                      alt="" 
                      className="release-card-logo"
                      style={note.app === "blog" ? { borderRadius: "50%", objectFit: "cover", backgroundColor: "var(--primary-color)" } : {}}
                    />
                  )
                )}
                <span className="release-app-tag">{note.app}</span>
                <h3 className="release-card-title">{note.title}</h3>
                <p className="release-card-desc">{note.description}</p>
                <span className="release-card-date">{formatDate(note.date)}</span>
              </div>
            </button>
          ))}
        </div>
        {!hideGradient && <div className="release-feed-fade-right" />}
      </div>

      {selectedNote && (
        <div
          className={`release-modal-backdrop ${isModalVisible ? "visible" : ""}`}
          onClick={(e) => e.target === e.currentTarget && closeNote()}
          style={{
            "--origin-x": modalOrigin?.x ?? "50%",
            "--origin-y": modalOrigin?.y ?? "50%",
          } as React.CSSProperties}
        >
          <div 
            className={`release-modal ${isModalVisible ? "visible" : ""}`}
            data-app={selectedNote.app}
          >
            <div className="release-modal-header">
              <div className="release-modal-brand">
                {LOGO_MAP[selectedNote.app] && (
                  selectedNote.app === "essentials" ? (
                    <div className="release-modal-logo essentials-mask" />
                  ) : (
                    <img 
                      src={LOGO_MAP[selectedNote.app]} 
                      alt={selectedNote.app} 
                      className="release-modal-logo"
                      style={selectedNote.app === "blog" ? { borderRadius: "50%", objectFit: "cover", backgroundColor: "var(--primary-color)" } : {}}
                    />
                  )
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
