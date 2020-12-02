import React, { useMemo, memo, useRef } from 'react';
import { useSize } from 'ahooks';
import { TableProps } from './type';
import Table from './components/Table';
import Context, { useCreateTable } from './context';

function VTable<RecordType extends Record<string, any>>(props: TableProps<RecordType>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const tableSize = useSize(tableRef);

  const contextProps = useMemo(
    () => ({
      width: tableSize.width,
      height: tableSize.height,
      ...props, // 如未手动传入width和height，则获取容器大小
    }),
    [props, tableSize.width, tableSize.height]
  );

  const store = useCreateTable(contextProps);

  const content = useMemo(
    () => (
      <Context.Provider value={store as any}>
        <Table />
      </Context.Provider>
    ),
    [store]
  );

  return useMemo(
    () => (
      <div ref={tableRef} style={{ height: '100%' }}>
        {content}
      </div>
    ),
    [content]
  );
}

export default memo(VTable);
