"use client";

import { useState, useCallback, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Photo {
  key: string;
  name: string;
  displayName: string;
  url: string;
  tags: string[];
}

export default function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    Promise.all([
      fetch("/api/photos").then((r) => r.json()),
      fetch("/api/filters").then((r) => r.json()),
    ])
      .then(([photosData, filtersData]) => {
        setAllPhotos(photosData.photos || []);
        setFilters(filtersData.filters || []);
      })
      .catch(() => {});
  }, []);

  const filteredPhotos =
    activeFilter === "ALL"
      ? allPhotos
      : allPhotos.filter((p) =>
          p.tags.some((t) => t.toUpperCase() === activeFilter)
        );

  const openLightbox = (photo: Photo) => setSelectedPhoto(photo);
  const closeLightbox = () => setSelectedPhoto(null);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedPhoto) return;
      const idx = filteredPhotos.findIndex((p) => p.key === selectedPhoto.key);
      const nextIdx =
        direction === "next"
          ? (idx + 1) % filteredPhotos.length
          : (idx - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[nextIdx]);
    },
    [selectedPhoto, filteredPhotos]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto, navigateLightbox]);

  const hasFilters = filters.length > 0;

  return (
    <main style={{ background: "#fff", minHeight: "100vh", paddingTop: 72 }}>
      {/* Filters */}
      {hasFilters && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            padding: "20px 16px",
          }}
        >
          <button
            onClick={() => setActiveFilter("ALL")}
            style={{
              background: "none",
              border: "none",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              cursor: "pointer",
              paddingBottom: 4,
              borderBottom: activeFilter === "ALL" ? "1px solid #111" : "1px solid transparent",
              color: activeFilter === "ALL" ? "#111" : "#aaa",
              fontWeight: activeFilter === "ALL" ? 700 : 400,
            }}
          >
            ALL
          </button>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: "none",
                border: "none",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                paddingBottom: 4,
                borderBottom: activeFilter === f ? "1px solid #111" : "1px solid transparent",
                color: activeFilter === f ? "#111" : "#aaa",
                fontWeight: activeFilter === f ? 700 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Photo Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {filteredPhotos.map((photo) => (
          <div
            key={photo.key}
            onClick={() => openLightbox(photo)}
            style={{
              position: "relative",
              paddingBottom: "100%",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={photo.url}
              alt={photo.displayName}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div style={{ textAlign: "center", padding: "120px 0", color: "#aaa" }}>
          <p style={{ fontSize: 16 }}>
            {allPhotos.length === 0 ? "No photos yet." : "No photos match this filter."}
          </p>
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              color: "rgba(255,255,255,0.7)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 51,
            }}
          >
            <IoMdClose size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            style={{
              position: "absolute",
              left: 24,
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 51,
            }}
          >
            <FaChevronLeft size={24} />
          </button>

          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.displayName}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            style={{
              position: "absolute",
              right: 24,
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 51,
            }}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </main>
  );
}
