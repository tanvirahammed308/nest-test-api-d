
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import type { UploadedImageFile } from '../cloudinary/uploaded-image.type.js';

import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // GET /api/products
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  // GET /api/products/:id
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOne(id);
  }

  // POST /api/products
  // Postman: Body -> form-data
  // image field type must be File
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: UploadedImageFile,
  ) {
    const imageUrl = file
      ? await this.cloudinaryService.uploadImage(file)
      : undefined;

    return this.productsService.create({
      ...createProductDto,
      ...(imageUrl && { image: imageUrl }),
    });
  }

  // PATCH /api/products/:id
  // Send form-data to update fields and optionally replace image
  @Patch(':id')
  
@Patch(':id')
@UseInterceptors(FileInterceptor('image'))
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto,
  @UploadedFile() file?: UploadedImageFile,
) {
  console.log('Received DTO:', updateProductDto);

  const imageUrl = file
    ? await this.cloudinaryService.uploadImage(file)
    : undefined;

  const updateData = {
    ...updateProductDto,
    ...(imageUrl && { image: imageUrl }),
  };

//   console.log('Update data:', updateData);
//   console.log('UPDATE ENDPOINT HIT');
// console.log('DTO:', updateProductDto);
// console.log('BODY:', updateProductDto);

  return this.productsService.update(id, updateData);
}


  // DELETE /api/products/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.remove(id);
  }
}
