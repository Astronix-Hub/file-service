import { FileModel } from '../models/file.model';

export class StorageUtils {
  static generateFileId(): string {
    // TODO 实现生成文件 ID 的逻辑
    return 'unique-file-id';
  }

  static validateFile(file: FileModel): boolean {
    // TODO 实现文件验证逻辑，例如文件大小、类型等
    return file.filename.endsWith('.txt');
  }
}
