import { APP_HOST, APP_PREFIX } from '../../config';

export class StorageUtils {
  static storageURL(url: string): string {
    let host = APP_HOST;
    let prefix = APP_PREFIX;
    if (host.endsWith('/')) host = host.slice(0, -1);
    if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
    if (prefix.startsWith('/')) prefix = prefix.slice(1);
    if (url.startsWith('/')) url = url.slice(1);

    return prefix === '' ? `${host}/${url}` : `${host}/${prefix}/${url}`;
  }
}
