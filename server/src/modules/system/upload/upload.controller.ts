import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import PaginationDto from 'src/common/dto/pagination.dto';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
import { Permission } from 'src/common/decorator/permission/permission.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Operation({
    module: '资源管理',
    action: OptTypeEnum.UPLOAD,
  })
  @Permission('system:resource:upload')
  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.uploadService.create(file);
  }
  @Permission('system:resource:list')
  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.uploadService.findAll(params);
  }
  @Permission('system:resource:remove')
  @Operation({
    module: '资源管理',
    action: OptTypeEnum.DELETE,
  })
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.uploadService.remove(id);
  }
}
