import {
  StorageCreateOptionsBase,
  StorageDataSourceConfigBase,
  StorageDataSourceEventHandlersBase,
  StorageDeleteOptions,
  StorageReadOptionsBase,
  StorageUpdateOptions,
} from '../StorageDataSourceBase';

/**
 * イベントハンドラー
 */
export type SessionStorageDataSourceEventHandlers<D = any> = StorageDataSourceEventHandlersBase<D>;

/**
 * createメソッドのオプション
 */
export type SessionStorageCreateOptions = StorageCreateOptionsBase;

/**
 * readメソッドのオプション
 */
export type SessionStorageReadOptions = StorageReadOptionsBase;

/**
 * updateメソッドのオプション
 */
export type SessionStorageUpdateOptions = StorageUpdateOptions;

/**
 * deleteメソッドのオプション
 */
export type SessionStorageDeleteOptions = StorageDeleteOptions;

/**
 * コンフィグ
 */
export type SessionStorageDataSourceConfig<D = any> = StorageDataSourceConfigBase<
  D,
  SessionStorageDataSourceEventHandlers<D>
> &
  SessionStorageCreateOptions &
  SessionStorageReadOptions &
  SessionStorageUpdateOptions &
  SessionStorageDeleteOptions;
