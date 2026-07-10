import {
  NO_STORE_CACHE_HEADERS,
  ONE_YEAR_CACHE_HEADERS,
} from "@/lib/cache-policy";
import { getCloudinaryImages } from "@/lib/cloudinary-image-cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await getCloudinaryImages();

    return NextResponse.json(images, {
      headers: ONE_YEAR_CACHE_HEADERS,
    });
  } catch (error) {
    console.error("Failed to fetch Cloudinary images:", error);

    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500, headers: NO_STORE_CACHE_HEADERS },
    );
  }
}
