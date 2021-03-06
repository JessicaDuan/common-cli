import React, { useMemo, FC, useCallback, memo, useState } from 'react';
import { useThrottleFn } from 'ahooks';
import cn from 'classnames';
import { isEmpty } from '@/utils';
import SortIcon from './SortIcon';
import ResizeDragBar from './ResizeDragBar';
import { ColumnExt } from '../../type';
import { useTable } from '../../context';
import styles from '../../index.module.less';
import { LESS_HEADER_TABLE_PREFIX } from '../../utils';

interface ThProps {
  data: ColumnExt;
}

const alignToFlexMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Th: FC<ThProps> = ({ data }) => {
  const columnKey = useMemo(() => data.key, [data]);

  const { sorter, changeSorter, columnWidth, changeColumnWidth, setResizingColumnKey, debug } = useTable();

  const [origColumnWidth, setOrigColumnWidth] = useState(columnWidth[columnKey]);

  // 点击表头进行排序
  const onClick = useCallback(() => {
    changeSorter(columnKey);
  }, [changeSorter, columnKey]);

  // 列宽resize
  const { run: resizeColumnWidth } = useThrottleFn(
    (v: number) => {
      if (debug) {
        // eslint-disable-next-line no-console
        console.log('resizeColumn:', columnKey, {
          movementX: v,
          changeTo: origColumnWidth + v,
        });
      }
      changeColumnWidth(columnKey, origColumnWidth + v);
    },
    {
      wait: 100,
    }
  );

  // 拖拽事件开始时设置起始列宽
  const onDragStart = useCallback(() => {
    setOrigColumnWidth(columnWidth[columnKey]);
    setResizingColumnKey(columnKey);
  }, [columnKey, columnWidth, setResizingColumnKey]);

  const onDragEnd = useCallback(() => {
    setResizingColumnKey();
  }, [setResizingColumnKey]);

  const classNames = useMemo(
    () =>
      cn(styles[`${LESS_HEADER_TABLE_PREFIX}-th`], {
        [styles['fixed-left']]: !isEmpty(data.left),
        [styles['is-last-fixed-left']]: !isEmpty(data.isLastFixedLeft),
        [styles['fixed-right']]: !isEmpty(data.right),
        [styles['is-first-fixed-right']]: !isEmpty(data.isFirstFixedRight),
      }),
    [data.left, data.right, data.isLastFixedLeft, data.isFirstFixedRight]
  );

  return useMemo(
    () => (
      <th className={classNames} style={{ left: data.left, right: data.right }}>
        <div
          className={styles[`${LESS_HEADER_TABLE_PREFIX}-th-inner`]}
          onClick={onClick}
          style={{ justifyContent: alignToFlexMap[data.align || 'left'] }}
        >
          <span>{data.title}</span>
          {data.sorter && (
            <SortIcon style={{ marginLeft: 8 }} sort={sorter?.key === data.key ? sorter.direction : undefined} />
          )}
        </div>
        <ResizeDragBar onDrag={resizeColumnWidth} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </th>
    ),
    [
      classNames,
      data.sorter,
      data.align,
      data.key,
      data.left,
      data.right,
      data.title,
      onClick,
      onDragStart,
      resizeColumnWidth,
      sorter,
      onDragEnd,
    ]
  );
};

export default memo(Th);
