import { sortAsc, sortDesc } from '@/utils';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { TableProps } from '../type';
import useSorter from './useSorter';
import useVirtualScroll from './useVirtualScroll';
import useColumnResize from './useColumnResize';
import useColumnAnalysis from './useColumnAnalysis';

function init<RecordType>(props: TableProps<RecordType>) {
  const columns = props.columns || [];

  const newProps = {
    ...props,
    height: props.height || 0, // [定值]表格可见高度
    columns: columns
      .filter((o) => o.fixed === 'left')
      .concat(columns.filter((o) => o.fixed !== 'left' && o.fixed !== 'right'))
      .concat(columns.filter((o) => o.fixed === 'right')), // [定值]表格列，按fixed属性重排
    dataSource: props.dataSource || [],
    cacheSize: props.cacheSize || 20, // [定值]缓冲区大小
    lineHeight: props.lineHeight || 30, // [定值]行高
  };
  newProps.height -= newProps.lineHeight + 2;
  const { dataSource, lineHeight, height } = newProps;
  const totalHeight = dataSource.length * lineHeight; // [定值]表格总高度
  const visibleRowCount = Math.ceil(height / lineHeight); // [定值]可见行数

  return {
    ...newProps,
    totalRowCount: dataSource.length, // [定值]总行数
    totalHeight,
    visibleRowCount,
  };
}

export default function useTable<RecordType>(outerProps: TableProps<RecordType>) {
  const [props, setProps] = useState(init(outerProps));
  const [columns, setColumns] = useState(props.columns);
  const [formattedDataSource, setFormattedDataSource] = useState(props.dataSource);

  // 列宽hook
  const { columnWidth, changeColumnWidth, resizingColumnKey, setResizingColumnKey } = useColumnResize(
    props.columns,
    props.width
  );

  // 计算冻结列
  useEffect(() => {
    let fixedLeft = 0;
    const newColumns = cloneDeep(props.columns);
    for (let i = 0; i < newColumns.length; i += 1) {
      const current = newColumns[i];
      if (current.fixed === 'left') {
        current.left = fixedLeft;
        fixedLeft += Math.floor(columnWidth[current.key]);
      } else {
        newColumns[i - 1].isLastFixedLeft = true;
        break;
      }
    }
    let fixedRight = 0;
    for (let i = newColumns.length - 1; i >= 0; i -= 1) {
      const current = newColumns[i];
      if (current.fixed === 'right') {
        current.right = fixedRight;
        fixedRight += columnWidth[current.key];
      } else {
        newColumns[i + 1].isFirstFixedRight = true;
        break;
      }
    }
    setColumns(newColumns);
  }, [columnWidth, props]);

  // 列数值统计hook
  const { analysisMap } = useColumnAnalysis(props);

  // 虚拟滚动hook
  const { scrollTop, resetPosition, onScroll, upHeight, downHeight, visibleData } = useVirtualScroll(
    props,
    formattedDataSource
  );

  // 表头排序hook
  const { sorter, changeSorter } = useSorter();

  // 更新
  useEffect(() => {
    if (props.debug) {
      // eslint-disable-next-line no-console
      console.log('Table Props Update');
    }
    setProps(init(outerProps));
    resetPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerProps]);

  // 排序
  useEffect(() => {
    if (props.debug) {
      // eslint-disable-next-line no-console
      console.log('Sorter Change:', sorter);
    }
    const { key, direction } = sorter || {};
    if (key && direction) {
      const newDataSource = cloneDeep(props.dataSource);
      newDataSource.sort((a, b) => (direction === 'asc' ? sortAsc(a, b, key) : sortDesc(a, b, key)));
      setFormattedDataSource(newDataSource);
    } else {
      setFormattedDataSource(props.dataSource);
    }
    resetPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataSource, sorter]);

  const store = {
    ...props,
    columns,
    scrollTop,
    visibleData,
    upHeight,
    downHeight,
    onScroll,
    // 排序
    sorter,
    changeSorter,
    // 列宽
    columnWidth,
    changeColumnWidth,
    resizingColumnKey,
    setResizingColumnKey,
    // 列统计
    analysisMap,
  };

  if (props.debug) {
    // eslint-disable-next-line no-console
    console.log('useTable:', store);
  }

  return store;
}
