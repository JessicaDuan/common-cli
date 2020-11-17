import React, { useMemo, memo, useRef } from 'react';
import { useSize } from 'ahooks';
import { TableOuterProps } from './type';
import Table from './components/Table';
import Context, { useCreateTable } from './context';

function VTable<RecordType extends Record<string, any>>(props: TableOuterProps<RecordType>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const tableSize = useSize(tableRef);

  const contextProps = useMemo(
    () => ({
      ...props,
      tableWidth: tableSize.width,
    }),
    [props, tableSize.width]
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

  return useMemo(() => <div ref={tableRef}>{content}</div>, [content]);
}

export default memo(VTable);
