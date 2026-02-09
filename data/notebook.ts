export interface NotebookEntry {
  id: string;
  type: "photography" | "journal";
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
  date: string;
  tags?: string;
}

export const notebookEntries: NotebookEntry[] = [
  // Sample photography entry
  {
    id: "1",
    type: "photography",
    title: "Sunset at the Beach",
    description: "A beautiful evening by the ocean",
    content: "Captured this stunning sunset during my evening walk.",
    imageUrl: "/project/acm.png",
    date: "2024-01-15",
    tags: "nature, sunset, beach",
  },
  // Sample journal entry
  {
    id: "2",
    type: "journal",
    title: "Reflections on 2024",
    description: "Looking back at the year",
    content:
      "This year has been filled with incredible learning experiences. I've grown both professionally and personally...",
    date: "2024-01-10",
    tags: "personal, reflection",
  },
];
