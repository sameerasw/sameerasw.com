"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface PhotoItem {
  id: string;
  title: string;
  description?: string;
  blurUrl?: string;
  url: string;
  url_full: string;
  unsplashUrl: string;
  downloadLocation?: string;
  likes: number;
  createdAt?: string;
  location?: string | null;
  width?: number;
  height?: number;
  color?: string | null;
}

export interface WallpaperData {
  id: string;
  url: string;
  url_full?: string;
  link: string;
  author?: {
    name: string;
    username: string;
    link: string;
  };
  updatedAt?: string;
  themeColors?: {
    light: string;
    dark: string;
  };
  mobile?: {
    id: string;
    url: string;
    url_full?: string;
    link: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

interface PhotographyCarouselProps {
  wallpaperData: WallpaperData | null;
  photos: PhotoItem[];
}

function PhotoCardItem({
  photo,
  onOpen,
}: {
  photo: PhotoItem;
  onOpen: (photo: PhotoItem, e: React.MouseEvent) => void;
}) {
  return (
    <div className="photo-slide-container">
      <button
        type="button"
        className="photo-capture-card item"
        onClick={(e) => onOpen(photo, e)}
        aria-label={photo.title || "Capture by Sameera"}
        style={{
          backgroundColor: photo.color || "var(--background-color-secondary)",
        }}
      >
        <img
          className="photo-capture-img"
          src={photo.url}
          alt={photo.title || "Capture by Sameera"}
          loading="lazy"
        />
        <div className="photo-capture-overlay" />

        <div className="photo-capture-content">
          {(photo.location || photo.likes > 0) && (
            <div className="photo-capture-meta">
              {photo.location && (
                <span className="photo-card-info-item">
                  <span className="material-symbols-rounded">location_on</span>
                  {photo.location}
                </span>
              )}
              {photo.likes > 0 && (
                <span className="photo-card-info-item">
                  <span className="material-symbols-rounded">favorite</span>
                  {photo.likes}
                </span>
              )}
            </div>
          )}

          <span className="photo-capture-title">
            {photo.title !== "Photography by Sameera" ? photo.title : "Recent capture"}
          </span>
        </div>
      </button>
    </div>
  );
}

export default function PhotographyCarousel({
  wallpaperData,
  photos = [],
}: PhotographyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalOrigin, setModalOrigin] = useState<{ x: string; y: string } | null>(null);

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getOptimizedUrl = (url: string, width: number, quality: number) => {
    if (!url) return "";
    return url
      .replace(/&w=\d+/, `&w=${width}`)
      .replace(/&q=\d+/, `&q=${quality}`);
  };

  const openPhoto = (photo: PhotoItem, e?: React.MouseEvent) => {
    const idx = photos.findIndex((p) => p.id === photo.id);
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      setModalOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
    } else {
      setModalOrigin({ x: "50%", y: "50%" });
    }
    setSelectedPhotoIndex(idx !== -1 ? idx : 0);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 10);
  };

  const closePhoto = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedPhotoIndex(null);
      setModalOrigin(null);
    }, 300);
  };

  const navigatePhoto = useCallback((direction: "prev" | "next", e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null || photos.length <= 1) return;
    if (direction === "prev") {
      setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
    } else {
      setSelectedPhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
    }
  }, [selectedPhotoIndex, photos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") closePhoto();
      if (e.key === "ArrowLeft") navigatePhoto("prev");
      if (e.key === "ArrowRight") navigatePhoto("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, navigatePhoto]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (selectedPhoto) {
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
  }, [selectedPhoto]);

  if (!wallpaperData && (!photos || photos.length === 0)) {
    return null;
  }

  return (
    <>
      <section id="photography" style={{ width: "100%", margin: "6rem 0 4rem 0" }}>
        <div className="photo-carousel-wrapper">
          {/* Navigation Buttons for Desktop */}
          <div className="photo-nav-btns">
            <button
              className="photo-nav-btn prev"
              onClick={() => scroll("left")}
              aria-label="Previous"
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
            <button
              className="photo-nav-btn next"
              onClick={() => scroll("right")}
              aria-label="Next"
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          </div>

          <div className="photo-carousel-scroll" ref={scrollRef}>
            {/* Slide 1: Today's wallpaper pick (Exact original structure) */}
            {wallpaperData && (
              <div id="highlights" className="photo-slide-container">
                <div className="wallpaper-card item">
                  <div className="wallpaper-card-preview">
                    <img
                      src={getOptimizedUrl(wallpaperData.url, 400, 75)}
                      alt="Today's wallpaper preview"
                      loading="lazy"
                    />
                  </div>
                  <div className="wallpaper-card-header">
                    <span className="material-symbols-rounded">image</span>
                    <span>Today's my wallpaper pick</span>
                  </div>
                  <p className="wallpaper-card-credits">
                    Photo by{" "}
                    <a
                      href={wallpaperData.author?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {wallpaperData.author?.name}
                    </a>{" "}
                    on{" "}
                    <a
                      href={wallpaperData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unsplash
                    </a>
                  </p>
                </div>

                <a
                  id="download-wallpaper"
                  className="highlight-item item"
                  href={wallpaperData.url_full || wallpaperData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: "1.5rem" }}
                  >
                    download
                  </span>
                  <div className="highlight-content">
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "normal",
                        padding: 0,
                      }}
                    >
                      Download
                    </h3>
                  </div>
                </a>

                <a
                  id="wallpaper-source"
                  className="highlight-item item"
                  href={wallpaperData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: "1.5rem" }}
                  >
                    open_in_new
                  </span>
                  <div className="highlight-content">
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "normal",
                        padding: 0,
                      }}
                    >
                      Unsplash
                    </h3>
                  </div>
                </a>

                <a
                  id="wallpaper-collection"
                  className="highlight-item item"
                  href="https://unsplash.com/collections/LqO9knU9z2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: "1.5rem" }}
                  >
                    photo_library
                  </span>
                  <div className="highlight-content">
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "normal",
                        padding: 0,
                      }}
                    >
                      Visit my collection
                    </h3>
                  </div>
                </a>
              </div>
            )}

            {/* Slides 2+: Full-image capture cards */}
            {photos.map((photo) => (
              <PhotoCardItem
                key={photo.id}
                photo={photo}
                onOpen={openPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Modal with dynamic aspect ratio and photo navigation */}
      {selectedPhoto && (
        <div
          className={`photo-modal-backdrop ${isModalVisible ? "visible" : ""}`}
          onClick={(e) => e.target === e.currentTarget && closePhoto()}
          style={{
            "--origin-x": modalOrigin?.x ?? "50%",
            "--origin-y": modalOrigin?.y ?? "50%",
          } as React.CSSProperties}
        >
          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              className="photo-modal-nav-btn prev"
              onClick={(e) => navigatePhoto("prev", e)}
              aria-label="Previous photo"
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
          )}

          <div
            className={`photo-modal ${isModalVisible ? "visible" : ""}`}
            style={{
              aspectRatio:
                selectedPhoto.width && selectedPhoto.height
                  ? `${selectedPhoto.width} / ${selectedPhoto.height}`
                  : "16 / 10",
              backgroundColor: selectedPhoto.color || "var(--background-color-secondary)",
            }}
          >
            <img
              key={selectedPhoto.id}
              src={selectedPhoto.url_full || selectedPhoto.url}
              alt={selectedPhoto.title}
              className="photo-modal-bg"
            />
            <div className="photo-modal-overlay" />

            {/* Top Close Button */}
            <div className="photo-modal-header">
              <button
                className="photo-modal-close"
                onClick={closePhoto}
                aria-label="Close"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>

            {/* Bottom Footer: Left-aligned title + Row below with View button and info chips */}
            <div className="photo-modal-footer">
              <h2 className="photo-modal-title">{selectedPhoto.title}</h2>

              <div className="photo-modal-actions-row">
                <a
                  href={selectedPhoto.unsplashUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-modal-view-btn"
                  onClick={() => {
                    if (selectedPhoto.downloadLocation) {
                      fetch(selectedPhoto.downloadLocation).catch(() => {});
                    }
                  }}
                >
                  View
                  <span className="material-symbols-rounded">open_in_new</span>
                </a>

                {selectedPhoto.location && (
                  <span className="photo-modal-info-chip">
                    <span className="material-symbols-rounded">location_on</span>
                    {selectedPhoto.location}
                  </span>
                )}

                {selectedPhoto.likes > 0 && (
                  <span className="photo-modal-info-chip">
                    <span className="material-symbols-rounded">favorite</span>
                    {selectedPhoto.likes}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              className="photo-modal-nav-btn next"
              onClick={(e) => navigatePhoto("next", e)}
              aria-label="Next photo"
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
