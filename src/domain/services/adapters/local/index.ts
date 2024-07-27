import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { STORAGE_PATH } from '../../../../config';
import { StorageUtils } from '../../../utils/storage.utils';

async function upload(key: string, inputStream: Readable) {
  fs.mkdirSync(STORAGE_PATH, { recursive: true });
  fs.mkdirSync(path.resolve(STORAGE_PATH, path.dirname(key)), { recursive: true });
  const stream = fs.createWriteStream(path.resolve(STORAGE_PATH, key));
  inputStream.pipe(stream);

  return StorageUtils.storageURL(`/files/${key}`);
}

export default { upload };
