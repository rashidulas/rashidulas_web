import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";
import { getPhotos, savePhotos, deletePhoto, upsertPhoto, type PhotoMeta } from "@/lib/db";

const utapi = new UTApi();

export async function GET() {
  try {
    // Get metadata from Redis
    const dbPhotos = await getPhotos();

    // Get files from UploadThing
    const { files } = await utapi.listFiles();
    const uploaded = files.filter((f) => f.status === "Uploaded");

    // Merge: use DB metadata if exists, otherwise create entry from UploadThing
    const dbMap = new Map(dbPhotos.map((p) => [p.key, p]));
    const merged: PhotoMeta[] = uploaded.map((f) => {
      const existing = dbMap.get(f.key);
      if (existing) return existing;
      return {
        key: f.key,
        name: f.name,
        displayName: f.name,
        url: `https://utfs.io/f/${f.key}`,
        tags: [],
      };
    });

    // Sync DB with current UploadThing state
    const utKeys = new Set(uploaded.map((f) => f.key));
    const cleaned = merged.filter((p) => utKeys.has(p.key));
    await savePhotos(cleaned);

    return NextResponse.json({ photos: cleaned });
  } catch (error) {
    console.error("Failed to list photos:", error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const photo: PhotoMeta = await req.json();
    await upsertPhoto(photo);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update photo:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { keys } = await req.json();
    await utapi.deleteFiles(keys);
    for (const key of keys) {
      await deletePhoto(key);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
