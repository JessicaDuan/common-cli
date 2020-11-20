import React, { memo } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const Loading = () => {
  return (
    <div className="flexbox">
      <Loading3QuartersOutlined spin className={styles.loading} />
      <span className={styles.tip}>加载中...</span>
    </div>
  );
};

export default memo(Loading);
