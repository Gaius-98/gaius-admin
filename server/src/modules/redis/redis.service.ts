import { Injectable } from '@nestjs/common';
import { RedisService as llRedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  redis: Redis | null;
  constructor(private llRedisSrv: llRedisService) {
    this.redis = this.llRedisSrv.getOrThrow();
  }
  /**
   * 设置redis缓存
   * @param key 键名
   * @param value 键值
   * @param milliseconds 过期时间,单位ms
   * @returns
   */
  async set(key: string, value: any, milliseconds?: number) {
    if (typeof value == 'object') {
      value = JSON.stringify(value);
    }
    return await this.redis.set(key, value, 'PX', milliseconds);
  }
  /**
   * 获取redis缓存
   * @param key 键名
   * @returns
   */
  async get(key: string) {
    return await this.redis.get(key);
  }
  /**
   * 移除redis缓存
   * @param keys 键名数组
   * @returns
   */
  async del(keys: string[]) {
    return await this.redis.del(keys);
  }
}
