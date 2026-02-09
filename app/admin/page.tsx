"use client";

import { useState } from "react";
import { FaCamera, FaBook, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

interface NotebookEntry {
  id: string;
  type: "photography" | "journal";
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
  date: string;
  tags?: string;
}

export default function AdminPage() {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NotebookEntry>>({
    type: "photography",
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing entry
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingId
            ? { ...entry, ...formData, id: editingId }
            : entry
        )
      );
      setEditingId(null);
    } else {
      // Add new entry
      const newEntry: NotebookEntry = {
        id: Date.now().toString(),
        type: formData.type || "photography",
        title: formData.title || "",
        description: formData.description,
        content: formData.content || "",
        imageUrl: formData.imageUrl,
        date: formData.date || new Date().toISOString().split("T")[0],
        tags: formData.tags,
      };
      setEntries((prev) => [newEntry, ...prev]);
    }

    // Reset form
    setFormData({
      type: "photography",
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
      tags: "",
    });
    setShowForm(false);
  };

  const handleEdit = (entry: NotebookEntry) => {
    setFormData(entry);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      type: "photography",
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
      tags: "",
    });
  };

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white w-full py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Notebook Admin Panel
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your photography and journal entries
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Add New Button */}
          <div className="mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
            >
              <FaPlus />
              Add New Entry
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? "Edit Entry" : "Add New Entry"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: "photography" })
                        }
                        className={`flex-1 py-3 rounded-lg border font-medium transition-all flex items-center justify-center gap-2 ${
                          formData.type === "photography"
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <FaCamera />
                        Photography
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: "journal" })
                        }
                        className={`flex-1 py-3 rounded-lg border font-medium transition-all flex items-center justify-center gap-2 ${
                          formData.type === "journal"
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <FaBook />
                        Journal
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Brief description"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Write your content here..."
                    />
                  </div>

                  {/* Image URL (for photography) */}
                  {formData.type === "photography" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="/path/to/image.jpg"
                      />
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="nature, travel, personal"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
                    >
                      {editingId ? "Update Entry" : "Add Entry"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Entries List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                All Entries ({entries.length})
              </h2>
            </div>

            {entries.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No entries yet. Add your first one!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {entry.type === "photography" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              <FaCamera size={10} />
                              Photography
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                              <FaBook size={10} />
                              Journal
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {entry.title}
                        </h3>

                        {entry.description && (
                          <p className="text-sm text-gray-600 mb-2">
                            {entry.description}
                          </p>
                        )}

                        <p className="text-gray-700 line-clamp-2 mb-2">
                          {entry.content}
                        </p>

                        {entry.tags && (
                          <p className="text-xs text-gray-500">
                            Tags: {entry.tags}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              📝 Instructions
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                • This is a client-side demo. Data will be lost on page refresh.
              </li>
              <li>
                • To persist data, integrate with a backend API or database.
              </li>
              <li>
                • For images, upload to your public folder or use a CDN service.
              </li>
              <li>
                • Update the data/notebook.ts file to sync with the notebook
                page.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
