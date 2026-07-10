import cloudinary from "@/lib/cloudinary";
import { unstable_cache } from "next/cache";

const ONE_YEAR_IN_SECONDS = 31_536_000;
const CACHE_VERSION =
  process.env.CACHE_VERSION ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "v1";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
};

type CloudinarySearchResult = {
  resources?: CloudinaryResource[];
};

export const getCloudinaryImages = unstable_cache(
  async () => {
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
