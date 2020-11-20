import React, { memo, FC, ReactNode } from 'react';
import { Empty } from 'antd';
import EmptyImg from '@/assets/empty.png';
import styles from './index.module.less';

interface EmptyBoxProps {
  title?: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}

const EmptyBox: FC<EmptyBoxProps> = ({ title, description, children }) => {
  const descriptionEle = (
    <span className={styles['description-box']}>
      {title && <span className={styles.title}>{title}</span>}
      <span className={styles.desc}>{description}</span>
    </span>
  );

  return (
    <div className={styles['empty-wrapper']}>
      <Empty
        image={EmptyImg}
        imageStyle={{
          height: 150,
        }}
        description={descriptionEle}
        className={styles.empty}
      >
        {children}
      </Empty>
    </div>
  );
};

export default memo(EmptyBox);
