import React, { useEffect, useMemo, useRef } from 'react';
import { useThrottleFn } from 'ahooks';
import { getScrollbarWidth } from '@/utils';
import Thead from './Thead';
import Tbody from './Tbody';
import { useTable } from '../context';
import styles from '../index.module.less';

// 获取浏览器滚动条宽度
const SCROLLBAR_WIDTH = getScrollbarWidth();

function Table() {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { height, columns, upHeight, downHeight, onScroll, scrollTop, debug, columnWidth } = useTable();

  // 表头与主体部分的列宽对应
  const colGroup = useMemo(
    () => (
      <colgroup>
        {columns.map((c) => (
          <col key={c.key} style={{ width: columnWidth[c.key], maxWidth: columnWidth[c.key] }} />
        ))}
      </colgroup>
    ),
    [columnWidth, columns]
  );

  // 滚动
  const { run: onTbodyScroll } = useThrottleFn(
    () => {
      if (debug) {
        // eslint-disable-next-line no-console
        // console.log('%c[Scroll]', 'color: grey', {
        //   top: bodyRef?.current?.scrollTop,
        //   left: bodyRef?.current?.scrollLeft,
        // });
      }
      onScroll({ scrollTop: bodyRef?.current?.scrollTop, scrollHeight: bodyRef?.current?.scrollHeight });
      if (headerRef?.current && bodyRef?.current) {
        headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
      }
    },
    {
      wait: 50,
    }
  );

  useEffect(() => {
    // 重置时触发滚动条置顶
    if (bodyRef?.current && scrollTop === 0) {
      bodyRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return useMemo(
    () => (
      <div className={styles['table-wrapper']}>
        {/* 表头 */}
        <div className={styles['table-header-background']}>
          <div
            ref={headerRef}
            className={styles['table-header-wrapper']}
            style={{ width: `calc(100% - ${SCROLLBAR_WIDTH}px)` }}
          >
            <table className={styles['table-header']}>
              {colGroup}
              <Thead />
            </table>
          </div>
        </div>
        {/* 表格主体 */}
        <div ref={bodyRef} style={{ height, overflow: 'auto' }} onScroll={onTbodyScroll}>
          <div style={{ height: upHeight }} />
          <table className={styles['table-body']}>
            {colGroup}
            <Tbody />
          </table>
          <div style={{ height: downHeight }} />
        </div>
      </div>
    ),
    [colGroup, height, onTbodyScroll, upHeight, downHeight]
  );
}

export default Table;
