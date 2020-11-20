import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useThrottleFn } from 'ahooks';
import { getScrollbarWidth } from '@/utils';
import { sum } from 'lodash';
import Thead from './Thead';
import Tbody from './Tbody';
import { useTable } from '../context';
import styles from '../index.module.less';
import { LESS_BODY_TABLE_PREFIX, LESS_HEADER_TABLE_PREFIX } from '../utils';

// 获取浏览器滚动条宽度
const SCROLLBAR_WIDTH = getScrollbarWidth();

function Table() {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [pingLeft, setPingLeft] = useState(true);
  const [pingRight, setPingRight] = useState(true);

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
        const scrollLeft = bodyRef.current.scrollLeft;
        headerRef.current.scrollLeft = scrollLeft;
        setPingLeft(scrollLeft === 0);
        setPingRight(scrollLeft + headerRef.current?.clientWidth >= sum(Object.values(columnWidth)));
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

  const classNames = useMemo(
    () =>
      cn(styles['table-root-wrapper'], {
        [styles['ping-left']]: pingLeft,
        [styles['ping-right']]: pingRight,
      }),
    [pingLeft, pingRight]
  );

  return useMemo(
    () => (
      <div className={classNames}>
        {/* 表头 */}
        <div className={styles[`${LESS_HEADER_TABLE_PREFIX}-background`]}>
          <div
            ref={headerRef}
            className={styles[`${LESS_HEADER_TABLE_PREFIX}-wrapper`]}
            style={{ width: `calc(100% - ${SCROLLBAR_WIDTH}px)` }}
          >
            <table className={styles[LESS_HEADER_TABLE_PREFIX]}>
              {colGroup}
              <Thead />
            </table>
          </div>
        </div>
        {/* 表格主体 */}
        <div
          ref={bodyRef}
          className={styles[`${LESS_BODY_TABLE_PREFIX}-wrapper`]}
          style={{ height }}
          onScroll={onTbodyScroll}
        >
          <div style={{ height: upHeight }} />
          <table className={styles[LESS_BODY_TABLE_PREFIX]}>
            {colGroup}
            <Tbody />
          </table>
          <div style={{ height: downHeight }} />
        </div>
      </div>
    ),
    [colGroup, height, onTbodyScroll, upHeight, downHeight, classNames]
  );
}

export default Table;
