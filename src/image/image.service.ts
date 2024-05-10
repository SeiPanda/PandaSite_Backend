import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'node:fs/promises';

@Injectable()
export class ImageService {
  readonly imagePath: string = 'assets/images/';
  async save(image: Express.Multer.File): Promise<string> {
    const imageName = `${Date.now()}_${image.originalname}`;
    await writeFile(`${this.imagePath}${imageName}`, image.buffer, 'binary');
    return imageName;
  }

  async load(imageName: string): Promise<Buffer> {
    return await readFile(`${this.imagePath}${imageName}`);
  }
}
