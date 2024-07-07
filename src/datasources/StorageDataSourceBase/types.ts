import {
  CreateOptionsBase,
  DataSourceConfigBase,
  DataSourceEventHandlersBase,
  DeleteOptionsBase,
  ReadOptionsBase,
  UpdateOptionsBase,
} from '@visue/datasource/datasources/DataSourceBase';

/**
 * イベントハンドラー
 */
export type StorageDataSourceEventHandlersBase<D = any> = DataSourceEventHandlersBase<D>;

/**
 * createメソッドのオプション
 */
export type StorageCreateOptionsBase = CreateOptionsBase;

/**
 * readメソッドのオプション
 */
export type StorageReadOptionsBase = ReadOptionsBase;

/**
 * updateメソッドのオプション
 */
export type StorageUpdateOptions = UpdateOptionsBase;

/**
 * deleteメソッドのオプション
 */
export type StorageDeleteOptions = DeleteOptionsBase;

/**
 * コンフィグ
 */
export type StorageDataSourceConfigBase<
  D = any,
  H extends StorageDataSourceEventHandlersBase<D> = StorageDataSourceEventHandlersBase<D>,
> = DataSourceConfigBase<D, H> &
  StorageCreateOptionsBase &
  StorageReadOptionsBase &
  StorageUpdateOptions &
  StorageDeleteOptions & {
    /**
     * ストレージに保存する際のキー
     */
    key?: string;
  };
