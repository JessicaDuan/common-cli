import React, { CSSProperties, FC, memo } from 'react';
import cn from 'classnames';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface SortIconProps {
  style?: CSSProperties;
  sort?: 'asc' | 'desc'; // 排序方向
}

const SortIcon: FC<SortIconProps> = ({ style, sort }) => {
  const upClasses = cn(styles.icon, styles.up, { [styles.active]: sort === 'asc' });

  const downClasses = cn(styles.icon, styles.down, { [styles.active]: sort === 'desc' });

  return (
    <div className={styles.sort} style={style}>
      <CaretUpOutlined className={upClasses} />
      <CaretDownOutlined className={downClasses} />
    </div>
  );
};

export default memo(SortIcon);
