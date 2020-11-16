import { createContext, useContext } from 'react';
import { TableOuterProps, TableStore } from '../type';
import useTableStore from './useTable';

const context = createContext({} as TableStore<any>);

function useCreateTable<RecordType = any>(props: TableOuterProps<RecordType> & { tableWidth?: number }) {
  const store = useTableStore(props);
  return store;
}

function useTable<RecordType = any>() {
  return useContext<TableStore<RecordType>>(context);
}

export default context;
export { useCreateTable, useTable };
