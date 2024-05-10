import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /* @Post()
  create(@Body() createImageDto: CreateRecipeDto) {
    return this.imageService.create(createRecipeDto);
  } */

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const fileName = await this.imageService.save(image);
    return {
      assetName: fileName,
    };
  }
}
