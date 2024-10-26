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
import {
  CreateUploadDto,
  UpdateUploadDto,
  SearchUploadDto,
} from './dto/upload.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { ResListDto } from 'src/common/dto/pagination.dto';
@ApiTags('资源管理')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传图片' })
  @ApiResponse({ status: 200, description: '图片上传成功' })
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

  @ApiBearerAuth()
  @ApiOperation({ summary: '资源列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateUploadDto>,
  })
  @Permission('system:resource:list')
  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.uploadService.findAll(params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除资源' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
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
