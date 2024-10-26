import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configSrv = app.get(ConfigService);
  app.use(cookieParser());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('gaius-admin')
    .setDescription('gaius-admin service api')
    .setVersion('1.0')
    .addTag('gaius-admin')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);
  const port = configSrv.get('serve.port') || 3000;
  app.useStaticAssets(join(__dirname, '../', 'static'), {
    prefix: '/static',
  });

  await app.listen(port);

  console.log('--------服务运行成功---------');
  console.log(`运行端口号:${port}`);
}
bootstrap();
