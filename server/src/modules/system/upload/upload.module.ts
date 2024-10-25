import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Upload } from './entities/upload.entity';
@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: join(
              __dirname,
              '../../../../',
              configService.get('upload.file_path'),
            ),
            filename: (req, file, cb) => {
              const timestamp = new Date().getTime();
              return cb(null, `${timestamp}${extname(file.originalname)}`);
            },
          }),
        };
      },
    }),
    ConfigModule,
    TypeOrmModule.forFeature([Upload]),
  ],
})
export class UploadModule {}
