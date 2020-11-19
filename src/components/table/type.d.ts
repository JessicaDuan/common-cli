import { ReactNode, ReactText } from 'react';

/**
 * 表格列属性
 */
export interface Column {
  key: string;
  dataIndex?: string;
  title: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  showScaleBar?: boolean; // 展示比例条
  align?: 'left' | 'right' | 'center';
  sorter?: boolean | ((text: any, record: any) => ReactText);
  render?: (text: any, record: any) => ReactNode;
}

export interface ScrollProps {
  scrollTop?: number;
  scrollHeight?: number;
}

export type Direction = 'asc' | 'desc' | undefined;

export interface Sorter {
  key: string;
  direction: Direction;
}

export interface Size {
  width?: number;
  height?: number;
}

export interface ColumnAnalysis {
  min: number;
  max: number;
}

export interface ColumnExt extends Column {
  left?: number;
  right?: number;
  isLastFixedLeft?: boolean;
  isFirstFixedRight?: boolean;
}

/**
 * 外部传入表格属性
 */
export interface TableOuterProps<RecordType> {
  readonly rowKey: string;
  readonly columns: ColumnExt[];
  readonly dataSource: RecordType[];
  readonly height: number;
  readonly cacheSize?: number;
  readonly lineHeight?: number;
  readonly debug?: boolean; // debug模式打印log
}

export interface TableProps<RecordType> extends TableOuterProps<RecordType> {
  readonly tableWidth?: number;
  readonly totalRowCount: number;
  readonly totalHeight: number;
  visibleRowCount: number;
  scrollBarHeight: number;
  cacheSize: number;
  lineHeight: number;
}

/**
 * 表格内部共享store
 */
export interface TableStore<RecordType> extends TableProps<RecordType> {
  formattedDataSource: RecordType[];
  // 虚拟滚动相关
  readonly cacheSize: number;
  readonly lineHeight: number;
  visibleRowCount: number;
  startRowIndex: number;
  visibleData: RecordType[];
  upHeight: number;
  downHeight: number;
  scrollTop: number;
  onScroll: (v: ScrollProps) => void;
  // 排序
  sorter: Sorter;
  changeSorter: (k: string) => void;
  // 列宽
  columnWidth: Record<string, number>;
  changeColumnWidth: (k: string, v: number) => void;
  resizingColumnKey: string;
  setResizingColumnKey: (v?: string) => void;
  // 列统计
  analysisMap: Record<string, ColumnAnalysis>;
}
