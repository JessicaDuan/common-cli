import { getScrollbarWidth } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { Column } from '../type';

// 获取浏览器滚动条宽度
const SCROLLBAR_WIDTH = getScrollbarWidth();

function init(columns: Column[], totalWidth = 0) {
  const avgWidth = Math.floor((totalWidth - SCROLLBAR_WIDTH) / columns.length);
  const widthMap: Record<string, number> = {};
  columns.forEach((col) => {
    widthMap[col.key] = avgWidth;
  });
  return widthMap;
}

export default function useColumnWidth(columns: Column[], tableWidth?: number) {
  const [columnWidth, setColumnWidth] = useState<Record<string, number>>(init(columns, tableWidth));

  useEffect(() => {
    setColumnWidth(init(columns, tableWidth));
  }, [columns, tableWidth]);

  const changeColumnWidth = useCallback((key: string, v: number) => {
    setColumnWidth((prev) => ({
      ...prev,
      [key]: v,
    }));
  }, []);

  return {
    columnWidth,
    changeColumnWidth,
  };
}
