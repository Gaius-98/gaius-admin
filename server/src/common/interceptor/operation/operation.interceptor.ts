import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthEnum } from 'src/common/enum';
import { Reflector } from '@nestjs/core';
import { getIp } from 'src/common/utils/utils';
import { Request } from 'express';
import { OperationType } from 'src/common/decorator/operation/operation.decorator';
import { geoLocationService } from 'src/common/utils/geoip/geoLocation.service';
import { OperationLogService } from 'src/modules/system/operation-log/operation-log.service';
@Injectable()
export class OperationInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private locationSrv: geoLocationService,
    private OptLogSrv: OperationLogService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    const operation = this.reflector.get<OperationType>('operation', handler);
    if (operation) {
      const ip = getIp(request);
      const location = this.locationSrv.getLocationByIp(ip);
      const { method, originalUrl } = request;
      let username = 'anonymous';
      if (request[AuthEnum.AUTH_REQUEST_USER_KEY]) {
        username = request[AuthEnum.AUTH_REQUEST_USER_KEY]?.user.username;
      }

      const moduleName = context.getClass().name;
      const funcName = context.getHandler().name;
      const startTime = Date.now();
      const { module: optModule, action: optType } = operation;
      const getParams = (req: Request) => {
        const { params, query, body } = req;
        return Object.keys(params).length
          ? params
          : Object.keys(query).length
            ? query
            : body;
      };
      const logEntry = {
        username,
        ip,
        location,
        reqType: method,
        reqUrl: originalUrl,
        reqParam: JSON.stringify(getParams(request)),
        moduleName,
        funcName,
        optModule,
        optType,
        resStatus: '1',
        resTime: '0s',
        res: '',
        errMsg: '',
      };
      return next.handle().pipe(
        tap((data) => {
          const endTime = Date.now();
          const duration = endTime - startTime; // 响应时间
          const resStatus = '1';
          logEntry.res = typeof data === 'string' ? data : JSON.stringify(data);
          logEntry.resStatus = resStatus;
          logEntry.resTime = duration + 'ms';
          this.OptLogSrv.create(logEntry);
        }),
        catchError((error) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          const resStatus = '0';
          logEntry.errMsg = error.toString();
          logEntry.resStatus = resStatus;
          logEntry.resTime = duration + 'ms';
          this.OptLogSrv.create(logEntry);
          return throwError(error);
        }),
      );
    } else {
      return next.handle();
    }
  }
}
