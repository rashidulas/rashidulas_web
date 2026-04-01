export interface Photo {
  id: string;
  src: string;
  alt: string;
  tags: string[];
}

export const photoTags = [
  "ALL",
] as const;

export type PhotoTag = (typeof photoTags)[number];

export const photos: Photo[] = [];
