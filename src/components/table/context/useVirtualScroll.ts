import { useCallback, useMemo, useState } from 'react';
import { ScrollProps, TableInitProps } from '../type';

export default function useVirtualScroll<RecordType>(
  props: TableInitProps<RecordType>,
  formattedDataSource: RecordType[]
) {
  const [startRowIndex, setStartRowIndex] = useState(0); // 可见的第一行行号
  const [scrollTop, setScrollTop] = useState(0); // 滚动条距离顶部高度

  const resetPosition = useCallback(() => {
    setStartRowIndex(0);
    setScrollTop(0);
  }, []);

  const { visibleRowCount, totalRowCount, cacheSize, lineHeight } = props;

  // --- 计算属性 ---

  // 实际渲染的起始行号
  const startIdx = useMemo(() => (startRowIndex - cacheSize < 0 ? 0 : startRowIndex - cacheSize), [
    cacheSize,
    startRowIndex,
  ]);

  // 实际渲染的结束行号
  const endIdx = useMemo(() => startRowIndex + visibleRowCount + cacheSize, [
    cacheSize,
    startRowIndex,
    visibleRowCount,
  ]);

  // 实际渲染的数据
  const visibleData = useMemo(() => {
    return formattedDataSource.slice(startIdx, startRowIndex + visibleRowCount + cacheSize);
  }, [cacheSize, formattedDataSource, startIdx, startRowIndex, visibleRowCount]);

  // 上方不可见高度
  const upHeight = useMemo(() => startIdx * lineHeight, [lineHeight, startIdx]);

  // 下方不可见高度
  const downHeight = useMemo(
    () => ((totalRowCount - endIdx) * lineHeight > 0 ? (totalRowCount - endIdx) * lineHeight : 0),
    [totalRowCount, endIdx, lineHeight]
  );

  // 表格滚动事件
  const onScroll = useCallback(
    (node: ScrollProps) => {
      if (node.scrollTop) {
        setScrollTop(node.scrollTop);
        if (node.scrollHeight) {
          setStartRowIndex(Math.round((node.scrollTop / node.scrollHeight) * totalRowCount));
        }
      } else {
        resetPosition();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalRowCount]
  );

  const store = {
    scrollTop,
    upHeight,
    downHeight,
    visibleData,
    resetPosition,
    onScroll,
  };
  return store;
}
