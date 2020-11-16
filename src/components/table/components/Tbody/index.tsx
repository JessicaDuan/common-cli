import React, { useMemo, useCallback } from 'react';
import Tr from '../Tr';
import Td from './Td';
import { useTable } from '../../context';
import { Column } from '../../type';
import styles from '../../index.module.less';
import { getBgStyle } from './utils';

function Tbody() {
  const { debug, rowKey, columns, analysisMap, visibleData } = useTable();

  const defaultRenderer = useCallback((text: any) => text, []);

  const getTdContent = useCallback(
    (row: Record<string, any>, column: Column) => {
      let text: any;
      if (column.dataIndex) {
        text = row[column.dataIndex];
      }
      if (column.render) {
        return column.render(text, row);
      }
      return defaultRenderer(text);
    },
    [defaultRenderer]
  );

  return useMemo(() => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('%c[Render]Tbody', 'color: grey');
    }
    return (
      <tbody className={styles.body}>
        {visibleData.map((row) => (
          <Tr key={(row as any)[rowKey]}>
            {columns.map((col) => {
              let bgStyle: string | undefined;
              if (analysisMap[col.key] && col?.dataIndex) {
                bgStyle = getBgStyle({ ...analysisMap[col.key], current: row[col.dataIndex] });
              }
              return (
                <Td key={col.key} data={col}>
                  <div className={styles['inner-cell']} style={{ background: bgStyle, textAlign: col.align }}>
                    {getTdContent(row, col)}
                  </div>
                </Td>
              );
            })}
          </Tr>
        ))}
      </tbody>
    );
  }, [debug, visibleData, rowKey, columns, analysisMap, getTdContent]);
}

export default Tbody;
