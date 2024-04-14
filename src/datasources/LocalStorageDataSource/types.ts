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
export type LocalStorageDataSourceEventHandlers<D = any> = StorageDataSourceEventHandlersBase<D>;

/**
 * createメソッドのオプション
 */
export type LocalStorageCreateOptions = StorageCreateOptionsBase;

/**
 * readメソッドのオプション
 */
export type LocalStorageReadOptions = StorageReadOptionsBase;

/**
 * updateメソッドのオプション
 */
export type LocalStorageUpdateOptions = StorageUpdateOptions;

/**
 * deleteメソッドのオプション
 */
export type LocalStorageDeleteOptions = StorageDeleteOptions;

/**
 * コンフィグ
 */
export type LocalStorageDataSourceConfig<D = any> = StorageDataSourceConfigBase<
  D,
  LocalStorageDataSourceEventHandlers<D>
> &
  LocalStorageCreateOptions &
  LocalStorageReadOptions &
  LocalStorageUpdateOptions &
  LocalStorageDeleteOptions;
