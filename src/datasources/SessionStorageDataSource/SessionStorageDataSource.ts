import load from '../../utils/sessionstorage/load';
import remove from '../../utils/sessionstorage/remove';
import save from '../../utils/sessionstorage/save';
import StorageDataSourceBase from '../StorageDataSourceBase';
import { SessionStorageDataSourceConfig, SessionStorageDataSourceEventHandlers } from './types';

/**
 * リソースクラス
 */
class SessionStorageDataSource<D = any> extends StorageDataSourceBase<
  D,
  SessionStorageDataSourceEventHandlers<D>,
  SessionStorageDataSourceConfig<D>
> {
  /**
   * 種別
   */
  static TYPE = 'sessionstorage';

  protected _crud = {
    create: save,
    read: load,
    update: save,
    delete: remove,
  };
}
export default SessionStorageDataSource;
