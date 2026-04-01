import { getDb } from "./mongodb";

export interface PhotoMeta {
  key: string;
  name: string;
  displayName: string;
  url: string;
  tags: string[];
}

export async function getPhotos(): Promise<PhotoMeta[]> {
  const db = await getDb();
  const docs = await db.collection("photos").find({}).toArray();
  return docs.map((d) => ({
    key: d.key as string,
    name: d.name as string,
    displayName: d.displayName as string,
    url: d.url as string,
    tags: (d.tags as string[]) || [],
  }));
}

export async function upsertPhoto(photo: PhotoMeta): Promise<void> {
  const db = await getDb();
  await db.collection("photos").updateOne(
    { key: photo.key },
    { $set: photo },
    { upsert: true }
  );
}

export async function savePhotos(photos: PhotoMeta[]): Promise<void> {
  const db = await getDb();
  const col = db.collection("photos");
  await col.deleteMany({});
  if (photos.length > 0) {
    await col.insertMany(photos);
  }
}

export async function deletePhoto(key: string): Promise<void> {
  const db = await getDb();
  await db.collection("photos").deleteOne({ key });
}

export async function getFilters(): Promise<string[]> {
  const db = await getDb();
  const doc = await db.collection("settings").findOne({ key: "filters" });
  return (doc?.values as string[]) || [];
}

export async function saveFilters(filters: string[]): Promise<void> {
  const db = await getDb();
  await db.collection("settings").updateOne(
    { key: "filters" },
    { $set: { key: "filters", values: filters } },
    { upsert: true }
  );
}
