import Image from "next/image";
import { getCloudinaryImages } from "@/lib/cloudinary-image-cache";

export const revalidate = 31_536_000;

export default async function ImagesPage() {
  const images = await getCloudinaryImages();

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id}>
          <Image
            src={image.url}
            alt="Uploaded Image"
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}
