import cloudinary from "@/lib/cloudinary";
import { unstable_cache } from "next/cache";

const ONE_YEAR_IN_SECONDS = 31_536_000;
const CACHE_VERSION =
  process.env.CACHE_VERSION ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "v1";
const HAS_CLOUDINARY_CONFIG = Boolean(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY &&
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
);

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
};

type CloudinarySearchResult = {
  resources?: CloudinaryResource[];
};

export const getCloudinaryImages = unstable_cache(
  async () => {
    if (!HAS_CLOUDINARY_CONFIG) {
      return [];
    }

    const result = (await cloudinary.search
      .expression("folder:your_folder_name")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()) as CloudinarySearchResult;

    return (result.resources ?? []).map((resource) => ({
      id: resource.public_id,
      url: resource.secure_url,
    }));
  },
  ["cloudinary-images", CACHE_VERSION],
  {
    revalidate: ONE_YEAR_IN_SECONDS,
    tags: ["cloudinary-images"],
  },
);
