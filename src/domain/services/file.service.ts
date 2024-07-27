import { Readable } from 'stream';
import { STORAGE_ADAPTER, STORAGE_PATH } from '../../config';
import localAdapter from './adapters/local';

export type UploadAdapter = (key: string, stream: Readable, contentType?: string) => Promise<string>;
export type MoveAdapter = (sourceKey: string, destinationKey: string) => Promise<string>;

const adapters = {
  LOCAL: {
    upload: localAdapter.upload,
    rootPath: () => STORAGE_PATH,
  },
};

export class FileService {
  public uploader: {
    upload: UploadAdapter;
    rootPath: () => string;
  };

  constructor() {
    this.uploader = adapters[STORAGE_ADAPTER?.toUpperCase() as keyof typeof adapters] ?? localAdapter;
  }
}
