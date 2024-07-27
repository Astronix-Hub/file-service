import { FileModel } from '../models/file.model';

export class StorageService {
  static async getFileUrl(id: string): Promise<string | null> {
    // TODO 实现从存储服务获取文件 URL 的逻辑
    return `https://example.com/${id}`;
  }

  static async uploadFile(file: FileModel): Promise<string> {
    // TODO 实现将文件上传到存储服务的逻辑
    return `https://example.com/${file.id}`;
  }
}
