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
