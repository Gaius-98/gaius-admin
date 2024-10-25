import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleMenu } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, RoleMenu])],
  exports: [RoleService],
})
export class RoleModule {}
