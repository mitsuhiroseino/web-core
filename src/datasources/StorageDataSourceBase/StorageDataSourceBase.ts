import DataSourceBase from '@visue/datasource/datasources/DataSourceBase';
import uuid from '@visue/utils/data/uuid';

import { StorageDataSourceConfigBase, StorageDataSourceEventHandlersBase } from './types';

/**
 * リソースクラス
 */
abstract class StorageDataSourceBase<
  D = any,
  H extends StorageDataSourceEventHandlersBase<D> = StorageDataSourceEventHandlersBase<D>,
  C extends StorageDataSourceConfigBase<D, H> = StorageDataSourceConfigBase<D, H>,
> extends DataSourceBase<D, H, C> {
  /**
   * ストレージに保存する際のキー
   */
  private _key: string;

  /**
   * キーは生成されたものか
   */
  private _hasGeneratedId: boolean;

  /**
   * ストレージ毎のcrud処理
   */
  protected abstract _crud: {
    create: (key: string, data: any) => any;
    read: (key: string) => D | null;
    update: (key: string, data: any) => any;
    delete: (key: string) => any;
  };

  constructor(config?: C) {
    super(config);
    const key = this.config.key;
    this._key = key == null ? uuid() : key;
    this._hasGeneratedId = key == null;
  }

  protected _create(data: D, config: C): Promise<any> {
    return Promise.resolve(this._crud.create(this._key, data));
  }

  protected _read(config: C): Promise<D | null> {
    return Promise.resolve(this._crud.read(this._key));
  }

  protected _update(data: D, config: C): Promise<any> {
    return Promise.resolve(this._crud.update(this._key, data));
  }

  protected _delete(config: C): Promise<any> {
    return Promise.resolve(this._crud.delete(this._key));
  }

  destructor() {
    if (this._hasGeneratedId) {
      // IDが自動採番の場合はデータも破棄する
      this.delete();
    }
    super.destructor();
  }
}
export default StorageDataSourceBase;
