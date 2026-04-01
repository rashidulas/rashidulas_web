"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  FaTrash,
  FaCheck,
  FaSync,
  FaTimes,
  FaPlus,
  FaSave,
  FaUpload,
} from "react-icons/fa";

interface PhotoMeta {
  key: string;
  name: string;
  displayName: string;
  url: string;
  tags: string[];
}

export default function AdminU215() {
  const [photos, setPhotos] = useState<PhotoMeta[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const [nameInputs, setNameInputs] = useState<Record<string, string>>({});
  const [newFilter, setNewFilter] = useState("");
  const [filterSaving, setFilterSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"photos" | "filters" | "upload">("photos");
  const [statusMsg, setStatusMsg] = useState("");

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [photosRes, filtersRes] = await Promise.all([
        fetch("/api/photos"),
        fetch("/api/filters"),
      ]);
      const photosData = await photosRes.json();
      const filtersData = await filtersRes.json();
      setPhotos(photosData.photos || []);
      setFilters(filtersData.filters || []);

      const names: Record<string, string> = {};
      (photosData.photos || []).forEach((p: PhotoMeta) => {
        names[p.key] = p.displayName;
      });
      setNameInputs(names);
    } catch {
      showStatus("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const savePhoto = async (photo: PhotoMeta) => {
    setSaving(photo.key);
    try {
      await fetch("/api/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photo),
      });
      showStatus(`Saved "${photo.displayName}"`);
    } catch {
      showStatus("Failed to save");
    } finally {
      setSaving(null);
    }
  };

  const handleRename = async (key: string) => {
    const photo = photos.find((p) => p.key === key);
    if (!photo) return;
    const updated = { ...photo, displayName: nameInputs[key] || photo.displayName };
    setPhotos((prev) => prev.map((p) => (p.key === key ? updated : p)));
    await savePhoto(updated);
  };

  const handleAddTag = async (key: string) => {
    const tag = (tagInputs[key] || "").trim().toLowerCase();
    if (!tag) return;
    const photo = photos.find((p) => p.key === key);
    if (!photo || photo.tags.includes(tag)) return;
    const updated = { ...photo, tags: [...photo.tags, tag] };
    setPhotos((prev) => prev.map((p) => (p.key === key ? updated : p)));
    setTagInputs((prev) => ({ ...prev, [key]: "" }));
    await savePhoto(updated);
  };

  const handleRemoveTag = async (key: string, tag: string) => {
    const photo = photos.find((p) => p.key === key);
    if (!photo) return;
    const updated = { ...photo, tags: photo.tags.filter((t) => t !== tag) };
    setPhotos((prev) => prev.map((p) => (p.key === key ? updated : p)));
    await savePhoto(updated);
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Delete this photo permanently?")) return;
    try {
      await fetch("/api/photos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: [key] }),
      });
      setPhotos((prev) => prev.filter((p) => p.key !== key));
      showStatus("Photo deleted");
    } catch {
      showStatus("Failed to delete");
    }
  };

  const handleAddFilter = () => {
    const f = newFilter.trim().toUpperCase();
    if (!f || filters.includes(f)) return;
    setFilters((prev) => [...prev, f]);
    setNewFilter("");
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleSaveFilters = async () => {
    setFilterSaving(true);
    try {
      await fetch("/api/filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      });
      showStatus("Filters saved");
    } catch {
      showStatus("Failed to save filters");
    } finally {
      setFilterSaving(false);
    }
  };

  return (
    <main style={{ background: "#f5f5f5", minHeight: "100vh", paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: "#111", color: "#fff", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Admin Panel
          </h1>
          <p style={{ color: "#999", fontSize: 14 }}>
            Manage photos, tags, and filters
          </p>
        </div>
      </div>

      {/* Status Bar */}
      {statusMsg && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 24,
            background: "#111",
            color: "#4ade80",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            zIndex: 100,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {statusMsg}
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 72, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}>
          {(["photos", "filters", "upload"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              style={{
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                background: "none",
                border: "none",
                borderBottom: activeSection === tab ? "2px solid #111" : "2px solid transparent",
                color: activeSection === tab ? "#111" : "#999",
                cursor: "pointer",
              }}
            >
              {tab === "upload" && <FaUpload style={{ marginRight: 6, verticalAlign: "middle" }} />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* ====== PHOTOS TAB ====== */}
        {activeSection === "photos" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>
                Photos ({photos.length})
              </h2>
              <button
                onClick={fetchData}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                <FaSync size={10} style={loading ? { animation: "spin 1s linear infinite" } : {}} />
                Refresh
              </button>
            </div>

            {loading ? (
              <p style={{ color: "#999", textAlign: "center", padding: 60 }}>Loading...</p>
            ) : photos.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 12, padding: 60, textAlign: "center", color: "#999" }}>
                <p>No photos. Go to Upload tab to add some.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {photos.map((photo) => (
                  <div
                    key={photo.key}
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      padding: 16,
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Preview */}
                    <img
                      src={photo.url}
                      alt={photo.displayName}
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Original name */}
                      <p style={{ fontSize: 11, color: "#111", marginBottom: 4 }}>
                        {photo.name}
                      </p>

                      {/* Display Name */}
                      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
                        <input
                          type="text"
                          value={nameInputs[photo.key] || ""}
                          onChange={(e) =>
                            setNameInputs((prev) => ({ ...prev, [photo.key]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(photo.key);
                          }}
                          style={{
                            flex: 1,
                            padding: "6px 10px",
                            border: "1px solid #ddd",
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#111",
                          }}
                          placeholder="Display name"
                        />
                        <button
                          onClick={() => handleRename(photo.key)}
                          disabled={saving === photo.key}
                          style={{
                            padding: "6px 12px",
                            background: "#111",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {saving === photo.key ? <FaSync size={10} /> : <FaSave size={10} />}
                          Save
                        </button>
                      </div>

                      {/* Tags */}
                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                          {photo.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                background: "#111",
                                color: "#fff",
                                fontSize: 11,
                                padding: "4px 10px",
                                borderRadius: 20,
                              }}
                            >
                              {tag}
                              <button
                                onClick={() => handleRemoveTag(photo.key, tag)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "rgba(255,255,255,0.6)",
                                  cursor: "pointer",
                                  padding: 0,
                                  fontSize: 14,
                                  lineHeight: 1,
                                }}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <input
                            type="text"
                            value={tagInputs[photo.key] || ""}
                            onChange={(e) =>
                              setTagInputs((prev) => ({ ...prev, [photo.key]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTag(photo.key);
                              }
                            }}
                            placeholder="Add tag..."
                            style={{
                              flex: 1,
                              padding: "5px 10px",
                              border: "1px solid #ddd",
                              borderRadius: 6,
                              fontSize: 12,
                              color: "#111",
                            }}
                          />
                          <button
                            onClick={() => handleAddTag(photo.key)}
                            style={{
                              padding: "5px 12px",
                              background: "#eee",
                              border: "none",
                              borderRadius: 6,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(photo.key)}
                      style={{
                        padding: 8,
                        background: "none",
                        border: "1px solid #eee",
                        borderRadius: 6,
                        color: "#999",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      title="Delete photo"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ====== FILTERS TAB ====== */}
        {activeSection === "filters" && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>
              Photography Page Filters
            </h2>
            <p style={{ color: "#999", fontSize: 13, marginBottom: 24 }}>
              These filters appear on the photography page. Visitors can click them to filter photos by tag.
            </p>

            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              {/* Current Filters */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {filters.length === 0 ? (
                  <p style={{ color: "#aaa", fontSize: 13 }}>No filters yet. Add some below.</p>
                ) : (
                  filters.map((f) => (
                    <span
                      key={f}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#111",
                        color: "#fff",
                        fontSize: 12,
                        padding: "8px 16px",
                        borderRadius: 24,
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {f}
                      <button
                        onClick={() => handleRemoveFilter(f)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.5)",
                          cursor: "pointer",
                          padding: 0,
                          fontSize: 16,
                        }}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Add Filter */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <input
                  type="text"
                  value={newFilter}
                  onChange={(e) => setNewFilter(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFilter();
                    }
                  }}
                  placeholder="e.g. NATURE, PORTRAIT, STREET..."
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#111",
                  }}
                />
                <button
                  onClick={handleAddFilter}
                  style={{
                    padding: "10px 20px",
                    background: "#eee",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Add
                </button>
              </div>

              {/* Save */}
              <button
                onClick={handleSaveFilters}
                disabled={filterSaving}
                style={{
                  padding: "12px 28px",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {filterSaving ? <FaSync size={12} /> : <FaCheck size={12} />}
                Save Filters
              </button>
            </div>

            {/* All Used Tags */}
            <div style={{ marginTop: 24, background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#111" }}>
                All Tags In Use
              </h3>
              <p style={{ color: "#999", fontSize: 12, marginBottom: 12 }}>
                Tags currently assigned to photos. Click to add as a filter.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Array.from(new Set(photos.flatMap((p) => p.tags))).map((tag) => {
                  const isFilter = filters.includes(tag.toUpperCase());
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        if (!isFilter) {
                          const f = tag.toUpperCase();
                          setFilters((prev) => [...prev, f]);
                        }
                      }}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 20,
                        fontSize: 12,
                        border: isFilter ? "2px solid #111" : "1px solid #ddd",
                        background: isFilter ? "#111" : "#fff",
                        color: isFilter ? "#fff" : "#666",
                        cursor: isFilter ? "default" : "pointer",
                        fontWeight: isFilter ? 600 : 400,
                      }}
                    >
                      {tag} {isFilter && <FaCheck size={8} style={{ marginLeft: 4 }} />}
                    </button>
                  );
                })}
                {photos.flatMap((p) => p.tags).length === 0 && (
                  <p style={{ color: "#aaa", fontSize: 12 }}>No tags assigned to any photos yet.</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* ====== UPLOAD TAB ====== */}
        {activeSection === "upload" && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 20 }}>
              Upload Photos
            </h2>
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <UploadDropzone
                endpoint="photoUploader"
                onClientUploadComplete={(res) => {
                  if (res) {
                    const newPhotos: PhotoMeta[] = res.map((f) => ({
                      key: f.key,
                      name: f.name,
                      displayName: f.name,
                      url: `https://utfs.io/f/${f.key}`,
                      tags: [],
                    }));
                    setPhotos((prev) => [...newPhotos, ...prev]);
                    newPhotos.forEach((p) => {
                      setNameInputs((prev) => ({ ...prev, [p.key]: p.displayName }));
                      fetch("/api/photos", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(p),
                      });
                    });
                    showStatus(`${res.length} photo(s) uploaded`);
                    setActiveSection("photos");
                  }
                }}
                onUploadError={(error: Error) => {
                  showStatus(`Upload failed: ${error.message}`);
                }}
                className="ut-button:bg-black ut-button:hover:bg-gray-800 ut-label:text-gray-700 ut-allowed-content:text-gray-500 border-2 border-dashed border-gray-300 rounded-xl"
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
