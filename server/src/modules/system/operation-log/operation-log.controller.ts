import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OperationLogService } from './operation-log.service';
import {
  SearchOperationDto,
  UpdateOperationLogDto,
} from './dto/operation-log.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { ResListDto } from 'src/common/dto/pagination.dto';
@ApiTags('操作日志')
@Controller('operationlog')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '操作日志列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateOperationLogDto>,
  })
  @Permission('system:operation:list')
  @Get('list')
  findAll(@Query() params: SearchOperationDto) {
    return this.operationLogService.findAll(params);
  }
}
