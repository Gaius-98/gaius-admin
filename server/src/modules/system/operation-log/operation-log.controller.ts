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
import { SearchOperationDto } from './dto/create-operation-log.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
@Controller('operationlog')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}
  @Permission('system:operation:list')
  @Get('list')
  findAll(@Query() params: SearchOperationDto) {
    return this.operationLogService.findAll(params);
  }
}
