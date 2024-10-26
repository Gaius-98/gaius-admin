import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrgTreeDto,
} from './dto/organization.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Request } from 'express';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { ResListDto } from 'src/common/dto/pagination.dto';
@ApiTags('机构管理')
@Controller('org')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建机构' })
  @ApiBody({ type: CreateOrganizationDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:org:add')
  @Post('add')
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '机构列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateOrganizationDto>,
  })
  @Permission('system:org:list')
  @Get('list')
  findAll(@Query('keyword') keyword: string) {
    return this.organizationService.findAll(keyword);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '机构详情' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: UpdateOrganizationDto,
  })
  @Permission('system:org:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.organizationService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑机构' })
  @ApiBody({ type: UpdateOrganizationDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:org:update')
  @Post('update')
  update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(updateOrganizationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除机构' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:org:remove')
  @Get('remove')
  remove(@Query('id') id: number) {
    return this.organizationService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '根据用户权限获取对应的机构' })
  @ApiResponse({
    status: 200,
    type: OrgTreeDto,
    isArray: true,
  })
  @Get('orgTree')
  getOrgList(@Req() req: Request, @Query('keyword') keyword: string) {
    return this.organizationService.findAllByUser(req, keyword);
  }
}
