import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const images = await prisma.image.findMany();
  return {
    props: { images },
  };
}

const HomePage = ({ images }: { images: { id: number; url: string }[] }) => {
  return (
    <div>
      <h1>Image Gallery</h1>
      {images.map((image) => (
        <div key={image.id}>
          <Image src={image.url} alt="Uploaded Image" width={500} height={300} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;