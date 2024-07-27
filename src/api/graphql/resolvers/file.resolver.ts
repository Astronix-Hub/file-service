import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import { nanoid } from 'nanoid';
import path from 'path';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { FileService } from '../../../domain/services/file.service';

const SUPPORT_FILE_EXTENSION = [
  '.xlsx',
  '.xls',
  '.csv',
  '.ico',
  '.gif',
  '.jpg',
  '.jpeg',
  '.bmp',
  '.png',
  '.webp',
  '.svg',
  '.zip',
  '.ogg',
  '.mp3',
  '.wav',
  '.mp4',
  '.flv',
  '.mov',
  '.json',
  '.pdf',
  '.pptx',
  '.doc',
  '.docx',
  '.html',
  '.md',
  '.txt',
  '.tex',
  '.py',
];

@Service()
@Resolver()
export class FileResolver {
  constructor(private fileService: FileService) {}

  @Mutation(() => String, { description: '上传文件' })
  async upload(@Arg('file', () => GraphQLUpload) file: FileUpload) {
    if (file instanceof Promise) file = await file;

    const mime = `.${file.mimetype?.split('/').pop()}`.toLowerCase();
    const filename = file.filename;
    const extname = path.extname(filename).toLocaleLowerCase();

    if (!SUPPORT_FILE_EXTENSION.includes(extname) && !SUPPORT_FILE_EXTENSION.includes(mime)) {
      throw new Error('Unsupported file extension');
    }
    const key = `${Date.now()}-${nanoid(5)}${extname}`;
    return await this.fileService.uploader.upload(key, file.createReadStream(), file.mimetype);
  }
}
