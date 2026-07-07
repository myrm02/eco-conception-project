import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../cloudinary';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:your_folder_name') // Remplacez 'your_folder_name' par le nom de votre dossier Cloudinary
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = resources.map((resource: any) => {
      return {
        id: resource.public_id,
        url: resource.secure_url,
      };
    });

    res.status(200).json(images);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
