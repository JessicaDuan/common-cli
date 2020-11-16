import React, { useMemo } from 'react';
import Tr from '../Tr';
import Th from './Th';
import { useTable } from '../../context';
import styles from '../../index.module.less';

const Thead = () => {
  const { columns, debug } = useTable();

  return useMemo(() => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('%c[Render]Thead', 'color: grey');
    }
    return (
      <thead className={styles.header}>
        <Tr>
          {columns.map((col) => (
            <Th key={col.key} data={col} />
          ))}
        </Tr>
      </thead>
    );
  }, [columns, debug]);
};

export default Thead;
