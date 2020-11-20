import React, { useMemo, FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { isEmpty } from '@/utils';
import { ColumnExt } from '../../type';
import styles from '../../index.module.less';
import { LESS_BODY_TABLE_PREFIX } from '../../utils';

interface TdProps {
  data: ColumnExt;
}

const Td: FC<PropsWithChildren<TdProps>> = ({ data, children }) => {
  return useMemo(() => {
    const classNames = cn(styles[`${LESS_BODY_TABLE_PREFIX}-td`], {
      [styles['fixed-left']]: !isEmpty(data.left),
      [styles['is-last-fixed-left']]: !isEmpty(data.isLastFixedLeft),
      [styles['fixed-right']]: !isEmpty(data.right),
      [styles['is-first-fixed-right']]: !isEmpty(data.isFirstFixedRight),
    });
    return (
      <td className={classNames} style={{ left: data.left, right: data.right }}>
        {children}
      </td>
    );
  }, [children, data.left, data.right, data.isLastFixedLeft, data.isFirstFixedRight]);
};

export default Td;
