import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
// import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configSrv = app.get(ConfigService);
  app.use(cookieParser());
  const port = configSrv.get('serve.port') || 3000;
  app.useStaticAssets(join(__dirname, '../', 'static'), {
    prefix: '/static',
  });

  await app.listen(port);

  console.log('--------服务运行成功---------');
  console.log(`运行端口号:${port}`);
}
bootstrap();
