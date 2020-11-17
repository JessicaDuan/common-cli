import { maxBy, minBy } from 'lodash';
import { useEffect, useState } from 'react';
import { TableProps, ColumnAnalysis } from '../type';

export default function useColumnAnalysis<RecordType extends Record<string, any>>(props: TableProps<RecordType>) {
  const [analysisMap, setAnalysisMap] = useState({});

  const { columns, dataSource } = props;

  useEffect(() => {
    const newMap: Record<string, ColumnAnalysis> = {};
    columns.forEach((col) => {
      const { dataIndex } = col;
      // 对于有dataIndex（实际有数据）、且需要展示比例条的列做数据统计
      if (col.showScaleBar && dataIndex) {
        const columnData = dataSource.map((row) => row[dataIndex]);
        const min = minBy(columnData);
        const max = maxBy(columnData);
        newMap[col.key] = {
          min,
          max,
        };
      }
    });
    setAnalysisMap(newMap);
  }, [columns, dataSource]);

  return { analysisMap };
}
