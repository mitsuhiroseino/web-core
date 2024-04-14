import load from '../../utils/localstorage/load';
import remove from '../../utils/localstorage/remove';
import save from '../../utils/localstorage/save';
import StorageDataSourceBase from '../StorageDataSourceBase';
import { LocalStorageDataSourceConfig, LocalStorageDataSourceEventHandlers } from './types';

/**
 * リソースクラス
 */
class LocalStorageDataSource<D = any> extends StorageDataSourceBase<
  D,
  LocalStorageDataSourceEventHandlers<D>,
  LocalStorageDataSourceConfig<D>
> {
  /**
   * 種別
   */
  static TYPE = 'localstorage';

  protected _crud = {
    create: save,
    read: load,
    update: save,
    delete: remove,
  };
}
export default LocalStorageDataSource;
