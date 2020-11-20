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
  sorter?: boolean;
  render?: (text: ReactText, record: any) => ReactNode;
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
export interface TableProps<RecordType> {
  readonly rowKey: string; // 每行数据中可作为唯一key的属性
  readonly columns: ColumnExt[];
  readonly dataSource: RecordType[];
  readonly height: number; // 表格主体内容区域高度
  readonly cacheSize?: number; // 缓冲区数量
  readonly lineHeight?: number; // 行高
  readonly debug?: boolean; // debug模式打印log
  readonly loading?: boolean;
}

/**
 * 初始化后的表格属性（填充默认值等）
 */
export interface TableInitProps<RecordType> extends TableProps<RecordType> {
  readonly tableWidth?: number; // 表格实际的宽度
  readonly totalRowCount: number; // 数据总行数
  readonly totalHeight: number; // 表格数据实际的总高度
  visibleRowCount: number; // 表格可见区域可展示的数据行数
  cacheSize: number;
  lineHeight: number;
}

/**
 * 表格内部共享store
 */
export interface TableStore<RecordType> extends TableInitProps<RecordType> {
  formattedDataSource: RecordType[];
  // 虚拟滚动相关
  readonly cacheSize: number;
  readonly lineHeight: number;
  visibleRowCount: number;
  startRowIndex: number;
  visibleData: RecordType[];
  upHeight: number; // 实际渲染区上方的数据高度
  downHeight: number; // 实际渲染区下方的数据高度
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
