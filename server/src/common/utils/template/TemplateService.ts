import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs';

@Injectable()
export class TemplateService {
  async renderTemplateFromFile(filePath: string, data: any): Promise<string> {
    try {
      // 读取模板文件的内容
      const templateString = await fs.promises.readFile(filePath, 'utf-8');
      // 使用 EJS 渲染模板
      const renderedTemplate = ejs.render(templateString, data);

      return renderedTemplate;
    } catch (error) {
      throw new Error(`Error rendering template from file: ${error.message}`);
    }
  }
}
