import { Injectable } from '@nestjs/common';
import * as prettier from 'prettier';

@Injectable()
export class FormatService {
  async formatCode(code: string, opt?: any) {
    try {
      // 使用 Prettier 格式化字符串
      const text = await prettier.format(code, {
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        parser: 'vue', // 可根据需要指定解析器
        ...opt,
      });
      return text;
    } catch (error) {
      console.error('Error formatting code:', error);
      return code; // 格式化失败时返回原始字符串
    }
  }
}
