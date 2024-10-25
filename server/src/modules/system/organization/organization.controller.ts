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
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Request } from 'express';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('org')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:org:add')
  @Post('add')
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Permission('system:org:list')
  @Get('list')
  findAll(@Query('keyword') keyword: string) {
    return this.organizationService.findAll(keyword);
  }

  @Permission('system:org:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.organizationService.findOne(+id);
  }
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:org:update')
  @Post('update')
  update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(updateOrganizationDto);
  }
  @Operation({
    module: '机构管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:org:remove')
  @Get('remove')
  remove(@Query('id') id: number) {
    return this.organizationService.remove(id);
  }

  @Get('orgTree')
  getOrgList(@Req() req: Request, @Query('keyword') keyword: string) {
    return this.organizationService.findAllByUser(req, keyword);
  }
}
