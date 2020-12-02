import { getScrollbarWidth } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { Column } from '../type';

// 获取浏览器滚动条宽度
const SCROLLBAR_WIDTH = getScrollbarWidth();

function init(columns: Column[], totalWidth = 0) {
  // 注：此处使用Math.floor是因为浏览器不支持td、th等元素宽度包含小数，会自动向下取整
  const avgWidth = Math.floor((totalWidth - SCROLLBAR_WIDTH) / columns.length);
  const widthMap: Record<string, number> = {};
  columns.forEach((col) => {
    widthMap[col.key] = avgWidth;
  });
  return widthMap;
}

export default function useColumnResize(columns: Column[], width?: number) {
  const [resizingColumnKey, setResizingColumnKey] = useState<string>();
  const [columnWidth, setColumnWidth] = useState<Record<string, number>>(init(columns, width));

  // 基于列与表格总宽度，初始化所有列宽为平均值
  useEffect(() => {
    setColumnWidth(init(columns, width));
  }, [columns, width]);

  const changeColumnWidth = useCallback((key: string, v: number) => {
    setColumnWidth((prev) => ({
      ...prev,
      [key]: v,
    }));
  }, []);

  return {
    resizingColumnKey,
    setResizingColumnKey,
    columnWidth,
    changeColumnWidth,
  };
}
