import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {

  //grabando en file system 
  // const data = fs.readFileSync(file.filepath);
  // fs.writeFileSync(`./public/${file.originalFilename}`, data);
  // fs.unlinkSync(file.filepath);
  // return;

  //grabando en cloudinary
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  return secure_url;

}

const parseFiles = async (req: NextApiRequest): Promise<string> => {

  //Se manipula un archivo a la vez

  return new Promise((resolve, reject) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

      if (err) {
        return reject(err);
      }

      const filePath = await saveFile(files.file as formidable.File)
      resolve(filePath);
      //Se tiene la imagen
    })

  })
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const imageUrl = await parseFiles(req);

  return res.status(200).json({ message: imageUrl });
}
